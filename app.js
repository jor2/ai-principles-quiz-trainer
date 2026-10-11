(() => {
  'use strict';

  const DATA = window.QUIZ_DATA;
  const PASS_MARK = 0.75; // the lab says: scored under 15/20, re-read the points
  const LETTERS = 'ABCD';
  const app = document.getElementById('app');

  // Extra questions (data-extra.js) join their week's list, marked extra.
  for (const x of window.QUIZ_EXTRA || []) {
    const w = DATA.find(d => d.week === x.week);
    if (w) w.questions.push(...x.questions.map(q => ({ ...q, extra: true })));
  }

  // ---------- Lookups ----------
  const Q = {};
  const POINT = {};
  const WEEK = {};
  for (const w of DATA) {
    WEEK[w.week] = w;
    for (const p of w.points) POINT[p.id] = p;
    for (const q of w.questions) Q[q.id] = { ...q, week: w.week };
  }
  const ALL_QS = Object.values(Q);
  const CORE_COUNT = ALL_QS.filter(q => !q.extra).length;
  const EXTRA_COUNT = ALL_QS.length - CORE_COUNT;

  // ---------- Question sets ----------
  const POOLS = [
    ['all', 'Original + new', ALL_QS.length],
    ['core', 'Original only', CORE_COUNT],
    ['extra', 'New only', EXTRA_COUNT],
  ].filter(([k]) => EXTRA_COUNT || k === 'core');
  const inPool = (q, pool) => pool === 'all' || (pool === 'extra') === !!q.extra;
  const poolQs = (w, pool) => w.questions.filter(q => inPool(q, pool));
  const poolTag = pool => (pool === 'extra' ? ' · new questions' : pool === 'core' ? ' · original questions' : '');

  // ---------- Storage ----------
  const KEY = 'aiquiz.v1';
  let store = { attempts: [], qstats: {}, settings: { shuffle: true, instant: false, mockSize: 20, pool: 'all' }, current: null };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      store = { ...store, ...s, settings: { ...store.settings, ...(s.settings || {}) } };
    }
  } catch (e) { /* storage unavailable: run without persistence */ }
  if (!POOLS.some(([k]) => k === store.settings.pool)) store.settings.pool = POOLS[0][0];
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignore */ }
  }

  // ---------- Helpers ----------
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  };
  const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);
  const fmtTime = sec => {
    const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };
  const fmtDate = iso => new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const go = hash => { location.hash = hash; };

  function weekAttempts(week) {
    return store.attempts.filter(a => a.mode === 'category' && a.week === week);
  }
  function mastery(week) {
    return WEEK[week].questions.filter(q => store.qstats[q.id] && store.qstats[q.id].last === true).length;
  }
  const bestAttempt = at => at.reduce((b, a) => (!b || a.correct / a.total > b.correct / b.total ? a : b), null);
  function mistakeIds() {
    return Object.keys(store.qstats).filter(id => Q[id] && store.qstats[id].last === false);
  }

  function pointRefs(q) {
    return q.points.filter(id => POINT[id]).map(id => {
      const p = POINT[id];
      return `<details class="pointref"><summary>Point ${esc(p.id)}: ${esc(p.title)}</summary><p>${esc(p.body)}</p></details>`;
    }).join('');
  }

  // Renders a question's options. order maps display slot -> original option index.
  function optionsHtml(q, { order = [0, 1, 2, 3], chosen = null, reveal = false, clickable = false } = {}) {
    return `<div class="options">${order.map((orig, slot) => {
      let cls = 'opt', tag = '';
      if (reveal) {
        if (orig === q.answer) { cls += ' correct'; tag = chosen === orig ? '✓ Your answer' : '✓ Correct'; }
        else if (orig === chosen) { cls += ' wrong'; tag = '✗ Your answer'; }
      } else if (orig === chosen) cls += ' selected';
      const el = clickable ? 'button' : 'div';
      return `<${el} class="${cls}" ${clickable ? `data-pick="${orig}"` : ''}>
        <span class="letter">${LETTERS[slot]}</span><span>${esc(q.options[orig])}</span><span class="tag">${tag}</span>
      </${el}>`;
    }).join('')}</div>`;
  }
  const newPill = q => (q.extra ? '<span class="pill new">New</span>' : '');
  function explainHtml(q) {
    return `<div class="explain"><div class="why">${esc(q.why)}</div>${pointRefs(q)}</div>`;
  }

  // ---------- Views ----------
  function viewHome() {
    const cur = store.current;
    const mistakes = mistakeIds().length;
    const totalMastered = DATA.reduce((n, w) => n + mastery(w.week), 0);
    app.innerHTML = `
      <section class="hero">
        <h1>Week 6 quiz preparation</h1>
        <p class="muted">${ALL_QS.length} practice questions across five weeks${EXTRA_COUNT ? ` (${CORE_COUNT} original + ${EXTRA_COUNT} new)` : ''}. You've answered <strong>${totalMastered}/${ALL_QS.length}</strong> correctly on your most recent try at each one.</p>
      </section>
      ${cur ? `<div class="card row" style="border-color:var(--accent)">
        <div><strong>Test in progress:</strong> ${esc(cur.title)} · ${cur.answers.filter(a => a !== null).length}/${cur.items.length} answered</div>
        <span class="spacer"></span>
        <button class="btn" data-act="discard">Discard</button>
        <button class="btn primary" data-go="test">Resume</button>
      </div>` : ''}
      <div class="modes">
        <button class="mode" data-go="study">
          <span class="icon">📖</span><strong>Study by category</strong>
          <span class="muted small">Read each week's points and checklist, then go through every question with its answer explained.</span>
        </button>
        <button class="mode mock" data-go="start/mock">
          <span class="icon">📝</span><strong>Mock exam</strong>
          <span class="muted small">Random questions drawn evenly from all five weeks. Choose 20, 40 or all of them, from the original questions, the new ones or both.</span>
        </button>
        <button class="mode" data-go="tests">
          <span class="icon">🎯</span><strong>Category test</strong>
          <span class="muted small">Every question from one week in a random order. Your results are saved.</span>
        </button>
        ${EXTRA_COUNT ? `<button class="mode" data-act="pool" data-pool="extra" data-to="start/mock">
          <span class="icon">🆕</span><strong>New questions</strong>
          <span class="muted small">Just the ${EXTRA_COUNT} new questions, ${EXTRA_COUNT / DATA.length} from each week, on topics the original set covers lightly.</span>
        </button>` : ''}
        ${mistakes ? `<button class="mode mistakes" data-go="start/mistakes">
          <span class="icon">🔁</span><strong>Practise my mistakes</strong>
          <span class="muted small">${mistakes} question${mistakes === 1 ? '' : 's'} you got wrong last time.</span>
        </button>` : ''}
      </div>
      <h2>Your progress</h2>
      <div class="progress-list">${DATA.map(w => {
        const at = weekAttempts(w.week);
        const last = at[at.length - 1];
        const best = bestAttempt(at);
        const m = mastery(w.week);
        const n = w.questions.length;
        return `<div class="prog-row">
          <span class="wk">${w.week}</span>
          <div>
            <div><strong>${esc(w.title)}</strong></div>
            <div class="muted small">${at.length
              ? `Last test ${last.correct}/${last.total} · best ${best.correct}/${best.total} · ${at.length} attempt${at.length === 1 ? '' : 's'}`
              : 'No category test yet'} · ${m}/${n} right most recently</div>
            <div class="bar ${m / n >= PASS_MARK ? 'good' : ''}"><span style="width:${pct(m, n)}%"></span></div>
          </div>
          <div class="prog-actions">
            <button class="btn" data-go="study/${w.week}">Study</button>
            <button class="btn primary" data-go="start/category/${w.week}">Test</button>
          </div>
        </div>`;
      }).join('')}</div>`;
  }

  function viewCategoryPicker(kind) {
    const isStudy = kind === 'study';
    app.innerHTML = `
      <button class="back" data-go="home">← Home</button>
      <h1>${isStudy ? 'Study by category' : 'Category test'}</h1>
      <p class="muted">${isStudy ? 'Choose a week to revise.' : 'Choose a week. You get all of its questions in a random order, and the result is saved. You can pick original, new or both on the next screen.'}</p>
      <div class="cat-grid">${DATA.map(w => {
        const at = weekAttempts(w.week);
        const last = at[at.length - 1];
        return `<button class="cat" data-go="${isStudy ? `study/${w.week}` : `start/category/${w.week}`}">
          <span class="wk">${w.week}</span>
          <span><strong>${esc(w.title)}</strong><br><span class="muted small">${w.points.length} points · ${w.questions.length} questions${w.questions.some(q => q.extra) ? ` (${w.questions.filter(q => q.extra).length} new)` : ''}</span></span>
          <span>${last ? `<span class="pill ${last.correct / last.total >= PASS_MARK ? 'good' : 'bad'}">Last ${last.correct}/${last.total}</span>` : ''}</span>
        </button>`;
      }).join('')}</div>`;
  }

  function viewStudy(week, tab = 'points') {
    const w = WEEK[week];
    if (!w) return go('study');
    const hide = !!store.settings.studyHide;
    let body = '';
    if (tab === 'points') {
      body = w.points.map(p => {
        const qs = w.questions.filter(q => q.points.includes(p.id));
        return `<article class="card point">
          <h3><span class="pid">${esc(p.id)}</span>${esc(p.title)}</h3>
          <p>${esc(p.body)}</p>
          ${qs.length ? `<div class="row small">${qs.map(q => `<a class="pill" href="#/study/${week}/questions#q${q.n}">Q${q.n}</a>`).join('')}</div>` : ''}
        </article>`;
      }).join('');
    } else if (tab === 'checklist') {
      body = `<div class="card"><h2>${esc(w.checklistTitle)}</h2>
        <p class="muted small">You may be asked to apply these, so treat each one as a test you could run.</p>
        <ol class="checklist">${w.checklist.map(c => `<li><span>${esc(c)}</span></li>`).join('')}</ol></div>`;
    } else {
      body = `<div class="row" style="margin-bottom:1rem">
          <label class="toggle" style="padding:0"><input type="checkbox" data-act="studyHide" ${hide ? 'checked' : ''}>
          <span>Hide answers until I click <span class="muted small">(self-test)</span></span></label>
        </div>` +
        w.questions.map(q => {
          const st = store.qstats[q.id];
          const pill = st ? `<span class="pill ${st.last ? 'good' : 'bad'}">${st.last ? '✓' : '✗'} last time · ${st.right}/${st.seen} overall</span>` : '';
          return `<article class="card" id="q${q.n}">
            <div class="qhead"><span class="pill">Q${q.n}</span>${newPill(q)}${pill}</div>
            <div class="qtext">${esc(q.question || q.q)}</div>
            ${hide
              ? `<div data-reveal="${q.id}">${optionsHtml(q, { clickable: true })}</div>`
              : optionsHtml(q, { reveal: true }) + explainHtml(q)}
          </article>`;
        }).join('');
    }
    app.innerHTML = `
      <button class="back" data-go="study">← All categories</button>
      <h1>Week ${w.week}: ${esc(w.title)}</h1>
      <div class="card remember"><strong>If you remember one thing.</strong> ${esc(w.remember)}</div>
      <div class="tabs">
        ${[['points', `Points (${w.points.length})`], ['checklist', 'Checklist'], ['questions', 'Questions and answers']].map(([k, l]) =>
          `<button class="${tab === k ? 'active' : ''}" data-go="study/${week}/${k}">${l}</button>`).join('')}
      </div>
      ${body}
      <div class="row"><span class="spacer"></span><button class="btn primary" data-go="start/category/${week}">Take the Week ${week} test →</button></div>`;
    const anchor = location.hash.split('#')[2];
    if (anchor) document.getElementById(anchor)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }

  // ---------- Test setup ----------
  function buildTest(kind, arg) {
    let ids, title, week = null;
    const pool = store.settings.pool;
    if (kind === 'category') {
      week = Number(arg);
      ids = shuffle(poolQs(WEEK[week], pool).map(q => q.id));
      title = `Week ${week} test: ${WEEK[week].title}${poolTag(pool)}`;
    } else if (kind === 'mock') {
      const { per } = mockPlan();
      ids = shuffle(DATA.flatMap(w => shuffle(poolQs(w, pool).map(q => q.id)).slice(0, per)));
      title = `Mock exam (${ids.length} questions${poolTag(pool)})`;
    } else if (kind === 'mistakes') {
      ids = shuffle(mistakeIds());
      title = `Mistakes practice (${ids.length})`;
    } else if (kind === 'retry') {
      ids = shuffle(arg);
      title = `Retry wrong answers (${ids.length})`;
    }
    return {
      mode: kind, week, title,
      items: ids.map(id => ({ qid: id, order: store.settings.shuffle ? shuffle([0, 1, 2, 3]) : [0, 1, 2, 3] })),
      answers: ids.map(() => null),
      flags: ids.map(() => false),
      idx: 0,
      instant: store.settings.instant,
      startedAt: Date.now(),
    };
  }

  // Mock size: 20 or 40 drawn evenly from each week, or 'all' of the chosen set.
  function mockPlan() {
    const s = store.settings;
    const available = ALL_QS.filter(q => inPool(q, s.pool)).length;
    const sizes = [20, 40].filter(n => n < available);
    const size = sizes.includes(s.mockSize) ? s.mockSize : 'all';
    const per = size === 'all' ? Infinity : size / DATA.length;
    return { available, sizes, size, per, count: size === 'all' ? available : size };
  }

  function viewStart(kind, arg) {
    const s = store.settings;
    let heading, desc, count;
    if (kind === 'category') {
      const w = WEEK[arg];
      if (!w) return go('tests');
      heading = `Week ${w.week} test`;
      count = poolQs(w, s.pool).length;
      desc = `${esc(w.title)}: all ${count} questions from the chosen set, in a random order.`;
    } else if (kind === 'mock') {
      heading = 'Mock exam';
      desc = 'Questions drawn evenly from all five weeks, then shuffled.';
      count = mockPlan().count;
    } else {
      count = mistakeIds().length;
      if (!count) return go('home');
      heading = 'Practise my mistakes';
      desc = 'Every question you got wrong on your most recent try. Get one right and it leaves this list.';
    }
    app.innerHTML = `
      <button class="back" data-go="home">← Home</button>
      <div class="card">
        <h1>${heading}</h1>
        <p class="muted">${desc}</p>
        ${kind !== 'mistakes' && POOLS.length > 1 ? `<p><strong>Question set</strong></p>
          <div class="seg" style="margin-bottom:1rem">${POOLS.map(([k, label, n]) =>
            `<button class="${s.pool === k ? 'active' : ''}" data-act="pool" data-pool="${k}">${label} (${kind === 'category' ? poolQs(WEEK[arg], k).length : n})</button>`).join('')}</div>` : ''}
        ${kind === 'mock' ? (() => {
          const m = mockPlan();
          return `<p><strong>Number of questions</strong></p>
          <div class="seg" style="margin-bottom:1rem">${[...m.sizes, 'all'].map(n =>
            `<button class="${m.size === n ? 'active' : ''}" data-act="mockSize" data-n="${n}">${n === 'all' ? `All ${m.available}` : n}</button>`).join('')}</div>
          <p class="muted small">${m.size === 'all' ? `Every question in the set, ${m.available / DATA.length} from each week.` : `${m.per} from each week.`}</p>`;
        })() : `<p><strong>${count} questions</strong></p>`}
        <label class="toggle"><input type="checkbox" data-act="shuffle" ${s.shuffle ? 'checked' : ''}>
          <span><strong>Shuffle answer options</strong><br><span class="muted small">So you learn the answer, not its letter.</span></span></label>
        <label class="toggle"><input type="checkbox" data-act="instant" ${s.instant ? 'checked' : ''}>
          <span><strong>Show the answer straight away</strong><br><span class="muted small">Off is exam conditions: you get your score and the explanations at the end.</span></span></label>
        <p class="muted small">Pass mark: ${Math.round(PASS_MARK * 100)}%, the lab's "15 out of 20" line.</p>
        <div class="row"><span class="spacer"></span>
          <button class="btn primary" data-act="begin" data-kind="${kind}" data-arg="${arg ?? ''}">Start test →</button></div>
      </div>`;
  }

  // ---------- Test ----------
  let timerHandle = null;
  function viewTest() {
    const t = store.current;
    if (!t) return go('home');
    const item = t.items[t.idx];
    const q = Q[item.qid];
    const chosen = t.answers[t.idx];
    const locked = t.instant && chosen !== null;
    const answered = t.answers.filter(a => a !== null).length;
    const last = t.idx === t.items.length - 1;
    app.innerHTML = `
      <div class="testbar">
        <span class="title">${esc(t.title)}</span><span class="spacer"></span>
        <span class="pill">⏱ <span class="timer" id="timer">${fmtTime((Date.now() - t.startedAt) / 1000)}</span></span>
        <span class="pill">${answered}/${t.items.length} answered</span>
      </div>
      <div class="bar"><span style="width:${pct(t.idx + 1, t.items.length)}%"></span></div>
      <div class="card" style="margin-top:1rem">
        <div class="qhead">
          <span class="pill">Question ${t.idx + 1} of ${t.items.length}</span>
          <span class="pill">Week ${q.week}</span>${newPill(q)}
          ${t.flags[t.idx] ? '<span class="pill flag">⚑ Flagged</span>' : ''}
        </div>
        <div class="qtext">${esc(q.q)}</div>
        ${optionsHtml(q, { order: item.order, chosen, reveal: locked, clickable: !locked })}
        ${locked ? explainHtml(q) : ''}
        <div class="testnav">
          <button class="btn" data-act="prev" ${t.idx === 0 ? 'disabled' : ''}>← Back</button>
          <button class="btn flagbtn ${t.flags[t.idx] ? 'on' : ''}" data-act="flag">⚑ ${t.flags[t.idx] ? 'Unflag' : 'Flag'}</button>
          <span class="spacer"></span>
          ${last ? '' : `<button class="btn primary" data-act="next">Next →</button>`}
          <button class="btn ${last ? 'primary' : ''}" data-act="finish">Finish test</button>
        </div>
        <div class="kbd">Keys: <kbd>A</kbd>–<kbd>D</kbd> or <kbd>1</kbd>–<kbd>4</kbd> to answer · <kbd>←</kbd> <kbd>→</kbd> to move · <kbd>F</kbd> to flag</div>
      </div>
      <div class="card">
        <h3>Questions</h3>
        <div class="grid-nav">${t.items.map((it, i) => {
          let cls = '';
          if (t.instant && t.answers[i] !== null) cls = t.answers[i] === Q[it.qid].answer ? 'right' : 'wrongq';
          else if (t.answers[i] !== null) cls = 'answered';
          return `<button class="${cls} ${i === t.idx ? 'current' : ''} ${t.flags[i] ? 'flagged' : ''}" data-jump="${i}">${i + 1}</button>`;
        }).join('')}</div>
        <div class="legend"><span>■ answered</span><span style="color:var(--flag)">● flagged</span><span>▢ not answered</span></div>
      </div>`;
    clearInterval(timerHandle);
    timerHandle = setInterval(() => {
      const el = document.getElementById('timer');
      if (!el || !store.current) return clearInterval(timerHandle);
      el.textContent = fmtTime((Date.now() - store.current.startedAt) / 1000);
    }, 1000);
  }

  function finishTest() {
    const t = store.current;
    const unanswered = t.answers.filter(a => a === null).length;
    const flagged = t.flags.filter(Boolean).length;
    const warn = [unanswered && `${unanswered} unanswered`, flagged && `${flagged} flagged`].filter(Boolean).join(' and ');
    if (warn && !confirm(`You have ${warn} question(s). Finish anyway?`)) return;
    const items = t.items.map((it, i) => ({
      qid: it.qid, order: it.order, chosen: t.answers[i], flagged: t.flags[i],
      right: t.answers[i] === Q[it.qid].answer,
    }));
    const attempt = {
      id: String(Date.now()), mode: t.mode, week: t.week, title: t.title,
      date: new Date().toISOString(), durationSec: Math.round((Date.now() - t.startedAt) / 1000),
      total: items.length, correct: items.filter(i => i.right).length, items,
    };
    for (const it of items) {
      const st = store.qstats[it.qid] || { seen: 0, right: 0 };
      st.seen++; if (it.right) st.right++; st.last = it.right;
      store.qstats[it.qid] = st;
    }
    store.attempts.push(attempt);
    store.current = null;
    save();
    clearInterval(timerHandle);
    go(`results/${attempt.id}`);
  }

  // ---------- Results ----------
  function viewResults(id, filter = 'all') {
    const a = store.attempts.find(x => x.id === id);
    if (!a) return go('history');
    const pass = a.correct / a.total >= PASS_MARK;
    const weeks = [...new Set(a.items.map(i => Q[i.qid].week))].sort();
    const wrong = a.items.filter(i => !i.right);
    const shown = a.items.filter(i => filter === 'all' || (filter === 'wrong' && !i.right) || (filter === 'flagged' && i.flagged));
    app.innerHTML = `
      <button class="back" data-go="home">← Home</button>
      <div class="card score-hero">
        <div class="muted">${esc(a.title)} · ${fmtDate(a.date)} · ${fmtTime(a.durationSec)}</div>
        <div class="verdict ${pass ? 'pass' : 'fail'}">${pass ? 'PASS' : 'NOT YET'}</div>
        <div class="big">${a.correct}/${a.total}</div>
        <div class="muted">${pct(a.correct, a.total)}% · pass mark ${Math.round(PASS_MARK * 100)}%</div>
        ${pass ? '' : '<p class="small" style="margin-top:.75rem">Re-read the points behind the questions you missed (each review below links to its point), then try again tomorrow.</p>'}
        <div class="row" style="justify-content:center;margin-top:1rem">
          ${wrong.length ? `<button class="btn primary" data-act="retry" data-id="${a.id}">Retry the ${wrong.length} wrong</button>` : ''}
          <button class="btn" data-go="${a.mode === 'category' ? `start/category/${a.week}` : a.mode === 'mock' ? 'start/mock' : 'home'}">New test</button>
          ${a.week ? `<button class="btn" data-go="study/${a.week}">Study Week ${a.week}</button>` : ''}
        </div>
      </div>
      ${weeks.length > 1 ? `<div class="card"><h3>By week</h3><div class="breakdown">${weeks.map(wk => {
        const its = a.items.filter(i => Q[i.qid].week === wk);
        const c = its.filter(i => i.right).length;
        return `<div class="line"><div><span class="small">Week ${wk}: ${esc(WEEK[wk].title)}</span>
          <div class="bar ${c / its.length >= PASS_MARK ? 'good' : 'bad'}"><span style="width:${pct(c, its.length)}%"></span></div></div>
          <strong class="num">${c}/${its.length}</strong></div>`;
      }).join('')}</div></div>` : ''}
      <h2>Review</h2>
      <div class="seg filter">${[['all', `All (${a.items.length})`], ['wrong', `Wrong (${wrong.length})`], ['flagged', `Flagged (${a.items.filter(i => i.flagged).length})`]]
        .map(([k, l]) => `<button class="${filter === k ? 'active' : ''}" data-go="results/${a.id}/${k}">${l}</button>`).join('')}</div>
      ${shown.map(it => {
        const q = Q[it.qid];
        const n = a.items.indexOf(it) + 1;
        return `<article class="card">
          <div class="qhead"><span class="pill">Q${n}</span><span class="pill">Week ${q.week} · Q${q.n}</span>${newPill(q)}
            <span class="pill ${it.right ? 'good' : 'bad'}">${it.right ? '✓ Correct' : it.chosen === null ? '— Not answered' : '✗ Wrong'}</span>
            ${it.flagged ? '<span class="pill flag">⚑ Flagged</span>' : ''}</div>
          <div class="qtext">${esc(q.q)}</div>
          ${optionsHtml(q, { order: it.order, chosen: it.chosen, reveal: true })}
          ${explainHtml(q)}
        </article>`;
      }).join('') || '<p class="muted">Nothing to show.</p>'}`;
    window.scrollTo(0, 0);
  }

  // ---------- History ----------
  function viewHistory() {
    const rows = store.attempts.slice().reverse();
    app.innerHTML = `
      <button class="back" data-go="home">← Home</button>
      <h1>Results</h1>
      <div class="card">
        <h3>Category tests</h3>
        <div class="table-wrap"><table>
          <tr><th>Week</th><th>Attempts</th><th>Last</th><th>Best</th><th>Average</th></tr>
          ${DATA.map(w => {
            const at = weekAttempts(w.week);
            const avg = at.length ? Math.round(at.reduce((s, a) => s + (100 * a.correct) / a.total, 0) / at.length) : 0;
            return `<tr><td>${w.week}. ${esc(w.title)}</td><td class="num">${at.length}</td>
              <td class="num">${at.length ? `${at[at.length - 1].correct}/${at[at.length - 1].total}` : '–'}</td>
              <td class="num">${at.length ? `${bestAttempt(at).correct}/${bestAttempt(at).total}` : '–'}</td>
              <td class="num">${at.length ? `${avg}%` : '–'}</td></tr>`;
          }).join('')}
        </table></div>
      </div>
      <div class="card">
        <h3>All attempts</h3>
        ${rows.length ? `<div class="table-wrap"><table>
          <tr><th>Date</th><th>Test</th><th>Score</th><th>Time</th><th></th></tr>
          ${rows.map(a => `<tr>
            <td>${fmtDate(a.date)}</td><td>${esc(a.title)}</td>
            <td class="num"><span class="pill ${a.correct / a.total >= PASS_MARK ? 'good' : 'bad'}">${a.correct}/${a.total}</span></td>
            <td class="num">${fmtTime(a.durationSec)}</td>
            <td><button class="btn" style="padding:.3rem .6rem" data-go="results/${a.id}">Review</button></td></tr>`).join('')}
        </table></div>` : '<p class="muted">No tests taken yet.</p>'}
      </div>
      <div class="row"><span class="spacer"></span><button class="btn danger" data-act="reset">Clear all results</button></div>`;
  }

  // ---------- Router ----------
  function route() {
    const [path] = location.hash.replace(/^#\/?/, '').split('#');
    const parts = path.split('/').filter(Boolean);
    if (parts[0] !== 'test') clearInterval(timerHandle);
    switch (parts[0]) {
      case 'study': return parts[1] ? viewStudy(Number(parts[1]), parts[2]) : viewCategoryPicker('study');
      case 'tests': return viewCategoryPicker('tests');
      case 'start': return viewStart(parts[1], parts[2]);
      case 'test': return viewTest();
      case 'results': return viewResults(parts[1], parts[2]);
      case 'history': return viewHistory();
      default: return viewHome();
    }
  }
  window.addEventListener('hashchange', route);

  // ---------- Events ----------
  function pick(orig) {
    const t = store.current;
    if (!t || (t.instant && t.answers[t.idx] !== null)) return;
    t.answers[t.idx] = orig;
    save();
    viewTest();
  }
  function move(d) {
    const t = store.current;
    const n = t.idx + d;
    if (n < 0 || n >= t.items.length) return;
    t.idx = n; save(); viewTest();
  }

  document.addEventListener('click', e => {
    const goEl = e.target.closest('[data-go]');
    if (goEl) { go(goEl.dataset.go); return; }
    const reveal = e.target.closest('[data-reveal] [data-pick]');
    if (reveal) {
      const box = reveal.closest('[data-reveal]');
      const q = Q[box.dataset.reveal];
      box.innerHTML = optionsHtml(q, { chosen: Number(reveal.dataset.pick), reveal: true }) + explainHtml(q);
      return;
    }
    const pickEl = e.target.closest('[data-pick]');
    if (pickEl) { pick(Number(pickEl.dataset.pick)); return; }
    const jump = e.target.closest('[data-jump]');
    if (jump) { store.current.idx = Number(jump.dataset.jump); save(); viewTest(); return; }
    const act = e.target.closest('[data-act]');
    if (!act) return;
    const s = store.settings;
    switch (act.dataset.act) {
      case 'mockSize': s.mockSize = act.dataset.n === 'all' ? 'all' : Number(act.dataset.n); save(); route(); break;
      case 'pool':
        s.pool = act.dataset.pool; save();
        if (act.dataset.to) go(act.dataset.to); else route();
        break;
      case 'begin':
        store.current = buildTest(act.dataset.kind, act.dataset.arg);
        save(); go('test'); break;
      case 'prev': move(-1); break;
      case 'next': move(1); break;
      case 'flag': store.current.flags[store.current.idx] = !store.current.flags[store.current.idx]; save(); viewTest(); break;
      case 'finish': finishTest(); break;
      case 'discard':
        if (confirm('Discard the test in progress?')) { store.current = null; save(); route(); }
        break;
      case 'retry': {
        const a = store.attempts.find(x => x.id === act.dataset.id);
        store.current = buildTest('retry', a.items.filter(i => !i.right).map(i => i.qid));
        save(); go('test'); break;
      }
      case 'reset':
        if (confirm('Delete every saved result and your question history? This cannot be undone.')) {
          store.attempts = []; store.qstats = {}; store.current = null; save(); route();
        }
        break;
    }
  });
  document.addEventListener('change', e => {
    const act = e.target.dataset.act;
    if (act === 'shuffle' || act === 'instant' || act === 'studyHide') {
      store.settings[act] = e.target.checked; save();
      if (act === 'studyHide') route();
    }
  });
  document.addEventListener('keydown', e => {
    if (!/^#\/?test/.test(location.hash) || !store.current || e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toLowerCase();
    const slot = '1234'.indexOf(k) >= 0 ? '1234'.indexOf(k) : 'abcd'.indexOf(k);
    if (k.length === 1 && slot >= 0) pick(store.current.items[store.current.idx].order[slot]);
    else if (k === 'arrowright') move(1);
    else if (k === 'arrowleft') move(-1);
    else if (k === 'f') { store.current.flags[store.current.idx] = !store.current.flags[store.current.idx]; save(); viewTest(); }
  });

  route();
})();
