# AI Principles Quiz Trainer

A multiple-choice revision app for the Week 6 quiz in **AI Principles and Practice** (Weeks 1 to 5), modelled on the Irish driver theory test apps.

It contains 120 practice questions (the summary's 100, plus 20 new ones) and 60 revision points across five weeks:

1. Data Analysis and the ML Workflow
2. Supervised Learning
3. Ethics, Bias and Fairness
4. AI Safety, Governance and Explainability
5. Unsupervised Learning and the Idea of a Representation

## Modes

- **Study by category:** read each week's points and checklist, then go through every question with its answer, the explanation, and the point it comes from. Turn on "hide answers" to quiz yourself.
- **Mock exam:** questions drawn evenly from all five weeks (20, 40 or all of them), with a score for each week.
- **New questions:** the 20 new questions (4 per week) on their own. They target points the original 100 cover lightly, and each cites the point it tests.
- **Category test:** every question from one week in random order. Every attempt is saved.

Mock exams and category tests let you choose the question set: original + new, original only, or new only. New questions are tagged **New** in tests, results and the study pages.
- **Practise my mistakes:** every question you got wrong on your most recent try.

Tests include a question grid, flagging, a timer, a 75% pass mark, a full review of your answers afterwards, and a "retry the wrong ones" button. Answer options are shuffled by default. You can choose exam conditions (answers at the end) or see each answer straight away.

Keyboard: `A`–`D` or `1`–`4` to answer, `←` `→` to move, `F` to flag.

## Running it

**Online:** https://jor2.github.io/ai-principles-quiz-trainer/ (works on a phone too).

**Locally:** it's a static page with no dependencies and no build step.

**Option 1: open the file.** Double-click `index.html`, or:

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

**Option 2: run a local server** (recommended, so results are saved under a stable address):

```bash
git clone https://github.com/jor2/ai-principles-quiz-trainer.git
cd ai-principles-quiz-trainer
python3 -m http.server 8765
```

Then open http://localhost:8765. Press `Ctrl+C` to stop the server.

Results are kept in your browser's `localStorage`. They stay in the browser you used, and opening the file directly or through the server keeps separate records, so stick to one. You can clear them from the **Results** page.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page shell |
| `styles.css` | Styles, including dark mode and mobile layout |
| `app.js` | Study, test, results and history screens |
| `data.js` | Questions, answers, explanations and revision points, generated from the course's *Weeks 1 to 5 Quiz Summary* |
| `data-extra.js` | The 20 new questions, written from the same summary |
