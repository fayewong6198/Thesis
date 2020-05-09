const Question = require("./models/Question");
const fs = require("fs");
const N = 500;
const TIME = 500;
const MAX_SIZE = TIME * 20;
const QUESTION_PER_TEST = TIME / 20;
const CHAPTER_INCLUDE = [1];
const DIFFICULTY = 3.4;
const TIME_WEIGHT = 0.5;
const DIFFICULTY_WEIGHT = 0.5;
const THRESS_HOLD = 0.9;

let rawdata = fs.readFileSync("./data/myjsonfile.json");
let questions = JSON.parse(rawdata);

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export const average = array => {
  let result = 0;
  for (let i = 0; i < array.length; i++) result += array[i].difficulty;
  return result / array.length;
};

export const abs = number => {
  return number > 0 ? number : -number;
};

export const total = array => {
  let result = 0;
  for (let i = 0; i < array.length; i++) result += array[i].time;
  return result;
};

export const error = quiz => {
  return (
    (TIME_WEIGHT * abs(total(quiz) - TIME)) / TIME +
    (DIFFICULTY_WEIGHT * abs(average(quiz) - DIFFICULTY)) / DIFFICULTY
  );
};

export const fitnessFunction = e => {
  return (2 / (1 + e) - 1) * (2 / (1 + e) - 1) * (2 / (1 + e) - 1);
};

// Select Chapters
let selectedQuestions = questions.filter(question =>
  CHAPTER_INCLUDE.includes(question.chapter)
);

if (DIFFICULTY >= 3.5) {
  selectedQuestions = selectedQuestions.filter(
    question => question.difficulty >= 3
  );
}
if (DIFFICULTY >= 4) {
  selectedQuestions = selectedQuestions.filter(
    question => question.difficulty == "4"
  );
}

// Create Population
let population = [];
let test = [];
for (let i = 0; i < MAX_SIZE; i++) {
  if ((i + 1) % QUESTION_PER_TEST != 0) {
    test.push(selectedQuestions[i % selectedQuestions.length]);
  } else {
    population.push(test);
    test = [];
  }
}
population.pop();

// Error function
let maxFitness = 0;
let maxFitnessIndex = 0;
population.forEach(pop => {
  const fitness = fitnessFunction(error(pop));
  maxFitness = fitness > maxFitness ? fitness : maxFitness;
});
console.log(maxFitness);

while (maxFitness < THRESS_HOLD) {
  for (let i = 0; i < population.length; i++) {
    // First Parent
    let a = Math.floor(Math.random() * population.length);
    let r = Math.random() * maxFitness;
    while (r > fitnessFunction(error(population[a]))) {
      a = Math.floor(Math.random() * population.length);
      r = Math.random() * maxFitness;
    }

    // Second Parent
    let b = Math.floor(Math.random() * population.length);
    r = Math.random() * maxFitness;
    while (r > fitnessFunction(error(population[b]))) {
      b = Math.floor(Math.random() * population.length);
      r = Math.random() * maxFitness;
    }

    const ids = new Set(population[a].map(data => data.id));
    let merged = [
      ...population[a],
      ...population[b].filter(d => !ids.has(d.id))
    ];
    shuffleArray(merged);
    let time_test = 0;
    a = [];
    b = 0;

    while (time_test < TIME && b < merged.length) {
      a.push(merged[b]);

      time_test += merged[b].time;
      b++;
    }
    if (
      time_test - a[a.length - 1].time >
      a[a.length - 1].time - a[a.length - 2].time
    ) {
      a.pop();
    }
    population[i] = a;
    // Mutation Operator
    r = Math.random();
    if (r < 0.01) {
      let j = Math.floor(Math.random() * selectedQuestions.length);
      let k = Math.floor(Math.random() * population[i].length);
      population[i][k] = selectedQuestions[j];
    }
  }
  let averageFitness = 0;
  for (let i = 0; i < population.length; i++) {
    const fitness = fitnessFunction(error(population[i]));
    if (fitness > maxFitness) {
      maxFitness = fitness;
      maxFitnessIndex = i;
    }
    averageFitness += fitness;
  }

  console.log(averageFitness / population.length + " " + maxFitness);
}
console.log(average(population[maxFitnessIndex]));
console.log(total(population[maxFitnessIndex]));
console.log(population[maxFitnessIndex].length);
// console.log(selectedQuestions.filter(s => s.difficulty == "4").length);
// console.log(selectedQuestions.filter(s => s.difficulty == "3").length);
population[maxFitnessIndex].map(p => console.log(p.difficulty));
