// Generated from "Weeks 1 to 5 Quiz Summary.pdf". 5 weeks, 60 points, 100 questions.
window.QUIZ_DATA = [
 {
  "week": 1,
  "title": "Data Analysis and the ML Workflow",
  "remember": "Look before you trust, and split before you learn. A single number can hide the shape of the data, so always plot. And anything learned from the whole dataset before the train/test split leaks the test set into training, which manufactures accuracy out of nothing.",
  "points": [
   {
    "id": "1.1",
    "title": "The workflow is a loop",
    "body": "Every project moves through eight stages: frame the problem, collect data, explore it (EDA, exploratory data analysis), preprocess it, model, evaluate, deploy and monitor. It is a loop, not a line: what evaluation and monitoring reveal sends you back to reframe and to better data, because real-world data drifts and a model that was good last year quietly goes stale. Weeks 1 to 5 live almost entirely in the first four stages, which is where most projects are won or lost."
   },
   {
    "id": "1.2",
    "title": "Know your variable types",
    "body": "Five kinds. Binary: two values (churn). Categorical, or nominal: named groups with no order (region, plan). Ordinal: named groups with an order (satisfaction). Discrete: whole-number counts (tenure in months). Continuous: any value on a scale (age, income). The type decides the summary statistic, the plot, the encoding and the model. Models only eat numbers, so words must be encoded. Ordinal encoding maps Low, Medium, High to 0, 1, 2, and only works if you state the order yourself: left alone, the encoder sorts alphabetically and puts Low between High and Medium. One-hot encoding gives a nominal column one yes-or-no column per category, so no false order is invented; it becomes wasteful when a column has thousands of values, such as a postcode."
   },
   {
    "id": "1.3",
    "title": "Centre, spread and shape",
    "body": "Centre: the mean chases outliers; the median does not. In the running example the mean income is 53,565 and the median 40,388, about 32% higher: the signature of a right-skewed column with a few huge values (the billionaire walking into the room). The median is the honest typical value. Spread: the standard deviation (112,607) is inflated by the same outliers; the IQR, Q3 minus Q1, covers the middle half of the data and ignores the extremes (23,205). Sample variance divides by n − 1. Shape: skewness measures lopsidedness and kurtosis measures heavy tails. In a box plot the box is the IQR, the line is the median, the whiskers reach 1.5 IQRs, and points beyond them are flagged."
   },
   {
    "id": "1.4",
    "title": "Always plot",
    "body": "The Normal (bell) curve is fully described by its mean and standard deviation, but most real data is not Normal. Two columns can share the same mean and the same standard deviation and still be different shapes, one with a single hump and one with two. The numbers cannot tell them apart; a histogram shows it in a second. Choose the chart for the question: histogram, density or box plot for one column; scatter plot for two; grouped bars or a box plot per group to compare groups; a line chart over time; a heatmap or pair plot for many columns. Label honestly."
   },
   {
    "id": "1.5",
    "title": "Correlation and its traps",
    "body": "Pearson measures straight-line association, from −1 to 1, and a few extreme values can wreck it. Spearman correlates the ranks, so it asks whether two things rise together at all (monotonic), and it is immune to outliers and curves. On the same two columns, income and monthly charge, Pearson said 0.14 and Spearman 0.82. Anscombe’s quartet: four datasets with identical mean, variance, correlation and regression line, and completely different pictures. And correlation is not causation: ice-cream sales and drownings rise together because hot weather drives both. Ask whether one causes the other, whether a third thing causes both, or whether it is chance in a small sample."
   },
   {
    "id": "1.6",
    "title": "How the data arrives, and one ruler for every column",
    "body": "Batch: a fixed dataset processed together; reproducible and easy to check, the default for training and coursework. Stream: data keeps arriving, memory is bounded, statistics update as you go, and you must watch for drift. Decide which you are in before you build. Scaling: models that use distances or gradient steps need comparable scales, or income in tens of thousands drowns out age in tens purely because of its units. The z-score subtracts the mean and divides by the standard deviation; min–max squeezes a column into the range 0 to 1."
   },
   {
    "id": "1.7",
    "title": "Missing data: the mechanism matters",
    "body": "MCAR, missing completely at random: the gap has nothing to do with anything, like a sensor dropping a reading; dropping those rows is unbiased, just wasteful. MAR, missing at random: the gap is explained by something you did record (younger users skip the income question), so the other columns can fill it. MNAR, missing not at random: the gap is explained by the missing value itself (high earners hide their income); no simple fill is fully honest. Consider a was-missing flag, because refusing to answer can itself predict behaviour. Median imputation is robust but stacks every gap on one value, creating a spike and shrinking the spread; KNN imputation borrows from similar rows. Missingness can also hide in plain sight: in the lab the credit file had zero blanks, yet undocumented category codes were unknown values in disguise."
   },
   {
    "id": "1.8",
    "title": "Outliers: flag, then decide",
    "body": "Two rules. The z-score rule flags anything more than 3 standard deviations from the mean, and assumes a roughly Normal column. The IQR rule flags anything below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR (the box plot’s whiskers) and assumes nothing about shape, so it is the safer default for messy data. In the example it drew the line at about 88,000 and flagged 26 incomes. Flagging is not deleting. Decide by cause: fix an obvious typo, keep a rare-but-real value (perhaps treating it separately), recognise a different population, and never delete a value just because it is inconvenient."
   },
   {
    "id": "1.9",
    "title": "Too little data, and augmentation",
    "body": "With too few examples a model memorises the rows it saw (overfitting). Rare classes vanish: only 91 of 600 customers churned, so predicting “stayed” for everyone scores about 85% accuracy and catches no one. The menu, best first: collect more real data; reuse a pre-trained model (transfer learning); a simpler, regularised model; and augmentation, which manufactures extra training rows using label-preserving transformations. That one rule is the whole game: flip a photo of a 6 upside down and it becomes a 9, which is corruption, not augmentation. SMOTE places a new minority row a random fraction of the way from a real minority point to one of its near minority neighbours; jitter adds small noise scaled to the column’s spread; generative models (V AEs, GANs, diffusion) learn the distribution and sample from it. Augmentation cannot invent a population your data never contained, and generators can amplify bias that is already there."
   },
   {
    "id": "1.10",
    "title": "Leakage, and the pipeline that prevents it",
    "body": "Leakage: any statistic learned from the whole dataset before the train/test split (scaling, imputing, encoding, feature selection, augmentation) lets the test set seep into training. The demonstration: 200 rows, 5,000 columns of pure noise, random labels, so there is nothing to learn. Choose the 20 best-looking columns using all the data and cross-validation reports 0.795; put the selection inside the pipeline and it reports 0.510, chance, as it must. The cure is mechanical: split first, fit every transform on the training data only, wrap the whole sequence in one Pipeline (with a ColumnTransformer for the columns), and cross-validate the pipeline. Augment only the training split, after the split; never the test set."
   },
   {
    "id": "1.11",
    "title": "Documentation is governance",
    "body": "A data dictionary explains every column: its type, units and quirks (income: continuous, euros, skewed, 8.8% missing). A datasheet explains the whole dataset: why and how it was collected, by whom and under what consent, who is represented and who is missing, the licence, and known biases and limits. This is where the ethics of Weeks 3 and 4 begins, because most unfairness is inherited from the data, not invented by the algorithm. Write it before modelling: a datasheet written first is a description; one written afterwards is a justification."
   }
  ],
  "checklistTitle": "The nine questions to ask of any dataset",
  "checklist": [
   "What decision is this for, and which stage of the workflow am I in?",
   "What type is each column, and does its encoding respect whether order is real?",
   "Is the column skewed enough that the median, not the mean, is the honest typical value?",
   "Have I plotted it, or am I trusting a summary number?",
   "Is the association linear or only monotonic, and could a third variable explain it?",
   "Why is this value missing: at random, explained by another column, or by the value itself?",
   "Is this outlier an error, rare but real, or a different population?",
   "Did I split before learning anything from the data, with every step inside one pipeline?",
   "Who is missing from this data, and have I written that down?"
  ],
  "questions": [
   {
    "q": "Two columns have exactly the same mean and the same standard deviation. What can you conclude about their shapes?",
    "options": [
     "They share a distribution, because centre and spread fully define one",
     "Both are Normal, since a mean and a standard deviation describe them",
     "They must be strongly correlated, since their summaries are identical",
     "Nothing yet: their shapes could differ, so you must plot them"
    ],
    "answer": 3,
    "why": "Identical summaries can hide different shapes; always plot. Point 1.4. Dataset question 4.",
    "points": [
     "1.4"
    ],
    "id": "w1q1",
    "n": 1
   },
   {
    "q": "Only 15% of customers churn. A churn model scores 85% accuracy. What should worry you?",
    "options": [
     "Nothing: 85% accuracy is a strong result for customer data",
     "Predicting “stayed” for everyone also scores about 85%",
     "The model is underfitting and needs more features before it is useful",
     "85% is too high to be genuine for churn, so it must be leakage"
    ],
    "answer": 1,
    "why": "A rare class makes accuracy flatter; too few examples of the important class is a data problem. Point 1.9.",
    "points": [
     "1.9"
    ],
    "id": "w1q2",
    "n": 2
   },
   {
    "q": "Choosing the 20 best of 5,000 noise columns using all the data, then cross-validating, gives 0.795. With the selection inside a pipeline it gives 0.510. Which number is honest?",
    "options": [
     "0.795, because it used all of the data to choose the best features",
     "0.510, because selection was refit inside each training fold",
     "Both, because cross-validation was used to produce each of the numbers",
     "Neither, because 5,000 columns is far too many for any model to handle"
    ],
    "answer": 1,
    "why": "The leakage demonstration: one moved line turns chance into a fictional 0.79. Point 1.10. Dataset question 8.",
    "points": [
     "1.10"
    ],
    "id": "w1q3",
    "n": 3
   },
   {
    "q": "Why does Week 1 insist that the datasheet be written before modelling?",
    "options": [
     "Regulators require the datasheet to be dated earlier than the model",
     "A model cannot be trained unless a datasheet file is already present",
     "The datasheet records the model’s final accuracy, so it must come first",
     "Written first it describes the data; written later it justifies the model"
    ],
    "answer": 3,
    "why": "Documentation is governance, and it is where the ethics of Weeks 3 and 4 begins. Point 1.11. Dataset question 9.",
    "points": [
     "1.11"
    ],
    "id": "w1q4",
    "n": 4
   },
   {
    "q": "A model measures distances between customers using age (18 to 85) and income (tens of thousands), and neither column was scaled. What happens?",
    "options": [
     "Age dominates, because it has far fewer distinct values than income",
     "Income drowns out age purely because its numbers are much larger",
     "Nothing, because distance-based models ignore each column’s units",
     "The model rescales both columns itself before it measures distance"
    ],
    "answer": 1,
    "why": "Distance and gradient methods need comparable scales. Point 1.6.",
    "points": [
     "1.6"
    ],
    "id": "w1q5",
    "n": 5
   },
   {
    "q": "A team applies SMOTE to the whole dataset and then splits it into training and test sets. What is wrong?",
    "options": [
     "Synthetic rows built from test rows can leak into training",
     "Nothing is wrong, provided the random seed is fixed for reproducibility",
     "SMOTE belongs on the test set only, so that the test classes are balanced",
     "SMOTE should run after training, as a check on the finished model"
    ],
    "answer": 0,
    "why": "Split first, then augment the training split only. Points 1.9 and 1.10. Dataset question 8.",
    "points": [
     "1.9",
     "1.10"
    ],
    "id": "w1q6",
    "n": 6
   },
   {
    "q": "Four datasets have identical means, variances, correlations and regression lines. What lesson do they teach?",
    "options": [
     "Summary statistics can hide very different data, so always plot",
     "The four datasets must have been drawn from one underlying source",
     "Linear regression is the right model for all four, as the lines agree",
     "Correlation fully describes a relationship once the variances match"
    ],
    "answer": 0,
    "why": "Anscombe’s quartet. Points 1.4 and 1.5. Dataset question 4.",
    "points": [
     "1.4",
     "1.5"
    ],
    "id": "w1q7",
    "n": 7
   },
   {
    "q": "A survey records satisfaction as Low, Medium or High. A colleague encodes it with an ordinal encoder without passing a category order. What goes wrong?",
    "options": [
     "Nothing: an ordinal encoder reads the natural order from the words",
     "It sorts the words alphabetically, putting Low between High and Medium",
     "It makes three yes-or-no columns, because no order was given to it",
     "It treats satisfaction as continuous and scales it to the range 0 to 1"
    ],
    "answer": 1,
    "why": "Ordinal encoding only preserves order if you state the order yourself. Point 1.2. Dataset question 2.",
    "points": [
     "1.2"
    ],
    "id": "w1q8",
    "n": 8
   },
   {
    "q": "A column is heavily right-skewed with a few extreme values. Which measure of spread should you report, and why?",
    "options": [
     "The standard deviation, because it is in the data’s own units",
     "The variance, because squaring the distances cancels the outliers out",
     "The range, because it is the only measure that shows the full extent",
     "The IQR, because it covers the middle half and ignores the extremes"
    ],
    "answer": 3,
    "why": "The standard deviation is inflated by the same outliers (112,607 against an IQR of 23,205). Point 1.3.",
    "points": [
     "1.3"
    ],
    "id": "w1q9",
    "n": 9
   },
   {
    "q": "A team augments a handwritten-digit dataset by rotating every image by 180 degrees. Why is that a bug?",
    "options": [
     "Rotation is reserved for text and audio, and is never used on images",
     "Augmentation must never change pixel values, only add new copies",
     "Rotating turns some 6s into 9s, so the label is no longer preserved",
     "It doubles the dataset, and doubling the data always causes overfitting"
    ],
    "answer": 2,
    "why": "Every augmentation must be realistic and must leave the label unchanged. Point 1.9.",
    "points": [
     "1.9"
    ],
    "id": "w1q10",
    "n": 10
   },
   {
    "q": "After filling every missing income with the median, a histogram shows a tall spike at one value and the standard deviation has fallen. What happened?",
    "options": [
     "The imputer was fitted on the wrong column and simply needs rerunning",
     "The data already held a large cluster of customers at the median",
     "Every gap was filled with one value, distorting the shape and spread",
     "Nothing is wrong: imputation always leaves a distribution more accurate"
    ],
    "answer": 2,
    "why": "Filling is not free: know what your fill does to the shape. Point 1.7.",
    "points": [
     "1.7"
    ],
    "id": "w1q11",
    "n": 11
   },
   {
    "q": "Customers with high incomes are more likely to leave the income question blank. Which missingness mechanism is this?",
    "options": [
     "MCAR: the gaps have nothing to do with any value, recorded or not",
     "MNAR: the gap depends on the missing value itself, the high income",
     "MAR: the gap is fully explained by another column that you recorded",
     "None: an answer left blank on purpose does not count as missing data"
    ],
    "answer": 1,
    "why": "Missing not at random: the hard case, where no simple fill is fully honest. Point 1.7. Dataset question 6.",
    "points": [
     "1.7"
    ],
    "id": "w1q12",
    "n": 12
   },
   {
    "q": "How does SMOTE create a new training row?",
    "options": [
     "It copies existing minority rows, unchanged, until the classes balance",
     "It removes majority rows at random until the two classes are the same size",
     "It interpolates between a minority example and a near minority neighbour",
     "It adds large random noise to every row so the model cannot memorise them"
    ],
    "answer": 2,
    "why": "Interpolation between real minority points, on training rows only. Point 1.9.",
    "points": [
     "1.9"
    ],
    "id": "w1q13",
    "n": 13
   },
   {
    "q": "The IQR rule flags 26 very large incomes. What should you do next?",
    "options": [
     "Find out why each one is extreme, then decide case by case what to do",
     "Delete all 26, since a value outside the fence is by definition an error",
     "Replace all 26 with the median so that the column looks more Normal",
     "Keep all 26 unchanged, since outliers never affect a model’s fit"
    ],
    "answer": 0,
    "why": "Flagging is not deleting; decide by cause. Point 1.8. Dataset question 7.",
    "points": [
     "1.8"
    ],
    "id": "w1q14",
    "n": 14
   },
   {
    "q": "You are building a model on a live feed of card transactions that never stops arriving. What does Week 1 say you must plan for?",
    "options": [
     "Nothing new, because batch and stream data go through the same steps",
     "Waiting until all of the data has arrived before any processing starts",
     "One-hot encoding every column, numeric ones included, as data arrives",
     "Bounded memory, statistics updated as data arrives, and drift"
    ],
    "answer": 3,
    "why": "Stream processing, and the monitoring loop that follows from it. Points 1.1 and 1.6.",
    "points": [
     "1.1",
     "1.6"
    ],
    "id": "w1q15",
    "n": 15
   },
   {
    "q": "On the same pair of columns, Pearson’s r is 0.14 and Spearman’s ρ is 0.82. What is the most likely explanation?",
    "options": [
     "They are unrelated, and Spearman’s rank method overstates weak links",
     "One of the two calculations must contain an arithmetic error somewhere",
     "The link is causal, which only a rank-based coefficient can detect",
     "They move together, but not in a line, and outliers hurt Pearson"
    ],
    "answer": 3,
    "why": "Pearson sees straight lines and is wrecked by outliers; Spearman sees order. Point 1.5. Dataset question 5.",
    "points": [
     "1.5"
    ],
    "id": "w1q16",
    "n": 16
   },
   {
    "q": "Why is the IQR rule a safer default than the z-score rule for flagging outliers in messy data?",
    "options": [
     "It makes no assumption about the shape of the distribution at all",
     "It always flags fewer values, so less genuine data is thrown away",
     "It is built on the mean, which is steadier than the median here",
     "It is designed for categorical columns, where extreme values are rare"
    ],
    "answer": 0,
    "why": "The IQR rule is the box plot’s whiskers and needs no shape assumption. Point 1.8.",
    "points": [
     "1.8"
    ],
    "id": "w1q17",
    "n": 17
   },
   {
    "q": "In a salary column the mean is €95,000 and the median €41,000. A manager asks what a typical employee earns. What is the honest answer?",
    "options": [
     "About €95,000, because the mean is the only measure that uses every value",
     "About €68,000, halfway between the mean and the median as a compromise",
     "About €41,000: a few huge salaries have dragged the mean upwards",
     "It cannot be answered until you also know the standard deviation"
    ],
    "answer": 2,
    "why": "Mean far above median signals right skew; the median resists the outliers. Point 1.3. Dataset question 3.",
    "points": [
     "1.3"
    ],
    "id": "w1q18",
    "n": 18
   },
   {
    "q": "Towns that send more fire engines to a fire report more damage. Before concluding anything, what should you ask first?",
    "options": [
     "How to cut the number of fire engines each town sends to a fire",
     "Whether the Pearson coefficient between the two is above 0.5 or not",
     "Whether a third factor, such as the size of the fire, drives both",
     "Whether damage should be log-transformed before any correlation is run"
    ],
    "answer": 2,
    "why": "Correlation is not causation; look for the lurking third variable. Point 1.5. Dataset question 5.",
    "points": [
     "1.5"
    ],
    "id": "w1q19",
    "n": 19
   },
   {
    "q": "A column records each customer’s region: North, South, East or West. Which encoding fits, and why?",
    "options": [
     "One-hot, because regions have no order and numbers would invent one",
     "Ordinal, because four categories are few enough to number safely",
     "z-score scaling, so every region sits on the same comparable ruler",
     "None needed, because modern models read category names directly as text"
    ],
    "answer": 0,
    "why": "Nominal variable: numbering it would tell the model West is three times North. Point 1.2. Dataset question 2.",
    "points": [
     "1.2"
    ],
    "id": "w1q20",
    "n": 20
   }
  ]
 },
 {
  "week": 2,
  "title": "Supervised Learning",
  "remember": "The question sets the target, the target sets the metric, and the metric sets the threshold. Accuracy is the number that flatters most, and on rare events it is worthless; decide which error hurts more before you choose how to measure.",
  "points": [
   {
    "id": "2.1",
    "title": "Generalisation, and the three splits",
    "body": "A supervised model is a function: features x in, a prediction ŷ out, ŷ = f(x; θ); training tunes the parameters θ. Fitting the training data is easy; the goal is generalisation, being right about the next case. Memorising is not learning; it only looks like it until the test set. Hold data back in three slices: training fits the parameters; validation chooses everything else (which model, which degree, which k, how much regularisation); test is spent once, at the very end. Every time you peek at the test set to make a decision, it stops being a test."
   },
   {
    "id": "2.2",
    "title": "The target is a decision",
    "body": "The quick answer: a number on a scale means regression a category means classification. The better answer: the target is a decision you make, not a fact of the data. On one customers table, “how much will they spend?” (monthly charge, regression) and “will they leave at all?” (churn, classification) are different problems. Choosing the target is already modelling: get it wrong and the cleverest algorithm answers a question nobody asked."
   },
   {
    "id": "2.3",
    "title": "Linear regression, read honestly",
    "body": "Linear regression chooses coefficients to make the total squared error as small as possible; least squares has a closed form, so it is fast. Each coefficient is the effect of one feature holding the rest fixed, and its sign and size are a claim about the world: a surprising sign means either the world or your data is strange. It is the honest baseline: beat it before reaching for anything fancier. R² is the share of variation explained (0.67 on monthly charge). Always read the residuals as well: a high R² with a curved or funnel-shaped residual plot is a warning, not a win."
   },
   {
    "id": "2.4",
    "title": "Capacity, and regularisation",
    "body": "Polynomial features (x, x², x³ and so on) let the same linear machinery bend, and the degree is a capacity dial. In the booklet: degree 1 underfits (training R² 0.53, test 0.51); degree 3 is about right (0.79 and 0.70); degree 15 overfits (training up to 0.82, test down to 0.65). Regularisation charges for complexity with a penalty λ. Ridge penalises squared coefficients and shrinks them all smoothly, which suits correlated, noisy features. Lasso penalises absolute values and can push weak coefficients exactly to zero, so it also selects features. On a few clean features it barely matters (R² 0.668 against 0.670); on hundreds of correlated ones it is the difference between a model and a memoriser."
   },
   {
    "id": "2.5",
    "title": "Three classifiers and their dials",
    "body": "Logistic regression is a classifier despite its name: a linear score squashed by the sigmoid into a probability, and a threshold, which you choose, turns that into a decision. k-NN does no training: it votes among the k nearest points. k is the dial (k = 1 memorises; a very large k smooths into mush), and because it rests on distance it breaks without scaling. Decision trees ask one yes/no question at a time, each split making the groups purer (Gini or entropy). They are the most readable model here and among the easiest to overfit; depth is the dial. Interpretable and reliable are different virtues."
   },
   {
    "id": "2.6",
    "title": "Ensembles and support vector machines",
    "body": "Bagging, as in a random forest, grows many trees on resampled data and different feature subsets; each is wrong in its own direction and averaging cancels the noise, so variance falls. Boosting adds small trees in sequence, each fixing the last one’s mistakes, so bias falls, but greed can overfit. Ensembles win by diversity, not brilliance. A support vector machine finds the boundary with the widest margin only the points on the edge, the support vectors, shape it; C trades margin width against tolerating awkward points; the kernel trick gives a curved boundary. Reach for it on modest data or when features outnumber rows; it gives distances, not calibrated probabilities."
   },
   {
    "id": "2.7",
    "title": "Loss: what you optimise is what you get",
    "body": "MSE, squared error, punishes big misses hardest. MAE, the plain average error, stops a few outliers dominating the fit. Log-loss, for classification, punishes confident wrong answers. The loss encodes your priorities before a single parameter is learned, so “which loss?” really means “which mistakes can I least afford?”. Answer that first; the optimisation just obeys."
   },
   {
    "id": "2.8",
    "title": "Bias, variance and learning curves",
    "body": "Underfitting: too rigid; training and validation scores both poor and close together; the cure is more capacity. Overfitting: too flexible; brilliant on training data, poor on new data, with a wide gap; the cure is less capacity or more data. Same symptom, opposite cures, so diagnose before you act. Expected error is bias² plus variance plus irreducible noise; no model beats the noise, and the job is the bottom of the U, not zero bias or zero variance. Read a learning curve (score against training-set size): a gap that will not close means variance, so add data, simplify or regularise; both curves flat and low means bias, so add features or capacity, and more data will not help."
   },
   {
    "id": "2.9",
    "title": "Cross-validation, and regression metrics",
    "body": "One split gives one number and a false sense of precision; it is an anecdote. k-fold cross-validation rotates the held-out slice so every point is judged once, giving a mean and a spread. Cross-validate the whole pipeline, so the scaler and imputer are refit inside each fold, or you are back to Week 1’s leakage. RMSE is the typical error in the target’s own units and punishes large misses; MAE is the plain average error; R² is unitless and comparable but flatters on easy data. When RMSE is much larger than MAE, a few big errors are doing the damage."
   },
   {
    "id": "2.10",
    "title": "Accuracy lies; precision and recall tell you more",
    "body": "On rare events accuracy is the number that lies most: with 3.4% fraud, “never fraud” scores 96.6% and catches nothing. The churn models all sat near 88% accuracy while recall ran from 0.39 (k-NN, missing six in ten leavers) to 0.78; in the lab every model scored about 81% while logistic regression caught only 24% of defaulters. The confusion matrix shows four outcomes, and the two errors rarely cost the same: decide which hurts more first. Precision = TP ÷ (TP + FP): of those flagged, how many were real. Recall = TP ÷ (TP + FN): of the real ones, how many were caught. Push one up and the other usually falls. F1 splits the difference, which only makes sense if both errors cost the same."
   },
   {
    "id": "2.11",
    "title": "ROC, precision–recall, and the threshold",
    "body": "The ROC curve sweeps every threshold; AUC is the chance the model ranks a random positive above a random negative, and 0.5 is a coin toss. It is threshold-free and good for ranking, but says nothing about where to cut. With rare positives the ROC curve looks reassuringly high even for a nearly useless model; the precision–recall curve ignores the huge, easy negative class and stays honest, so read PR-AUC. The threshold is a dial, not a default: 0.5 is a convention. Set it where the costs of the two errors balance. In the lab, moving it from 0.5 to 0.2 raised recall from 0.24 to about 0.68 while precision fell from 0.73 to about 0.32. It is a business decision wearing a maths costume."
   },
   {
    "id": "2.12",
    "title": "Framing real problems",
    "body": "The chain is question, then target, then metric, then threshold: what decision, predict what, measured how, act when. The algorithm is the easy, replaceable part; get the target and metric right and a plain logistic regression beats a mis-aimed neural network. The same algorithms serve every domain, but the metric changes: medical diagnosis puts recall first, because a missed case is the costly mistake; spam and fraud need precision and PR- AUC, because a blocked genuine card is a furious customer. A probability is not an action: the model informs and the policy decides. And data drifts, so last year’s threshold quietly rots."
   }
  ],
  "checklistTitle": "The five questions before you choose a target and metric",
  "checklist": [
   "What decision does this feed, and what does a wrong one cost?",
   "Is the honest target a number or a category?",
   "Which error, a false positive or a false negative, hurts more here?",
   "Is the positive class rare? If so, retire accuracy and ROC for precision–recall.",
   "Where should the threshold sit so the costs actually balance?"
  ],
  "questions": [
   {
    "q": "A screening model for a serious disease is being evaluated. Which metric does Week 2 say comes first?",
    "options": [
     "Precision, because each false alarm means an expensive follow-up",
     "Accuracy, because it counts both kinds of error in a single number",
     "R², because it is unitless and easy to compare across hospitals",
     "Recall, because a missed case is by far the more costly mistake"
    ],
    "answer": 3,
    "why": "Medical diagnosis: recall dominates. Point 2.12. Checklist question 3.",
    "points": [
     "2.12"
    ],
    "id": "w2q1",
    "n": 1
   },
   {
    "q": "A bank’s analysts ask “how much will this customer borrow?” and “will this customer default?” of the same table. What does Week 2 say?",
    "options": [
     "They are one problem, so a single model can answer both at once",
     "The table decides the target, so only one of the questions is valid",
     "They are different problems: regression and classification",
     "Both are classification, because anything involving money is a risk"
    ],
    "answer": 2,
    "why": "The target is a decision you make, not a fact of the data. Point 2.2. Checklist question 2.",
    "points": [
     "2.2"
    ],
    "id": "w2q2",
    "n": 2
   },
   {
    "q": "A regression has R² = 0.85, but its residual plot shows a clear curve. What should you conclude?",
    "options": [
     "An R² above 0.8 shows that the linear form of the model is correct",
     "It is missing structure; the curved residuals are a warning",
     "Residuals can safely be ignored whenever R² is as high as this",
     "It is overfitting, because an R² of 0.85 is suspiciously high"
    ],
    "answer": 1,
    "why": "The picture catches what the number hides. Point 2.3.",
    "points": [
     "2.3"
    ],
    "id": "w2q3",
    "n": 3
   },
   {
    "q": "A team reports one train/test split AUC of 0.74 for its pipeline. What does Week 2 recommend instead?",
    "options": [
     "Cross-validate the whole pipeline to get a mean and a spread",
     "Report the training AUC next to the test AUC for comparison",
     "Scale all the data once, then cross-validate just the final model",
     "Repeat exactly the same split several times and average the results"
    ],
    "answer": 0,
    "why": "One split is an anecdote; five folds are evidence. Point 2.9.",
    "points": [
     "2.9"
    ],
    "id": "w2q4",
    "n": 4
   },
   {
    "q": "A k-NN model performs badly. The features were never standardised: income is in thousands, age in years. What is the likely problem?",
    "options": [
     "k-NN needs more training epochs before its neighbours settle down",
     "k is too large, so the model has simply memorised every point",
     "k-NN cannot use numeric features, so both columns must be one-hot",
     "Income dominates the distances, so it decides who is “nearest”"
    ],
    "answer": 3,
    "why": "Distances need comparable scales; Week 1 pays off. Point 2.5.",
    "points": [
     "2.5"
    ],
    "id": "w2q5",
    "n": 5
   },
   {
    "q": "A model scores 99% on its training data and 62% on the test set. What has happened, and what is the cure?",
    "options": [
     "Underfitting: add capacity, since the test score is far too low",
     "The test set is too hard and should be swapped for an easier one",
     "Leakage: the scaler must have been fitted on the test data too",
     "Overfitting (variance): reduce capacity, regularise or add data"
    ],
    "answer": 3,
    "why": "A wide gap between training and test is variance. Point 2.8.",
    "points": [
     "2.8"
    ],
    "id": "w2q6",
    "n": 6
   },
   {
    "q": "Four churn models all score about 88% accuracy, but their recall ranges from 0.39 to 0.78. What does this mean for choosing between them?",
    "options": [
     "They are equivalent, since their accuracy is the same to two digits",
     "Accuracy cannot separate them; 0.39 recall misses six in ten leavers",
     "The 0.39 model is best, because low recall always means high precision",
     "Recall stops mattering once accuracy is above 80% on a dataset"
    ],
    "answer": 1,
    "why": "Accuracy hid a recall spread that matters to the business. Point 2.10.",
    "points": [
     "2.10"
    ],
    "id": "w2q7",
    "n": 7
   },
   {
    "q": "You have 400 correlated, noisy features and suspect most are useless. You want a model that keeps only the useful ones. Which fits best?",
    "options": [
     "Lasso, because it can push weak coefficients exactly to zero",
     "Ridge, because its squared penalty removes weak features entirely",
     "Ordinary least squares, because it is the honest baseline to beat",
     "A degree-15 polynomial, because it has the capacity to sort them out"
    ],
    "answer": 0,
    "why": "Lasso shrinks and selects; ridge shrinks without selecting. Point 2.4.",
    "points": [
     "2.4"
    ],
    "id": "w2q8",
    "n": 8
   },
   {
    "q": "Training and validation scores are both low and close together, and adding more data does not help. What should you do?",
    "options": [
     "Collect more data until the training and validation curves separate",
     "Increase regularisation, so the coefficients are shrunk further",
     "Cap the model’s depth, so it has less room to fit the noise",
     "Add features or capacity, because this pattern is underfitting"
    ],
    "answer": 3,
    "why": "Both curves flat and low means bias; more data will not help. Point 2.8.",
    "points": [
     "2.8"
    ],
    "id": "w2q9",
    "n": 9
   },
   {
    "q": "A classifier gives probability 0.99 to “no default” for a customer who then defaults. Which loss punishes this hardest?",
    "options": [
     "MAE, because it averages the size of every error in the same way",
     "Log-loss, because it punishes confident wrong answers hardest",
     "R², because it measures the share of variation left unexplained",
     "Accuracy, because the prediction was wrong and accuracy counts that"
    ],
    "answer": 1,
    "why": "The loss encodes which mistakes you can least afford. Point 2.7.",
    "points": [
     "2.7"
    ],
    "id": "w2q10",
    "n": 10
   },
   {
    "q": "A fully grown decision tree reaches 100% training accuracy and is easy to read. What does Week 2 warn?",
    "options": [
     "A readable tree is always trustworthy, since its reasoning is visible",
     "Trees cannot overfit, because every split makes the groups purer",
     "Readable is not reliable: an unchecked tree memorises, so cap its depth",
     "The tree needs to grow deeper still before it is able to generalise"
    ],
    "answer": 2,
    "why": "Depth is the tree’s capacity dial. Point 2.5.",
    "points": [
     "2.5"
    ],
    "id": "w2q11",
    "n": 11
   },
   {
    "q": "Why does a random forest usually beat a single, carefully tuned decision tree?",
    "options": [
     "Its trees err in different directions, so averaging cancels errors",
     "Each tree in a forest is individually more accurate than the tuned tree",
     "It fixes each earlier tree’s mistakes in sequence, which cuts the bias",
     "It never needs tuning, so it cannot be tuned badly the way one tree can"
    ],
    "answer": 0,
    "why": "Ensembles win by diversity, not brilliance. Point 2.6.",
    "points": [
     "2.6"
    ],
    "id": "w2q12",
    "n": 12
   },
   {
    "q": "A student tries five settings, checks each one on the test set, and reports the best test score. What is wrong?",
    "options": [
     "Nothing, because the test data was never used to fit any parameters",
     "Five settings are too few; a fair search tries at least fifty of them",
     "The test set has become a tuning set, so it is no longer a test",
     "The student should have reported the mean of the five test scores"
    ],
    "answer": 2,
    "why": "Tuning belongs on validation data or cross-validation; the test set is spent once. Points 2.1 and 2.9.",
    "points": [
     "2.1",
     "2.9"
    ],
    "id": "w2q13",
    "n": 13
   },
   {
    "q": "The library’s default threshold is 0.5. Your client says a missed defaulter costs ten times more than a false alarm. What should you do?",
    "options": [
     "Move the threshold, probably lower, until the two costs balance",
     "Keep 0.5, since it is the mathematically correct place to cut",
     "Retrain on more data until the default threshold works on its own",
     "Switch the evaluation metric to accuracy, which weighs errors equally"
    ],
    "answer": 0,
    "why": "The threshold is a business decision wearing a maths costume. Point 2.11. Checklist question 5.",
    "points": [
     "2.11"
    ],
    "id": "w2q14",
    "n": 14
   },
   {
    "q": "A model’s ROC-AUC is 0.95 on data where positives are 2% of cases. A colleague calls it nearly perfect. What should you check?",
    "options": [
     "The precision–recall curve, since ROC flatters rare positives",
     "Nothing more: an AUC above 0.9 means the model is ready to use",
     "The training accuracy, to confirm the AUC was computed correctly",
     "The model’s R², to see how much of the variation it explains"
    ],
    "answer": 0,
    "why": "Rare positives: read PR-AUC, not ROC-AUC. Point 2.11. Checklist question 4.",
    "points": [
     "2.11"
    ],
    "id": "w2q15",
    "n": 15
   },
   {
    "q": "On a spending model the RMSE is €450 and the MAE is €90. What does the gap tell you?",
    "options": [
     "The model is off by roughly the same amount for every customer",
     "A handful of very large errors is doing most of the damage here",
     "The two metrics must have been computed on different test data",
     "MAE is always about a fifth of RMSE, so the gap tells you nothing"
    ],
    "answer": 1,
    "why": "RMSE punishes large misses; MAE is kinder to them. Point 2.9.",
    "points": [
     "2.9"
    ],
    "id": "w2q16",
    "n": 16
   },
   {
    "q": "A linear regression predicting spending gives income a large negative coefficient. What is the right response?",
    "options": [
     "Drop income, because a negative coefficient signals a coding error",
     "Ignore it, since only the model’s R² matters when judging a regression",
     "Swap to a neural network, which avoids misleading coefficients",
     "Treat it as a claim about the world, and check it before trusting it"
    ],
    "answer": 3,
    "why": "Read a regression, don’t just run it. Point 2.3.",
    "points": [
     "2.3"
    ],
    "id": "w2q17",
    "n": 17
   },
   {
    "q": "As polynomial degree rises from 3 to 15, training R² goes up and test R² goes down. What is this?",
    "options": [
     "Underfitting: even degree 15 is still too simple for this data",
     "Leakage: rows from the test set have crept into the training data",
     "Overfitting: the extra capacity has started fitting the noise",
     "A sign that the test set is too small for its score to be trusted"
    ],
    "answer": 2,
    "why": "Training up, test down is overfitting made numerical. Points 2.4 and 2.8.",
    "points": [
     "2.4",
     "2.8"
    ],
    "id": "w2q18",
    "n": 18
   },
   {
    "q": "Fraud is 3.4% of transactions. A model that always predicts “not fraud” scores 96.6% accuracy. What does this show?",
    "options": [
     "The model is excellent and ready to be deployed to production",
     "The model is overfitting the small number of fraud cases it saw",
     "Accuracy flatters on rare events: it catches no fraud at all",
     "The data must contain leakage, since 96.6% is too good to be true"
    ],
    "answer": 2,
    "why": "Quote accuracy on a rare event and someone should stop you. Point 2.10. Checklist question 4.",
    "points": [
     "2.10"
    ],
    "id": "w2q19",
    "n": 19
   },
   {
    "q": "What does an AUC of 0.5 mean?",
    "options": [
     "It is right about half the time when the threshold is set at 0.5",
     "It ranks a random positive above a random negative no better than chance",
     "It catches half of the actual positives and misses the other half",
     "Its predicted probabilities are perfectly calibrated at every score"
    ],
    "answer": 1,
    "why": "AUC is a ranking measure; 0.5 is chance. Point 2.11.",
    "points": [
     "2.11"
    ],
    "id": "w2q20",
    "n": 20
   }
  ]
 },
 {
  "week": 3,
  "title": "Ethics, Bias and Fairness",
  "remember": "“Fair” means nothing without a criterion. One model can fail three fairness tests and pass a fourth, and when groups have different base rates the criteria cannot all hold at once. Every fix moves unfairness rather than deleting it, so choose openly, cost the choice, and name who pays.",
  "points": [
   {
    "id": "3.1",
    "title": "Fairness is a modelling concern",
    "body": "If ethics comes last it is decoration: by the time the model ships, every consequential choice (what to predict, about whom, optimised for what) is frozen. Fairness is decided upstream, at the target, the loss and the data. A model is an argument about the world: the target says what counts as success, the loss says which mistakes you will accept, and the data says whose past you generalise from. None is neutral. So do not ask “is this model biased?” as a yes or no; ask “what does it assume, and who benefits if the assumption holds?”"
   },
   {
    "id": "3.2",
    "title": "Accuracy is already a value choice",
    "body": "Accuracy treats every error the same; reality never does. A model that is 95% accurate can be catastrophic if the 5% it fails are all the same people, and the average hides that. Three ethical lenses judge the same threshold differently. Consequentialist: does it produce better outcomes overall? It ignores how the harm is distributed. Deontological: does it treat people as ends, by fair rules? It may reject a model that helps the average person. Rawlsian justice: does it improve the position of the worst-off? It can cost aggregate performance. Pick the lens before you tune, or the metric picks the ethics for you."
   },
   {
    "id": "3.3",
    "title": "Whose fairness, and why it is close to zero-sum",
    "body": "The applicant wants an equal shot, the lender wants precision on repayment, the regulator wants no disparate impact, and society wants the historical gap to shrink. Some of these are mutually exclusive, and whoever defines fairness is usually not the person the model decides about. The better question is not “how accurate is it?” but “could you defend this decision to the person it was made about?” With a bounded budget (one pool of approvals, one threshold), an assumption that fits one group well and another badly allocates approvals between them. It is not strictly zero-sum: better data or features can lift both groups, but that runs out where base rates genuinely differ."
   },
   {
    "id": "3.4",
    "title": "Three meanings of “bias”",
    "body": "Statistical bias: an estimator systematically off the true value; fixed with more or better data or a better model. Social bias: systematically worse outcomes for a group; the fix is sometimes structural, not technical. Cognitive bias: human judgement skewed by mental shortcuts; fixed with process, review and diverse teams. Keep them apart, because reducing statistical bias can increase social bias: a more accurate model of an unjust world reproduces the injustice more faithfully."
   },
   {
    "id": "3.5",
    "title": "Data bias, and the label",
    "body": "The training set is a record, not a neutral photograph. Four kinds: sampling (who is over- or under-represented), historical (past decisions baked in as ground truth), measurement (the proxy you could record is not the thing you meant) and labelling (someone’s judgement frozen as the target). The label is usually the real crime scene. You wanted creditworthiness; what you have is “did the bank approve them last time, and did they repay”, shaped by who was offered credit at all. Train on that and you learn who the old system favoured. Audit the gap between a proxy label and what you care about before you touch a metric."
   },
   {
    "id": "3.6",
    "title": "Algorithmic and societal bias: point at the stage",
    "body": "Even with clean data the algorithm adds a slant: the objective rewards shortcuts you did not mean; aggregation optimises the average, a choice about whose errors are visible; regularisation nudges toward the majority pattern and smooths minorities away. The optimiser is faithful, not malicious. Societal bias: some gaps are real because the world that produced them was unequal, and a model can be perfectly accurate about that world and still entrench it. Accuracy and justice are different axes. When someone says “the algorithm is biased”, make them point at the stage; usually it is upstream of the model."
   },
   {
    "id": "3.7",
    "title": "Deleting the column does not work, and feedback makes it worse",
    "body": "Fairness through unawareness (deleting the sensitive column) is a weak defence. Through redundant encoding, other features act as proxies: in the lecture’s credit model, group membership was recoverable from the score alone 70% of the time, against a 42% base rate. Blindness is not fairness. Feedback loops: deny loans to a group and you never observe their repayments, so next year’s data holds even less signal about them, and the model grows more confident and more wrong. A snapshot audit misses this. In the lab, on the real credit data, sex was not recoverable from the other features: you do not know until you measure."
   },
   {
    "id": "3.8",
    "title": "One confusion matrix per group",
    "body": "Every group fairness metric compares two confusion matrices, one per group: compute Week 2’s matrix for each group, then argue about which cell you allow to differ. Group fairness compares rates across groups: easy to measure, blind to the individual. Individual fairness: similar people, similar treatment; intuitive, but defining “similar” smuggles values back in. Enforcing one can violate the other."
   },
   {
    "id": "3.9",
    "title": "Demographic parity and the four-fifths rule",
    "body": "Demographic parity: the same approval rate in every group. Simple and legible, but it looks only at the decision, never at who deserved it; if outcomes genuinely differ, it can force approving less-qualified applicants. It is right when you believe the label itself is corrupted by past injustice, and that is an argument you must make. Disparate impact is a legal test in ratio space: the disadvantaged group’s selection rate divided by the advantaged group’s must reach 0.80, the four-fifths rule. The lecture model approves 58% against 22%: 0.215 ÷ 0.577 = 0.37, under half the floor."
   },
   {
    "id": "3.10",
    "title": "Equalised odds, calibration, and four verdicts",
    "body": "Equalised odds: equal true-positive and equal false-positive rates across groups, so being right or wrong does not depend on your group. It conditions on the truth and is often the more defensible ask. Equal opportunity relaxes it to equal true-positive rates only (“don’t miss the deserving”). The lecture model: TPR 75% against 39%. Calibration: a score of 0.7 means a 70% rate in every group. Here precision is nearly level (69% against 66%) and the model is roughly calibrated, while selection and TPR are miles apart. One model fails parity, disparate impact and equal opportunity, and passes calibration. The real question: “ fair by which criterion, and can you justify that choice?”"
   },
   {
    "id": "3.11",
    "title": "The impossibility result",
    "body": "When two groups have different base rates, no classifier can have equal calibration, equal false-positive rates and equal false-negative rates at once, except in degenerate cases (Kleinberg, Mullainathan and Raghavan, 2016; Chouldechova, 2017). It is a theorem, not a lack of effort. Watch it happen: force equal selection and Group B’s precision falls from 66% to about 50%. You moved the unfairness; you did not remove it. So a tool that promises a “fair” model with no further questions has made the choice for you. Choosing a criterion is a stance on whether the base-rate gap is real or the residue of injustice; that belongs to stakeholders and the affected public, and your job is to make it legible and priced."
   },
   {
    "id": "3.12",
    "title": "Mitigation, who pays, and the assessment",
    "body": "Three places to intervene. Pre-processing changes the data (reweight, relabel, resample) and touches the truth. In-processing puts fairness into training as a constraint: most principled, least portable. Post-processing sets per- group thresholds: easiest to bolt on, explicitly unequal treatment, so be ready to say so publicly. Cost the fix and name who pays: pushing toward parity barely moved aggregate accuracy, but Group A’s approvals fell from 58% to 45%. Mitigation is redistribution. The one-page ethical-impact assessment has five parts: Context; Findings, worst gap first; Choice, which criterion and why; Cost, what it spent and who bore it; Residual risk, what you did not fix and what would make you refuse to ship."
   }
  ],
  "checklistTitle": "The eight questions for any claim that a model is fair",
  "checklist": [
   "At which stage of the pipeline did the bias enter? Point at it.",
   "Is the label the thing you care about, or a record of what an old system decided?",
   "Which ethical lens did you choose, and did you choose it before tuning?",
   "Fair by which criterion, and could you defend that choice to the person decided about?",
   "Do the groups’ base rates differ? If so, which criteria cannot hold together?",
   "Did you measure whether the removed attribute can be recovered, or assume it?",
   "What does the mitigation cost, and who pays?",
   "What would make you refuse to ship?"
  ],
  "questions": [
   {
    "q": "A team reduces the statistical bias of its model, so it predicts outcomes in an unequal world more accurately. What can happen to social bias?",
    "options": [
     "It can rise, because the injustice is reproduced more faithfully",
     "It must fall, because accuracy and fairness always move together",
     "It is unaffected, because the two kinds of bias are unrelated",
     "It vanishes as soon as the statistical bias reaches zero"
    ],
    "answer": 0,
    "why": "Three meanings of one word; they can pull in opposite directions. Point 3.4.",
    "points": [
     "3.4"
    ],
    "id": "w3q1",
    "n": 1
   },
   {
    "q": "A model’s selection rates are 0.577 and 0.215. Someone reports “a 36-point gap, so it fails”. What is the precise statement under the four-fifths rule?",
    "options": [
     "The difference, 0.36, is more than 0.20, so the model fails",
     "The rule compares precision across groups, not selection rates",
     "The rule only applies when the ratio of the rates is above 1",
     "The ratio, 0.215 ÷ 0.577 = 0.37, is under the 0.80 floor"
    ],
    "answer": 3,
    "why": "Read disparate impact as a ratio against 0.80. Point 3.9.",
    "points": [
     "3.9"
    ],
    "id": "w3q2",
    "n": 2
   },
   {
    "q": "Which ethical lens asks whether a decision rule improves the position of the worst-off group?",
    "options": [
     "Consequentialist ethics",
     "Deontological ethics",
     "Rawlsian justice",
     "Demographic parity"
    ],
    "answer": 2,
    "why": "Justice as improving the position of the worst-off. Point 3.2.",
    "points": [
     "3.2"
    ],
    "id": "w3q3",
    "n": 3
   },
   {
    "q": "A predictive-policing model sends patrols where it predicts crime, and those patrols record more crime there. Year on year it looks more accurate. What is happening?",
    "options": [
     "It is truly improving, because it has more data every year",
     "A feedback loop: its own decisions shape the data it is judged on",
     "Crime really does concentrate there, so nothing needs to change",
     "It is underfitting, so it needs more capacity to see the pattern"
    ],
    "answer": 1,
    "why": "The disparity is manufactured by the system, not just measured by it. Point 3.7.",
    "points": [
     "3.7"
    ],
    "id": "w3q4",
    "n": 4
   },
   {
    "q": "In the lab, on the real credit data, the model passed the four-fifths rule and sex could not be recovered from the other features. What is the lesson?",
    "options": [
     "Fairness through unawareness always works on real-world data",
     "Real datasets are never biased; only synthetic ones are",
     "The lecture’s credit model must have been built incorrectly",
     "You don’t know until you measure it on the data you have"
    ],
    "answer": 3,
    "why": "Measure recoverability and disparity; never assume them either way. Points 3.7 and 3.9. Fairness question 6.",
    "points": [
     "3.7",
     "3.9"
    ],
    "id": "w3q5",
    "n": 5
   },
   {
    "q": "Among applicants who would truly repay, Group A is approved 75% of the time and Group B 39%. Which criterion does this violate?",
    "options": [
     "Equal opportunity, and therefore equalised odds",
     "Calibration, because the scores mean different things by group",
     "Demographic parity alone, since it compares approval rates",
     "None, because the two groups have different base rates"
    ],
    "answer": 0,
    "why": "Equal opportunity conditions on the truth: equal approval among those who would repay. Point 3.10. Fairness question 4.",
    "points": [
     "3.10"
    ],
    "id": "w3q6",
    "n": 6
   },
   {
    "q": "A model is well calibrated in both groups but has very different selection rates. Which statement is right?",
    "options": [
     "A calibrated model cannot have different selection rates by group",
     "The selection rates must have been miscalculated somewhere",
     "Both can hold at once: calibrated, yet far apart on selection",
     "Calibration in both groups already implies demographic parity"
    ],
    "answer": 2,
    "why": "One model: well calibrated and wildly unequal on selection. Point 3.10.",
    "points": [
     "3.10"
    ],
    "id": "w3q7",
    "n": 7
   },
   {
    "q": "A team picks the threshold that maximises total profit and later finds the harm falls almost entirely on one small group. Which lens did they implicitly adopt?",
    "options": [
     "Consequentialist: best overall outcome, blind to who bears the harm",
     "Deontological: the same fair rules applied to every applicant",
     "Rawlsian justice: improving the position of the worst-off",
     "Individual fairness: similar people receive similar treatment"
    ],
    "answer": 0,
    "why": "Pick the lens before you tune, or the metric picks it for you. Point 3.2. Fairness question 3.",
    "points": [
     "3.2"
    ],
    "id": "w3q8",
    "n": 8
   },
   {
    "q": "A credit model approves Group A at 60% and Group B at 45%. Does it pass the four-fifths rule?",
    "options": [
     "No: the ratio is 45 ÷ 60 = 0.75, which falls short of 0.80",
     "Yes: a 15-point gap is inside the margin that the rule allows",
     "Yes: both approval rates are comfortably above the 40% line",
     "No: any difference in approval rates at all fails the rule"
    ],
    "answer": 0,
    "why": "The rule works in ratio space, not rate space. Point 3.9.",
    "points": [
     "3.9"
    ],
    "id": "w3q9",
    "n": 9
   },
   {
    "q": "Two groups have different base rates. A vendor promises a model that is calibrated and has equal false-positive and false-negative rates in both. What should you conclude?",
    "options": [
     "It can, provided there is enough training data for both groups",
     "It cannot, except in degenerate cases: the impossibility result",
     "It can, provided the neural network is large enough to fit both",
     "It can, once the sensitive column is deleted from the features"
    ],
    "answer": 1,
    "why": "A theorem, not a limitation of effort. Point 3.11. Fairness question 5.",
    "points": [
     "3.11"
    ],
    "id": "w3q10",
    "n": 10
   },
   {
    "q": "A bank deletes the ethnicity column from its loan model and declares the model fair. What is the strongest objection?",
    "options": [
     "Deleting any column always costs more accuracy than it is worth doing",
     "Other features can act as proxies and rebuild it, so measure that",
     "The law requires the sensitive column to be kept in every model",
     "None: a model cannot discriminate on a column it has never seen"
    ],
    "answer": 1,
    "why": "Blindness is not fairness; redundant encoding keeps the information. Point 3.7. Fairness question 6.",
    "points": [
     "3.7"
    ],
    "id": "w3q11",
    "n": 11
   },
   {
    "q": "After forcing equal selection rates, Group B’s precision falls from 66% to about 50%. What does this illustrate?",
    "options": [
     "The mitigation has failed and should simply be undone at once",
     "Precision is not a fairness metric, so the fall can be ignored",
     "The unfairness moved to another metric instead of disappearing",
     "Group B’s applicants became less creditworthy when it was applied"
    ],
    "answer": 2,
    "why": "Every fix transfers unfairness; the question is which transfer you can defend. Point 3.11.",
    "points": [
     "3.11"
    ],
    "id": "w3q12",
    "n": 12
   },
   {
    "q": "In the ethical-impact assessment, what belongs under “Residual risk”?",
    "options": [
     "The model’s overall accuracy on the held-out test set",
     "The fairness criterion you chose, and why you chose that one",
     "The group metrics, stated plainly with the worst gap first",
     "What you did not fix, and what would make you refuse to ship"
    ],
    "answer": 3,
    "why": "Context, Findings, Choice, Cost, Residual risk. Point 3.12. Fairness question 8.",
    "points": [
     "3.12"
    ],
    "id": "w3q13",
    "n": 13
   },
   {
    "q": "A model predicts repayment from labels recording “was approved by the old system and repaid”. What is the main risk?",
    "options": [
     "The labels are far too noisy for any model to learn from them",
     "It learns whom the old approval system favoured, not who can repay",
     "Repayment simply cannot be predicted from financial data alone",
     "The model will underfit, because the label has only two values"
    ],
    "answer": 1,
    "why": "The label is usually the real crime scene. Point 3.5. Fairness question 2.",
    "points": [
     "3.5"
    ],
    "id": "w3q14",
    "n": 14
   },
   {
    "q": "Two applicants have nearly identical financial profiles but belong to different groups, and a parity adjustment approves one and rejects the other. Which kind of fairness is strained?",
    "options": [
     "Group fairness: the approval rates across the groups now differ",
     "Calibration: the scores no longer mean the same thing in each group",
     "Individual fairness: similar people, similar treatment",
     "Disparate impact: the four-fifths ratio has fallen below 0.80"
    ],
    "answer": 2,
    "why": "Enforcing group fairness can treat similar individuals differently. Point 3.8.",
    "points": [
     "3.8"
    ],
    "id": "w3q15",
    "n": 15
   },
   {
    "q": "A colleague says “the algorithm is biased”. What first response does Week 3 recommend?",
    "options": [
     "Retrain the model with a different algorithm straight away",
     "Delete the sensitive attribute from the model’s feature set",
     "Report the overall accuracy to show that the model is sound",
     "Ask them to point at the stage where the bias entered"
    ],
    "answer": 3,
    "why": "Map the whole pipeline before blaming the model. Point 3.6. Fairness question 1.",
    "points": [
     "3.6"
    ],
    "id": "w3q16",
    "n": 16
   },
   {
    "q": "Post-processing for parity leaves overall accuracy almost unchanged. What cost does Week 3 tell you to look for?",
    "options": [
     "Redistribution: Group A’s approvals fell from 58% to 45%",
     "None, since the overall accuracy of the model did not change",
     "A much longer training time, since the model must be refitted",
     "A lower AUC, since thresholds were moved for one group only"
    ],
    "answer": 0,
    "why": "Mitigation is redistribution; the cost is often not accuracy. Point 3.12. Fairness question 7.",
    "points": [
     "3.12"
    ],
    "id": "w3q17",
    "n": 17
   },
   {
    "q": "When is demographic parity the most defensible criterion?",
    "options": [
     "Always, because regulators prefer it to every other criterion",
     "When you have argued the label itself is corrupted by past injustice",
     "Only once calibration has already failed in both of the groups",
     "Whenever the model’s overall accuracy is higher than 80%"
    ],
    "answer": 1,
    "why": "Parity ignores who deserved the outcome; its use is an argument you must make. Point 3.9. Fairness question 2.",
    "points": [
     "3.9"
    ],
    "id": "w3q18",
    "n": 18
   },
   {
    "q": "A model is 95% accurate. Why might Week 3 still call it catastrophic?",
    "options": [
     "Because 95% is too low for any lending decision to be made on",
     "Because accuracy above 90% is usually a sign of leakage",
     "If its 5% of errors all fall on the very same group of people",
     "Because accuracy cannot be computed separately for each group"
    ],
    "answer": 2,
    "why": "Accuracy averages the harm away. Point 3.2.",
    "points": [
     "3.2"
    ],
    "id": "w3q19",
    "n": 19
   },
   {
    "q": "Which intervention applies different decision thresholds to different groups, and what must you be ready to do?",
    "options": [
     "Pre-processing; be ready to relabel the training data by group",
     "In-processing; be ready to retrain the model from scratch each time",
     "Unawareness; be ready to delete the sensitive column from the data",
     "Post-processing; be ready to say publicly the bar differs by group"
    ],
    "answer": 3,
    "why": "Post-processing is the easiest to bolt on and explicitly unequal treatment. Point 3.12.",
    "points": [
     "3.12"
    ],
    "id": "w3q20",
    "n": 20
   }
  ]
 },
 {
  "week": 4,
  "title": "AI Safety, Governance and Explainability",
  "remember": "The dangerous failure is silent: the model runs as specified, the dashboard stays green, and it harms someone anyway. Governance is whether an outsider could reconstruct who decided what and why. And an explanation makes a model interrogable, not trustworthy.",
  "points": [
   {
    "id": "4.1",
    "title": "A safety failure is not a crash",
    "body": "A bug makes the program stop: visible, local and contained, and your test suite is built to catch it. A safety failure is the program running perfectly, doing exactly what you specified, and harming someone anyway: a clean answer that is confidently wrong, for reasons your tests never sampled. “It passed all tests” is not a safety claim, because tests check the cases you thought of and safety is about the ones you did not."
   },
   {
    "id": "4.2",
    "title": "Specification and alignment",
    "body": "You never hand a model your intent; you hand it a proxy: a target column, a loss function, a dataset. Alignment is how faithfully that proxy tracks what you meant. Intent: approve applicants who will repay. Specification: maximise accuracy on “did the old system approve them, and did they repay”. The gap is everything the second quietly assumes about the first: that past decisions were fair, that everyone who could have repaid got the chance, that the past predicts the future. Every specification is a translation, so ask what got lost, and whether that loss can hurt a person."
   },
   {
    "id": "4.3",
    "title": "Specification gaming and reward hacking",
    "body": "Give a system a goal it can reach the cheap way and it will, not from malice but because you left the cheap way open. Specification gaming: satisfying the letter of the objective by an unintended route, like the boat-racing agent that circles a lagoon collecting points and never finishes. Told to predict repayment, the credit model learns to predict who was approved before, because that is what the label records. Reward hacking is the sharper cousin: a shortcut that scores well and means nothing (optimise clicks, get clickbait). The test: name the cheapest way to satisfy your objective that you would be embarrassed to defend out loud. That sentence is your reward- hacking risk."
   },
   {
    "id": "4.4",
    "title": "Distribution shift and silent failure",
    "body": "A model is a photograph of one moment deployed into a film that keeps rolling, so distribution shift is the default, not an edge case. Covariate shift: the inputs move (incomes fall, new people apply). Concept shift: the relationship moves (the same income now means a lower chance of repaying). Robustness is resistance to shift. The dangerous failure is silent: in the downturn example accuracy went from 0.70 to 0.71 and the approval rate stayed at 0.42, while the bad-loan rate among approved applicants jumped from 0.32 to 0.51, with no error raised. In the lab the approval rate froze at 0.928 while the bad-loan rate rose from 0.182 to 0.278; accuracy needs default labels that arrive months later, so it cannot warn you live. Watch leading indicators such as input drift, and design monitoring before deployment."
   },
   {
    "id": "4.5",
    "title": "Capability is not safety; name the mechanism",
    "body": "Capability is what a model can do (accuracy, benchmark score). Safety is what it can be trusted to do and not do (failure on the unseen, behaviour under stress). A more capable model deserves more scrutiny, because its rare confident mistakes become more expensive. Safety is decided across the lifecycle (design, data, training, evaluation, deployment, retirement), and each dial was set by a person; “the model did it” is never an answer. Name the mechanism: strong offline metrics but falling real-world results is silent failure under shift acing the objective through one convenient feature is specification gaming fine on tested inputs and bizarre just outside them is brittleness fair by the metric but harming one group is a proxy label doing unseen work."
   },
   {
    "id": "4.6",
    "title": "Governance is accountability you can audit",
    "body": "Governance answers one question: when this model harms someone, who is responsible, and how do they show they were careful? The test: could an outsider, handed your records, reconstruct who decided what and why? If not, you have documents, not governance. The audit trail: data provenance (where each row came from, by what right), model lineage (which data, code and version made this prediction) and decision logs (what the model output, and who acted on it). All three are written in advance or not at all. Governance is a design constraint, not a final gate: retrofitting provenance onto a shipped system costs about ten times as much and convinces nobody."
   },
   {
    "id": "4.7",
    "title": "GDPR: the individual’s leverage",
    "body": "GDPR is not an AI law, but it gives the person the model decides about enforceable rights. Article 22: a right not to be subject to a decision based solely on automated processing that has a legal or similarly significant effect. “Solely” carries the weight: a human meaningfully in the loop, one who can actually disagree, changes the analysis. Data minimisation: justify each item of personal data rather than hoarding features “just in case”. The right to explanation is legally contested, but the direction of travel is towards more, not less. A credit decision about a named person sits at the centre of Article 22, not its edge."
   },
   {
    "id": "4.8",
    "title": "The EU AI Act, NIST, and three philosophies",
    "body": "The EU AI Act sorts by harm, not technology, in four tiers: unacceptable (banned, such as government social scoring), high-risk (heavy obligations), limited (transparency duties, such as disclosing a bot) and minimal (left alone). Creditworthiness assessment is listed in Annex III, so it is high-risk: a to-do list carried before deploy- ment, covering risk management, data governance, technical documentation, record-keeping, human oversight, demonstrated accuracy and robustness, and transparency. The burden of proof flips: you must show it is fit before it runs. The NIST AI RMF is voluntary and US in origin: govern, map, measure, manage, run as a loop. GDPR empowers the data subject; the Act, the regulator and the public; NIST, the organisation. They can pull apart (collect less, yet document more). Satisfy the binding instruments and borrow structure from the voluntary one, without treating it as law."
   },
   {
    "id": "4.9",
    "title": "Model cards, datasheets and system cards",
    "body": "Model card (Mitchell et al., 2019): a short document that travels with the model: intended use, out-of-scope use, training and evaluation data, metrics disaggregated by group, ethical considerations and caveats. A single accuracy figure is a slogan; the honesty lives in the caveats. “None identified” is not a finding; it is a confession that nobody looked. Datasheet (Gebru et al.): why the data was collected and by whom, who is in it and who is missing, how and by whose judgement it was labelled, and which uses would be inappropriate. Most model failures are dataset failures in disguise. System card: the model does not deny a loan, a system does; the threshold is a policy choice, and a human may or may not be able to override it. The harm lives in the system, so the governance must too."
   },
   {
    "id": "4.10",
    "title": "Pick your question before your tool",
    "body": "“Why” hides two questions: global (how does the model behave across everyone?) and local (why this decision, for this person?). A global ranking cannot tell someone why they were refused, and a local story cannot tell you how the population is treated. Two kinds of answer: intrinsic (readable by construction, like a shallow tree or a small linear model) and post-hoc (fitted onto a black box afterwards). A post-hoc explanation is a model of a model: it can be wrong and rarely says so. Feature importance misleads quietly: impurity importance is biased towards features with many distinct values; permutation importance (shuffle a feature, measure the damage) splits credit unpredictably between correlated features. Read it as a hint, never as a ranking you would defend in a tribunal."
   },
   {
    "id": "4.11",
    "title": "LIME and SHAP",
    "body": "LIME explains one decision: perturb the inputs around one person, watch how the black box responds, and fit a simple linear model to that neighbourhood. It is model-agnostic, intuitive and per-decision, but the neighbourhood is a choice, so two analysts with different settings can get different, equally confident explanations of the same refusal. SHAP uses Shapley values from game theory: each feature is a player, and the prediction is split by average marginal contribution over all orderings. Its guarantees: contributions are additive (they sum exactly to the prediction) and consistent (a feature that never helps gets no credit). For a linear model each feature’s SHAP value is its weight times its centred value. The guarantees hold for the model, not the truth: SHAP shows how the model uses a feature, not whether it deserved to be used."
   },
   {
    "id": "4.12",
    "title": "A faithful explanation is not an exoneration",
    "body": "In the lecture’s model SHAP honestly says “income drove this denial”, but income was built partly from group membership, which was recoverable from the score 70% of the time: income is a proxy. The injustice lies in what a feature is, not how it is weighed. In the lab SHAP put the protected attribute SEX among the model’s three strongest drivers, in plain sight. Explanations mislead through instability (re-run LIME, get a different story), correlation (credit flips between correlated features), plausibility bias (neat feels true), the alibi (lending a bad decision the look of reason) and surrogate infidelity (always report fidelity; a 70% surrogate is a confident lie). An explanation makes a model interrogable, not trustworthy. Attack it before you quote it."
   }
  ],
  "checklistTitle": "The nine questions before you sign a model off",
  "checklist": [
   "What is the cheapest way to satisfy the objective that you would be embarrassed to defend out loud?",
   "Which shift would break it, and what would you watch live, before the labels arrive?",
   "Could an outsider, handed your records, reconstruct who decided what and why?",
   "Which EU AI Act tier is it in, and which obligations does that trigger before it runs?",
   "Is a human meaningfully in the loop, or is the decision solely automated?",
   "Which “why” is being asked, global or local, and does the explanation answer that one?",
   "Have you attacked the explanation (seed, neighbourhood, correlated features) before quoting it?",
   "Is the top feature a cause, or a proxy for something the model was never given?",
   "What would you refuse to deploy without?"
  ],
  "questions": [
   {
    "q": "A new model is far more accurate than the one it replaces. How much scrutiny does Week 4 say it deserves?",
    "options": [
     "Less, because higher accuracy is itself evidence of greater safety",
     "More, because its rare confident mistakes become more expensive",
     "The same, because capability and safety sit on the same axis",
     "None, provided it passes the old model’s full test suite"
    ],
    "answer": 1,
    "why": "Safety and capability are different axes. Point 4.5.",
    "points": [
     "4.5"
    ],
    "id": "w4q1",
    "n": 1
   },
   {
    "q": "What is the test for real governance?",
    "options": [
     "Has every section of the governance template been filled in?",
     "Has a lawyer signed off the model card before deployment?",
     "Is the model’s accuracy above the threshold that was agreed?",
     "Could an outsider reconstruct who decided what, and why?"
    ],
    "answer": 3,
    "why": "If not, you have documents, not governance. Point 4.6. Sign-off question 3.",
    "points": [
     "4.6"
    ],
    "id": "w4q2",
    "n": 2
   },
   {
    "q": "A bank adds a reviewer who sees each refusal for two seconds and has no power to change it. Does this take the decision outside “solely automated”?",
    "options": [
     "Yes: any human involvement at all takes it outside Article 22",
     "Yes, provided the reviewer signs off every case they are shown",
     "Unlikely: the human must be able to disagree for it to count",
     "No, because Article 22 bans every automated credit decision"
    ],
    "answer": 2,
    "why": "“Solely” is the load-bearing word. Point 4.7. Sign-off question 5.",
    "points": [
     "4.7"
    ],
    "id": "w4q3",
    "n": 3
   },
   {
    "q": "A model card says “Ethical considerations: none identified”. What does Week 4 say this line confesses?",
    "options": [
     "That it is fair",
     "That it is minimal-risk",
     "That nobody looked",
     "That the data is anonymised"
    ],
    "answer": 2,
    "why": "A card that admits its limits is worth more than one that performs completeness. Point 4.9.",
    "points": [
     "4.9"
    ],
    "id": "w4q4",
    "n": 4
   },
   {
    "q": "Two analysts run LIME on the same refused applicant with different neighbourhood settings and get different, equally confident explanations. What does this show?",
    "options": [
     "One of the two analysts must have made a coding error in the setup",
     "The neighbourhood is a choice, so attack the explanation before quoting it",
     "LIME is always wrong, so it should never be used on credit decisions",
     "The model itself must have changed between the first and second runs"
    ],
    "answer": 1,
    "why": "Instability: an explanation that shifts when the decision did not is not describing the decision. Points 4.11 and 4.12. Sign-off question 7.",
    "points": [
     "4.11",
     "4.12"
    ],
    "id": "w4q5",
    "n": 5
   },
   {
    "q": "During a downturn a credit model’s accuracy and approval rate barely move, but the bad-loan rate among approved applicants rises from 0.32 to 0.51. What is this?",
    "options": [
     "A loud failure, which the dashboard reported correctly at the time",
     "Proof that the model is robust, since its accuracy held steady",
     "Silent failure under shift: the dashboard holds while the book rots",
     "Specification gaming by the loan officers approving the loans"
    ],
    "answer": 2,
    "why": "No error, no alarm, a green dashboard. Points 4.4 and 4.5. Sign-off question 2.",
    "points": [
     "4.4",
     "4.5"
    ],
    "id": "w4q6",
    "n": 6
   },
   {
    "q": "A team plans to add data-provenance records after launch, once it has time. What does Week 4 say?",
    "options": [
     "It is written in advance or not at all; retrofitting convinces nobody",
     "That is the normal order: build the system first, then document it",
     "Provenance is only needed for systems in the minimal-risk tier",
     "It is fine, provided the model card was written before launch"
    ],
    "answer": 0,
    "why": "Governance is a design constraint, not a final gate. Point 4.6.",
    "points": [
     "4.6"
    ],
    "id": "w4q7",
    "n": 7
   },
   {
    "q": "A credit decision about a named person is made entirely by a model with no human review. Which right is squarely engaged?",
    "options": [
     "The EU AI Act’s transparency duty for chatbots and similar tools",
     "The measure function of the NIST AI Risk Management Framework",
     "None, because a credit decision is a purely commercial matter",
     "GDPR Article 22, on solely automated significant decisions"
    ],
    "answer": 3,
    "why": "A credit decision is the centre of Article 22, not its edge. Point 4.7. Sign-off question 5.",
    "points": [
     "4.7"
    ],
    "id": "w4q8",
    "n": 8
   },
   {
    "q": "A boat-racing agent rewarded for points circles a lagoon collecting them and never finishes the race. Which failure is this, and what is the credit-model equivalent?",
    "options": [
     "Specification gaming; it learns who was approved before",
     "Distribution shift; its inputs drift steadily away over time",
     "Overfitting; it memorises the particular rows it was trained on",
     "A bug; there is an error hidden somewhere in the model’s code"
    ],
    "answer": 0,
    "why": "The optimiser takes you literally. Point 4.3.",
    "points": [
     "4.3"
    ],
    "id": "w4q9",
    "n": 9
   },
   {
    "q": "A credit model runs without errors, passes every test, and approves people who then default. What kind of failure is this?",
    "options": [
     "A safety failure: it does what was specified and harms anyway",
     "A bug, because the outputs it produces for these people are wrong",
     "Not a failure, because no exception or error was ever raised",
     "A hardware fault in the servers that run the model each night"
    ],
    "answer": 0,
    "why": "Bugs crash; safety failures return a clean, wrong answer. Point 4.1.",
    "points": [
     "4.1"
    ],
    "id": "w4q10",
    "n": 10
   },
   {
    "q": "A recession makes every applicant riskier, so the same income now implies a lower chance of repaying. Which shift is this?",
    "options": [
     "Covariate shift: the distribution of the inputs themselves has moved",
     "Label noise: the outcomes recorded in the data are simply wrong",
     "Concept shift: the link between inputs and outcome has moved",
     "Data leakage: the test set has seeped back into the training set"
    ],
    "answer": 2,
    "why": "Covariate shift moves the inputs; concept shift moves the relationship. Point 4.4.",
    "points": [
     "4.4"
    ],
    "id": "w4q11",
    "n": 11
   },
   {
    "q": "Income and credit history are correlated. Permutation importance ranks income first on one run and credit history first on the next. Why?",
    "options": [
     "It splits credit unpredictably between correlated features",
     "The model is broken and has to be retrained from the start",
     "Permutation importance is random, so its output means nothing",
     "Credit history is the true cause, and income only a copy of it"
    ],
    "answer": 0,
    "why": "Never a ranking you would defend in a tribunal. Point 4.10.",
    "points": [
     "4.10"
    ],
    "id": "w4q12",
    "n": 12
   },
   {
    "q": "A governance note states “we comply with the NIST AI RMF” as though it were a legal obligation. What is wrong?",
    "options": [
     "NIST applies only to US agencies, so it cannot be cited at all",
     "NIST is voluntary: borrow its structure, but it is not law",
     "NIST replaces GDPR as the rulebook for AI systems in the EU",
     "Nothing, because NIST is binding in the EU for high-risk AI"
    ],
    "answer": 1,
    "why": "Three instruments, three philosophies. Point 4.8.",
    "points": [
     "4.8"
    ],
    "id": "w4q13",
    "n": 13
   },
   {
    "q": "SHAP shows a denial was driven mostly by income, and income in the data was built partly from group membership. What should you conclude?",
    "options": [
     "The decision is justified, since SHAP’s guarantees are mathematical",
     "SHAP is faithful to the model, but income may be a proxy for group",
     "SHAP must be wrong, because income alone cannot drive a denial",
     "SHAP should be swapped for the model’s overall accuracy instead"
    ],
    "answer": 1,
    "why": "An explanation is not an exoneration. Points 4.11 and 4.12. Sign-off question 8.",
    "points": [
     "4.11",
     "4.12"
    ],
    "id": "w4q14",
    "n": 14
   },
   {
    "q": "In which EU AI Act tier does creditworthiness assessment sit, and what follows?",
    "options": [
     "Limited risk: the only duty is to disclose that AI is used",
     "Minimal risk: credit scoring is left alone by the Act entirely",
     "High-risk (Annex III): heavy obligations before it runs",
     "Unacceptable: scoring credit with AI is banned outright in the EU"
    ],
    "answer": 2,
    "why": "High-risk is a to-do list carried before deployment, and the burden of proof flips. Point 4.8. Sign-off question 4.",
    "points": [
     "4.8"
    ],
    "id": "w4q15",
    "n": 15
   },
   {
    "q": "Why is accuracy a poor live monitor for a deployed credit model?",
    "options": [
     "Accuracy is far too expensive to compute continuously in real time",
     "Accuracy always stays constant once a model has been deployed",
     "Regulators forbid lenders from monitoring accuracy after launch",
     "Its labels arrive months later, so watch input drift instead"
    ],
    "answer": 3,
    "why": "Monitoring must be designed before deployment, around what you can see live. Point 4.4. Sign-off question 2.",
    "points": [
     "4.4"
    ],
    "id": "w4q16",
    "n": 16
   },
   {
    "q": "A well-documented credit model still harms people, because its approval threshold and the lack of any override were never governed. What was missing?",
    "options": [
     "A system card: the harm lives in the system, not only the model",
     "A longer model card that covers every feature in more detail",
     "A higher accuracy target for the model to meet before launch",
     "A larger training set, so the threshold could be learned instead"
    ],
    "answer": 0,
    "why": "The model does not deny a loan; a system does. Point 4.9. Sign-off question 9.",
    "points": [
     "4.9"
    ],
    "id": "w4q17",
    "n": 17
   },
   {
    "q": "A refused applicant asks why they were refused. Which kind of explanation answers them?",
    "options": [
     "A global feature-importance ranking across all applicants",
     "The model’s overall accuracy on the held-out test set",
     "The training-loss curve showing how the model was fitted",
     "A local explanation of their decision, such as LIME"
    ],
    "answer": 3,
    "why": "Pick the question before the tool. Point 4.10. Sign-off question 6.",
    "points": [
     "4.10"
    ],
    "id": "w4q18",
    "n": 18
   },
   {
    "q": "Which question does Week 4 give as a written-down test of reward-hacking risk?",
    "options": [
     "What accuracy does the model reach on the untouched test set?",
     "What is the cheapest route to the goal you’d be embarrassed to defend?",
     "How many parameters does the model have, compared with the data?",
     "Which features have the highest permutation importance in the model?"
    ],
    "answer": 1,
    "why": "That sentence is your reward-hacking risk, written down. Point 4.3. Sign-off question 1.",
    "points": [
     "4.3"
    ],
    "id": "w4q19",
    "n": 19
   },
   {
    "q": "What organises the EU AI Act’s four tiers?",
    "options": [
     "The number of parameters in the model, above a fixed threshold",
     "Whether the system uses neural networks or classical methods",
     "The member state in which the system’s provider is registered",
     "How much harm a system can do, not whether it counts as AI"
    ],
    "answer": 3,
    "why": "A spam filter and a credit scorer are both AI; only one can end a tenancy application. Point 4.8.",
    "points": [
     "4.8"
    ],
    "id": "w4q20",
    "n": 20
   }
  ]
 },
 {
  "week": 5,
  "title": "Unsupervised Learning and the Idea of a Representation",
  "remember": "A representation is a learned description of your data, and it is never neutral. Clustering proposes structure rather than discovering it, so every K is a decision you defend; and a label-free PCA axis rebuilt the deleted group 71% of the time, which no silhouette would ever have flagged.",
  "points": [
   {
    "id": "5.1",
    "title": "No labels means no answer key",
    "body": "Supervised learning hands you inputs with correct answers and asks you to reproduce them on new data; success has a definition and a test set to measure it. Unsupervised learning hands you inputs only and asks you to find structure: groups, directions, a lower-dimensional shape. The label did a lot of quiet work: it gave you accuracy, a stopping rule, a way to compare models and a way to spot overfitting. Remove it and all of that leaves with it. There is no answer key, so nothing can mark your output right or wrong."
   },
   {
    "id": "5.2",
    "title": "Clustering proposes structure; it does not discover it",
    "body": "Unlearn the phrase “it found the groups that are really there”. A clustering algorithm imposes a structure you chose (so many groups, of an assumed shape) and reports how well the data tolerated it. The output is a hypothesis you proposed, and the burden is on you to argue it is useful. Supervised learning asks “can I reproduce the known answer?”; unsupervised learning asks “ is this structure worth believing?”, which no single number can settle. Running K-means is one line; deciding whether its output means anything is the actual skill."
   },
   {
    "id": "5.3",
    "title": "K-means, and what it really minimises",
    "body": "You fix K in advance. Then Lloyd’s algorithm repeats two steps until nothing moves: assign each point to its nearest centre (the centroid) by straight-line distance, then update each centroid to the mean of its points. The starting centres are random, so results can vary; scikit-learn’s n_init runs it several times and keeps the best. The loop is descending the within-cluster inertia: the total squared Euclidean distance from every point to its own centroid. Smaller means tighter clusters."
   },
   {
    "id": "5.4",
    "title": "Standardise first, or distance lies",
    "body": "Inertia is a sum of squared feature differences, so a feature on a large scale dominates it whether or not it matters. Income runs in tens of thousands while the debt ratio sits between 0 and 1: unscaled, the clustering becomes a sort on income alone. Standardise every feature (subtract the mean, divide by the standard deviation) so each gets a comparable vote. It is not cosmetic: it silently decides which features influence the result. When a clustering looks like a sort on one column, suspect the scaling before you believe the finding."
   },
   {
    "id": "5.5",
    "title": "The assumption is the model",
    "body": "Every call to K-means asserts three things. Round, equal clusters: it expects spherical groups of similar spread, and long, thin or unequal ones confuse it. Hard membership: every point belongs fully to exactly one cluster, with no borderline cases. Scale sensitivity: “near” means Euclidean distance, so scaling is part of the model. When the claim is wrong, K-means does not warn you; it returns a clean, confident partition that misreads the shape. And every clustering method returns an answer on any data at all: hand K-means uniform noise, ask for three clusters, and you get three, tidy and confident."
   },
   {
    "id": "5.6",
    "title": "Choosing K: the elbow, the silhouette, and your defence",
    "body": "There is no true K waiting in the data; K is an argument you make. The elbow: inertia always falls as K grows, so seek the bend, not the minimum. On the credit data it runs 13,530 at K = 2, 10,630 at K = 3, 8,638 at K = 4 and about 6,000 at K = 8: a soft bend near three, no clean corner, which is normal for real data. The silhouette, s = (b − a) ÷ max(a, b), compares a point’s distance to its own cluster (a) with the nearest other (b), from −1 to +1: near +1 well placed, near 0 on the border, below 0 probably misassigned. It peaks at K = 2 (0.348), then 0.311 and 0.265. The tools disagree because the elbow rewards tightness and the silhouette rewards separation. And 0.35 is weak: real but soft structure. Print both, choose, and defend the choice in a sentence the per-point knife plot shows the fence-sitters the mean hides."
   },
   {
    "id": "5.7",
    "title": "Hierarchical clustering and Gaussian mixtures",
    "body": "Hierarchical (agglomerative) clustering starts with every point alone and repeatedly merges the two closest clusters, recording a tree, the dendrogram. The height of each join is how reluctant the merge was. You cut the tree to get clusters, so K is still your decision, made visible. Two knobs reshape it: the distance between points and the linkage between clusters (Ward merges the pair that adds least inertia). A Gaussian mixture model (GMM) blends K Gaussian bells, each with its own centre, tilted elliptical shape and weight, and gives soft membership: an applicant can be 78% one cluster and 22% another. K-means is the special case with equal spheres and 0-or-1 membership. The near-50/50 cases are exactly the ones a human should review, and a GMM’s likelihood lets you compare K with the BIC."
   },
   {
    "id": "5.8",
    "title": "What cluster validity can and cannot tell you",
    "body": "Internal measures (silhouette, inertia) judge the geometry alone: tight and separated? They need no ground truth, and they are blind to whether the clusters mean anything. External measures compare clusters with known labels; they speak to meaning, but need labels you usually do not have. The trap: a high silhouette certifies a tidy partition, not a useful or fair one, and not one that is free of scaling artefacts. So the last word in unsupervised learning is never a metric; it is a human reading the clusters against the domain."
   },
   {
    "id": "5.9",
    "title": "High dimensions, and PCA",
    "body": "The curse of dimensionality: as features multiply, points spread until nearly everything is equally far from everything else, “nearest” loses its force, and every distance-based method weakens. PCA (principal component analysis) discards the spreadsheet’s axes and finds the direction of greatest variance (PC1), then the next at right angles (PC2), and so on. Mathematically the components are the eigenvectors of the covariance matrix, and each eigenvalue is the variance along its component. The explained variance ratio is each component’s share: on the credit data PC1 holds 66.2% and PC2 19.7%, 85.9% together, so dropping to two axes costs about 14%. The assumption you accept: variance is where the signal lives. Often true, not always: a rare, low-variance direction may be exactly the fraud you were hired to find, and PCA drops it first."
   },
   {
    "id": "5.10",
    "title": "Name the axes: loadings",
    "body": "Each component is a weighted blend of the original features, and the weights are its loadings a biplot draws them as arrows. On the credit data PC1’s loadings are income +0.549, credit history +0.547, debt ratio −0.533 and prior defaults −0.339: high income and long history at one end, high debt and past defaults at the other. That is not “PC1”; it is a financial-health axis the data drew for itself. Translating loadings into a sentence a domain expert would accept is the skill being assessed. Leave the axes unnamed and you have decorated, not interpreted."
   },
   {
    "id": "5.11",
    "title": "PCA is your first learned representation, and its straight-axis limit",
    "body": "PCA returned a new coordinate system fitted to the data. The applicant did not change; their description did, from four measured quantities to two coordinates on axes no human chose. That learned description is a representation, and everything downstream (clustering, plots, the next model) now runs on it, so it quietly shapes all of them. Ask by reflex: “what representation is this running on, and what did its builder bake in?” But PCA is linear. Two interleaved arcs are obviously separable by eye, yet projected onto PC1 they land on top of each other: the variance was real, it just was not the signal. When PCA fails, it fails quietly, which is why nonlinear methods and learned embeddings exist."
   },
   {
    "id": "5.12",
    "title": "Embeddings: geometry as meaning",
    "body": "Drop PCA’s demands that the axes be straight, few and nameable, and what remains is an embedding: a learned map placing each item (an applicant, a word, an image) as a point where position carries meaning. Distance becomes similarity: nearest-neighbour search, recommendation and retrieval all run on it. Direction becomes relationship: in a good word embedding, king − man + woman lands near queen, learned rather than programmed. The representation is the product: modern systems spend most effort learning it, and its quality caps everything above. Trade-offs: PCA is fast and interpretable but misses curves; t-SNE and UMAP show neighbourhoods beautifully, but the gaps between clusters can be meaningless learned embeddings are expressive but opaque and hard to audit."
   },
   {
    "id": "5.13",
    "title": "Representations encode bias",
    "body": "Colour the same PCA map by the group column deleted before any algorithm ran, and the groups separate, mostly along PC1. Measured: PC1 alone recovers the group 71.1% of the time against a 42.6% base rate, almost exactly the 70% the supervised score leaked in Weeks 3 and 4. Removing the column removed the word, not the information. (The hard two-way K-means split matches the group only weakly, with an adjusted Rand index of 0.156: the clusters are not the group; the continuous axis carries it.) Why: an unequal world, so correlated features, so the largest axis of variance runs along the inequality, and PCA hunts exactly that. No malice, no bug. A representation is never neutral, and the silhouette, which sees shape not justice, could never have flagged it. “We removed that field” describes your schema, not your geometry."
   }
  ],
  "checklistTitle": "The nine questions before you believe a cluster or an axis",
  "checklist": [
   "Did I standardise first, and would a different scaling change the answer?",
   "Which K did I choose, and can I defend it when the elbow and the silhouette disagree?",
   "What shape does my method assume: round balls, a cut tree, or tilted ellipses?",
   "Would this method have handed me the same tidy answer on pure noise?",
   "What does each cluster mean in the domain, and which ones are shaky?",
   "What is each axis made of? Can I name PC1 from its loadings?",
   "Is the structure I care about linear, or would a straight axis flatten it?",
   "Can a simple probe recover a sensitive attribute from my representation, against what base rate?",
   "Which structure would I refuse to act on, and why?"
  ],
  "questions": [
   {
    "q": "A clustering scores a high silhouette. What has that certified?",
    "options": [
     "That the partition is tidy and separated, not that it means anything",
     "That the clusters match real groups that exist in the problem domain",
     "That the clustering is free of bias against any protected group",
     "That the chosen K is the true number of clusters in the data"
    ],
    "answer": 0,
    "why": "Internal measures see shape, not meaning and not justice. Points 5.8 and 5.13.",
    "points": [
     "5.8",
     "5.13"
    ],
    "id": "w5q1",
    "n": 1
   },
   {
    "q": "Which quantity does K-means actually minimise?",
    "options": [
     "The number of points that sit on the border between two clusters",
     "The total squared distance from each point to its own centroid",
     "The mean silhouette score taken over every point in the dataset",
     "The distance between the two centroids that are farthest apart"
    ],
    "answer": 1,
    "why": "Within-cluster inertia; the elbow plots it against K. Point 5.3.",
    "points": [
     "5.3"
    ],
    "id": "w5q2",
    "n": 2
   },
   {
    "q": "The group column was deleted before any algorithm ran, yet PC1 alone recovers group 71.1% of the time against a 42.6% base rate. What does this show?",
    "options": [
     "PCA must have used the group column somewhere during fitting",
     "Nothing: 71.1% is close enough to chance to count as no leakage",
     "Removing the column removed the word, but not the information",
     "The K-means clusters and the groups must be exactly the same"
    ],
    "answer": 2,
    "why": "Proxy leakage in geometric form, at the rate the supervised score leaked. Point 5.13. Structure question 8.",
    "points": [
     "5.13"
    ],
    "id": "w5q3",
    "n": 3
   },
   {
    "q": "Two long, tilted, overlapping clusters are handed to K-means. What happens?",
    "options": [
     "It raises an error, because it only accepts round clusters as input",
     "It draws a straight boundary and quietly mislabels the overlap",
     "It detects the tilt itself and returns a soft probability per point",
     "It merges the two into a single cluster because they overlap"
    ],
    "answer": 1,
    "why": "The assumption is the model: K-means expects equal round balls. Points 5.5 and 5.7. Structure question 3.",
    "points": [
     "5.5",
     "5.7"
    ],
    "id": "w5q4",
    "n": 4
   },
   {
    "q": "Why can’t you report the accuracy of a clustering the way you report a classifier’s?",
    "options": [
     "Clustering always scores 100%, because every point gets some cluster",
     "Accuracy is only defined once the features have been standardised",
     "There is no label, so nothing can mark a cluster assignment right",
     "It can be reported, but only once there are over 1,000 data points"
    ],
    "answer": 2,
    "why": "The label gave you accuracy, a stopping rule and a test set; without it, none of that exists. Point 5.1.",
    "points": [
     "5.1"
    ],
    "id": "w5q5",
    "n": 5
   },
   {
    "q": "Why does PCA end up laying the protected group out along PC1?",
    "options": [
     "PCA is quietly given the group column as a weight while it fits",
     "The groups differ along the biggest axis of variance, which PCA seeks",
     "PC1 is defined as the direction that separates any two groups",
     "Standardisation encodes each applicant’s group into their scaled values"
    ],
    "answer": 1,
    "why": "Unequal world, correlated features, variance aligned with the inequality. Point 5.13.",
    "points": [
     "5.13"
    ],
    "id": "w5q6",
    "n": 6
   },
   {
    "q": "Inertia falls from 13,530 at K = 2 to about 6,000 at K = 8. Why not simply choose K = 8?",
    "options": [
     "You should, because lower inertia always means better clusters",
     "Eight clusters is too many for any dataset with only four features",
     "Inertia always falls as K grows; you seek a bend, not a minimum",
     "Inertia starts rising after K = 8, so the minimum lies beyond it"
    ],
    "answer": 2,
    "why": "More centres always fit tighter; K equal to the number of points drives inertia to zero. Point 5.6.",
    "points": [
     "5.6"
    ],
    "id": "w5q7",
    "n": 7
   },
   {
    "q": "In a good word embedding, “king” − “man” + “woman” lands near “queen”. What does that show?",
    "options": [
     "Linguists placed every word by hand so that the analogies work",
     "A consistent direction in the space encodes a learned relationship",
     "Distance in the space measures how alphabetically close words are",
     "Embeddings only work for words, never for applicants or images"
    ],
    "answer": 1,
    "why": "Direction as relationship, learned rather than programmed. Point 5.12.",
    "points": [
     "5.12"
    ],
    "id": "w5q8",
    "n": 8
   },
   {
    "q": "PC1’s loadings are income +0.55, credit history +0.55, debt ratio −0.53 and prior defaults −0.34. How should you describe PC1?",
    "options": [
     "An income axis, because income has the single largest loading",
     "A noise axis, because its loadings come with a mixture of signs",
     "A financial-health axis: income and history one way, debt the other",
     "A debt axis, because the negative loadings dominate its direction"
    ],
    "answer": 2,
    "why": "Leave the axes unnamed and you have decorated, not interpreted. Point 5.10. Structure question 6.",
    "points": [
     "5.10"
    ],
    "id": "w5q9",
    "n": 9
   },
   {
    "q": "A colleague writes: “K-means found the three customer groups that are really there.” What is wrong with this?",
    "options": [
     "Nothing, provided the mean silhouette of the result is above zero",
     "K-means can only find two groups at a time, never three at once",
     "Only the largest of the three groups can be said to be really there",
     "K-means imposed three groups; the result is a hypothesis to defend"
    ],
    "answer": 3,
    "why": "Clustering proposes structure; it does not discover it. Point 5.2. Structure question 5.",
    "points": [
     "5.2"
    ],
    "id": "w5q10",
    "n": 10
   },
   {
    "q": "The elbow hints at three clusters; the silhouette peaks at two, at 0.35. What should you do?",
    "options": [
     "Always take the silhouette’s answer, since it is the newer measure",
     "Always take the elbow’s answer, since it uses every point’s distance",
     "Show both, choose a K and defend it, saying the structure is weak",
     "Split the difference and run K-means with the average of the two"
    ],
    "answer": 2,
    "why": "The reasoning is the deliverable; the loop is plumbing. Point 5.6. Structure question 2.",
    "points": [
     "5.6"
    ],
    "id": "w5q11",
    "n": 11
   },
   {
    "q": "Clustering income (tens of thousands) with debt ratio (0 to 1), unscaled, gives clusters that look like a sort on income. Why?",
    "options": [
     "K-means always sorts on whichever column comes first in the data",
     "Debt ratio is a proportion, so the distance formula ignores it",
     "Income has more distinct values, so it is given more centroids",
     "Squared distances are dominated by income’s scale, so it decides"
    ],
    "answer": 3,
    "why": "Scaling silently decides which features get a vote. Point 5.4. Structure question 1.",
    "points": [
     "5.4"
    ],
    "id": "w5q12",
    "n": 12
   },
   {
    "q": "A Gaussian mixture says one applicant is 52% one cluster and 48% another. Why is that useful?",
    "options": [
     "It flags a borderline case for a human, which a hard label would hide",
     "It shows the model has failed to converge and should be rerun",
     "It shows the two clusters overlap entirely, so they should be merged",
     "It is an error, since every point must belong to exactly one cluster"
    ],
    "answer": 0,
    "why": "Soft membership is information: the near-50/50 cases are the ones to review. Point 5.7.",
    "points": [
     "5.7"
    ],
    "id": "w5q13",
    "n": 13
   },
   {
    "q": "What does a mean silhouette of 0.35 say about a clustering?",
    "options": [
     "The clusters are crisp, since any silhouette above zero is strong",
     "Nothing, because silhouettes only apply to hierarchical clustering",
     "The clusters are fair to every group, since the geometry is tidy",
     "The structure is real but soft, with many points close to a border"
    ],
    "answer": 3,
    "why": "Notice the height as well as the peak, and look at the per-point knife plot. Point 5.6.",
    "points": [
     "5.6"
    ],
    "id": "w5q14",
    "n": 14
   },
   {
    "q": "K-means is run on uniform random noise with K = 3. What comes back?",
    "options": [
     "An error, because the algorithm detects that there are no clusters",
     "Three tidy clusters, because it cannot tell no structure exists",
     "A single cluster, since pure noise has no structure to split up",
     "Three clusters, each flagged with a warning about low confidence"
    ],
    "answer": 1,
    "why": "Every clustering method returns an answer on any data, including data with no clusters. Point 5.5. Structure question 4.",
    "points": [
     "5.5"
    ],
    "id": "w5q15",
    "n": 15
   },
   {
    "q": "What does hierarchical clustering give you instead of asking for K up front?",
    "options": [
     "A dendrogram, and the choice of where to cut it is still yours",
     "The single true number of clusters, read off the tallest join",
     "A probability for each point belonging to each of the clusters",
     "A ranking of the features by how much each one shapes the tree"
    ],
    "answer": 0,
    "why": "It builds the whole hierarchy and hands you the scissors. Point 5.7.",
    "points": [
     "5.7"
    ],
    "id": "w5q16",
    "n": 16
   },
   {
    "q": "Why might PCA throw away exactly the thing a fraud team was hired to find?",
    "options": [
     "It keeps high-variance directions, and rare fraud may vary little",
     "It deletes any row that looks like an outlier before it rotates",
     "It only works on labelled data, and fraud labels are always rare",
     "It sorts the features alphabetically and keeps only the first few"
    ],
    "answer": 0,
    "why": "Keeping the top components assumes variance is where the signal lives. Point 5.9.",
    "points": [
     "5.9"
    ],
    "id": "w5q17",
    "n": 17
   },
   {
    "q": "A t-SNE plot shows two clusters far apart. What can you safely say about how far apart they really are?",
    "options": [
     "They are far apart in the original data, in proportion to the gap",
     "They are unrelated, since t-SNE preserves every global distance",
     "They must be different classes, since t-SNE is trained on labels",
     "Very little: t-SNE keeps neighbourhoods and can stretch the gaps"
    ],
    "answer": 3,
    "why": "Critique the method before you narrate its picture. Point 5.12.",
    "points": [
     "5.12"
    ],
    "id": "w5q18",
    "n": 18
   },
   {
    "q": "PC1 carries 66.2% of the variance and PC2 19.7%. What does keeping only those two cost?",
    "options": [
     "About 14% of the variance, and any signal living in what was dropped",
     "Nothing, because PC3 and PC4 contain only noise by definition",
     "About 66% of the variance, since PC1 is the only axis that counts",
     "The ability to standardise the data before any later modelling"
    ],
    "answer": 0,
    "why": "Two axes hold 85.9%; the rest is discarded along with anything in it. Point 5.9.",
    "points": [
     "5.9"
    ],
    "id": "w5q19",
    "n": 19
   },
   {
    "q": "Two interleaved crescent-shaped classes, projected onto PC1, land on top of each other. Why?",
    "options": [
     "PCA was run without standardising, which always merges classes",
     "PC1 always mixes the classes; PC2 is where they separate again",
     "The data needs more principal components than it has features",
     "Its axes are straight, and this structure curves, so PC1 misses it"
    ],
    "answer": 3,
    "why": "The variance was real; it simply was not the signal. Point 5.11. Structure question 7.",
    "points": [
     "5.11"
    ],
    "id": "w5q20",
    "n": 20
   }
  ]
 }
];
