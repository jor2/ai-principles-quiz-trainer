// Twenty extra questions (four per week), written from "Weeks 1 to 5 Quiz Summary.pdf" to cover
// points the original 100 touch lightly. Each cites the points it tests. Marked extra: true.
window.QUIZ_EXTRA = [
 {
  "week": 1,
  "questions": [
   {
    "q": "In the lab the credit file had zero blank cells. Why might it still contain missing data?",
    "options": [
     "It cannot: a file with no blank cells has, by definition, no missing data",
     "Blank cells are removed automatically when the file is loaded into pandas",
     "Undocumented category codes can be unknown values in disguise",
     "Missing data only exists in stream data, never in a fixed batch file"
    ],
    "answer": 2,
    "why": "Missingness can hide in plain sight; read the codes against the data dictionary. Points 1.7 and 1.11. Dataset question 6.",
    "points": ["1.7", "1.11"],
    "id": "w1x1",
    "n": 21
   },
   {
    "q": "Younger customers skip the income question more often, and age is recorded. Which mechanism is this, and what follows?",
    "options": [
     "MAR: the gap is explained by a recorded column, so others can help fill it",
     "MCAR: the gaps are random, so dropping those rows costs nothing at all",
     "MNAR: the gap depends on the income itself, so no fill is ever honest",
     "None: a skipped question is a refusal, which does not count as missing"
    ],
    "answer": 0,
    "why": "Missing at random means explained by something you did record. Consider a was-missing flag too, since skipping can itself predict behaviour. Point 1.7. Dataset question 6.",
    "points": ["1.7"],
    "id": "w1x2",
    "n": 22
   },
   {
    "q": "A model that was good last year slowly gets worse, though nobody changed its code. What does the Week 1 workflow say?",
    "options": [
     "The code must contain a hidden bug that only shows up under heavy load",
     "Retrain it on exactly the same data, since nothing about the data changed",
     "Nothing: once a model is evaluated and deployed, the workflow is finished",
     "It is a loop: data drifts, so monitoring sends you back to better data"
    ],
    "answer": 3,
    "why": "Real-world data drifts and a good model quietly goes stale; deploy and monitor feeds back into framing and collection. Point 1.1.",
    "points": ["1.1"],
    "id": "w1x3",
    "n": 23
   },
   {
    "q": "A team one-hot encodes a postcode column with 9,000 distinct values. What is the concern?",
    "options": [
     "One-hot encoding invents an order between the postcodes that is not real",
     "It is wasteful: thousands of near-empty columns, one per postcode",
     "Postcodes are continuous, so they should be z-score scaled instead",
     "One-hot only works on binary columns that have exactly two values"
    ],
    "answer": 1,
    "why": "One-hot avoids a false order but becomes wasteful when a column has thousands of values. Point 1.2. Dataset question 2.",
    "points": ["1.2"],
    "id": "w1x4",
    "n": 24
   }
  ]
 },
 {
  "week": 2,
  "questions": [
   {
    "q": "In the lab, lowering the threshold from 0.5 to 0.2 raised recall from 0.24 to about 0.68. What happened to precision, and why?",
    "options": [
     "It rose to about 0.90, because more of the defaulters were caught",
     "It fell to about 0.32: flagging more people brings more false alarms",
     "It stayed at 0.73, because precision does not depend on the threshold",
     "It fell to zero, because a threshold below 0.5 flags every applicant"
    ],
    "answer": 1,
    "why": "Push recall up and precision usually falls; the threshold is a business decision wearing a maths costume. Points 2.10 and 2.11.",
    "points": ["2.10", "2.11"],
    "id": "w2x1",
    "n": 21
   },
   {
    "q": "Which statement about boosting is correct?",
    "options": [
     "It grows many trees independently on resampled data and averages them",
     "It finds the boundary with the widest margin between the two classes",
     "It votes among the k nearest training points, so it does no training",
     "It adds small trees in sequence, each fixing the last one's mistakes"
    ],
    "answer": 3,
    "why": "Bagging cuts variance by averaging; boosting cuts bias in sequence, and its greed can overfit. Point 2.6.",
    "points": ["2.6"],
    "id": "w2x2",
    "n": 22
   },
   {
    "q": "A cancer-screening team reports F1 as its headline metric. What is the objection?",
    "options": [
     "F1 assumes both errors cost the same, but here a missed case costs far more",
     "F1 is a regression metric, so it cannot be computed for a classifier",
     "F1 ignores recall entirely and only reflects the model's precision",
     "There is none: F1 is the right single number for any medical model"
    ],
    "answer": 0,
    "why": "F1 splits the difference, which only makes sense if both errors cost the same; medical diagnosis puts recall first. Points 2.10 and 2.12. Checklist question 3.",
    "points": ["2.10", "2.12"],
    "id": "w2x3",
    "n": 23
   },
   {
    "q": "You need trustworthy probabilities so you can set a cost-based threshold. A colleague proposes a support vector machine. What is the catch?",
    "options": [
     "SVMs cannot be used when the features outnumber the training rows",
     "SVMs only draw straight boundaries, so they cannot fit curved data",
     "An SVM gives distances from the boundary, not calibrated probabilities",
     "An SVM needs every point to be a support vector, which is very slow"
    ],
    "answer": 2,
    "why": "The SVM suits modest data and many features, but it gives distances, not calibrated probabilities. Point 2.6.",
    "points": ["2.6"],
    "id": "w2x4",
    "n": 24
   }
  ]
 },
 {
  "week": 3,
  "questions": [
   {
    "q": "A model uses \"number of past arrests\" as its target for \"risk to the public\". Which kind of data bias is this?",
    "options": [
     "Sampling bias: some groups are over-represented among the rows",
     "Measurement bias: the proxy you could record is not what you meant",
     "Statistical bias: the estimator is systematically off the true value",
     "Cognitive bias: a reviewer's mental shortcut skewed the decision"
    ],
    "answer": 1,
    "why": "Arrests record where policing happened, not risk itself; audit the proxy before any metric. Point 3.5. Fairness question 2.",
    "points": ["3.5"],
    "id": "w3x1",
    "n": 21
   },
   {
    "q": "Which mitigation does Week 3 call the most principled but the least portable?",
    "options": [
     "Pre-processing: reweighting, relabelling or resampling the data",
     "Post-processing: setting a different threshold for each group",
     "Unawareness: deleting the sensitive column before any training",
     "In-processing: building fairness into training as a constraint"
    ],
    "answer": 3,
    "why": "Three places to intervene: data (touches the truth), training (principled, least portable), thresholds (easiest, explicitly unequal). Point 3.12.",
    "points": ["3.12"],
    "id": "w3x2",
    "n": 22
   },
   {
    "q": "An interview panel keeps rating candidates who resemble themselves most highly. Which kind of bias is this, and what fixes it?",
    "options": [
     "Cognitive bias, fixed with process, review and diverse teams",
     "Statistical bias, fixed with more data or a better-fitting model",
     "Societal bias, fixed by deleting the sensitive column from the data",
     "Sampling bias, fixed by collecting more interview transcripts"
    ],
    "answer": 0,
    "why": "Three meanings of bias, three different fixes; keep them apart. Point 3.4.",
    "points": ["3.4"],
    "id": "w3x3",
    "n": 23
   },
   {
    "q": "The data is clean and representative, yet the model's errors pile up on one small minority group. Where does Week 3 point?",
    "options": [
     "The data must be biased after all, since algorithms cannot add bias",
     "The minority group is simply harder to predict, so nothing can be done",
     "The algorithm: averaging and regularisation favour the majority pattern",
     "The test set, which must be too small to contain that group at all"
    ],
    "answer": 2,
    "why": "Aggregation optimises the average and regularisation smooths minorities away; the optimiser is faithful, not malicious. Point 3.6. Fairness question 1.",
    "points": ["3.6"],
    "id": "w3x4",
    "n": 24
   }
  ]
 },
 {
  "week": 4,
  "questions": [
   {
    "q": "A model is fine on the inputs it was tested on but gives bizarre outputs on inputs just outside them. Which mechanism is this?",
    "options": [
     "Specification gaming, because it found a cheap route to its objective",
     "Concept shift, because the link between input and outcome has moved",
     "A bug, because a correctly written model never behaves bizarrely",
     "Brittleness: good on what was tested, unreliable just beyond it"
    ],
    "answer": 3,
    "why": "Name the mechanism: shift, gaming, brittleness or a proxy label each need a different response. Point 4.5.",
    "points": ["4.5"],
    "id": "w4x1",
    "n": 21
   },
   {
    "q": "A lender stores 40 extra personal fields \"in case they help a future model\". Which GDPR principle does this strain?",
    "options": [
     "Article 22, the right not to face a solely automated decision",
     "Data minimisation: each item of personal data must be justified",
     "The EU AI Act's transparency duty for limited-risk systems",
     "The NIST AI RMF's govern function, which is legally binding"
    ],
    "answer": 1,
    "why": "Justify each item of personal data rather than hoarding features just in case. Point 4.7.",
    "points": ["4.7"],
    "id": "w4x2",
    "n": 22
   },
   {
    "q": "A simple surrogate tree is used to explain a black-box model, and it agrees with the black box 70% of the time. How should you treat its explanations?",
    "options": [
     "As reliable, since 70% agreement is well above a coin toss",
     "As a ranking you could defend in a tribunal, since trees are readable",
     "With suspicion: report its fidelity, as it misdescribes 30% of decisions",
     "As proof the black box is fair, since the surrogate can be read directly"
    ],
    "answer": 2,
    "why": "Surrogate infidelity: always report fidelity; a 70% surrogate is a confident lie. Point 4.12. Sign-off question 7.",
    "points": ["4.12"],
    "id": "w4x3",
    "n": 23
   },
   {
    "q": "In a linear model, income has weight 2 and an applicant's income is 3 units above the average. What is income's SHAP value for them?",
    "options": [
     "6: for a linear model it is the weight times the centred value",
     "2: the SHAP value of a linear feature is simply its weight",
     "5: the weight plus how far the value sits from the average",
     "It cannot be known without rerunning every feature ordering"
    ],
    "answer": 0,
    "why": "For a linear model each feature's SHAP value is its weight times its centred value, and the contributions sum exactly to the prediction. Point 4.11.",
    "points": ["4.11"],
    "id": "w4x4",
    "n": 24
   }
  ]
 },
 {
  "week": 5,
  "questions": [
   {
    "q": "One point has a silhouette of −0.2. What does that suggest?",
    "options": [
     "It is very well placed, deep inside its own cluster",
     "It sits exactly on the border between two clusters",
     "It is probably misassigned: it is closer to another cluster",
     "The silhouette was miscalculated, as it cannot be negative"
    ],
    "answer": 2,
    "why": "s = (b − a) ÷ max(a, b): near +1 well placed, near 0 on the border, below 0 probably misassigned. Point 5.6.",
    "points": ["5.6"],
    "id": "w5x1",
    "n": 21
   },
   {
    "q": "Running K-means twice with different random seeds gives different clusters. Why, and what does scikit-learn do about it?",
    "options": [
     "The starting centres are random; n_init runs it several times and keeps the best",
     "The data changed between runs, so the scaler must be refitted each time",
     "K-means is unsupervised, so its answers are random and can never repeat",
     "Lloyd's algorithm never converges, so it stops at a random iteration"
    ],
    "answer": 0,
    "why": "Assign to the nearest centroid, move centroids to the mean, repeat; the start is random, so keep the run with the lowest inertia. Point 5.3.",
    "points": ["5.3"],
    "id": "w5x2",
    "n": 22
   },
   {
    "q": "With hundreds of features, k-NN and K-means both start to perform poorly. What is the usual explanation?",
    "options": [
     "Too many features always cause leakage between training and test data",
     "K-means needs exactly as many clusters as there are features",
     "The features must be one-hot encoded before any distance is measured",
     "The curse of dimensionality: points become almost equally far apart"
    ],
    "answer": 3,
    "why": "As features multiply, \"nearest\" loses its force and distance-based methods weaken; PCA is one response. Point 5.9.",
    "points": ["5.9"],
    "id": "w5x3",
    "n": 23
   },
   {
    "q": "A two-way K-means split matches the deleted group only weakly (adjusted Rand index 0.156), yet PC1 recovers the group 71% of the time. What follows?",
    "options": [
     "The representation is clean, since the clusters do not match the group",
     "The clusters are not the group, but the continuous axis still carries it",
     "PC1 must have been fitted using the group column by mistake",
     "An adjusted Rand index of 0.156 proves the group was never encoded"
    ],
    "answer": 1,
    "why": "A low cluster match does not clear the geometry; probe the representation itself against the base rate. Point 5.13. Structure question 8.",
    "points": ["5.13"],
    "id": "w5x4",
    "n": 24
   }
  ]
 }
];
