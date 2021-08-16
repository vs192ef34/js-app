import { createApplicationDiv } from "./components/application/application.js";

import { eventProcessor } from "./processors/event-processor.js";

const initialData = {
  input: [
    { sideName: "a", sideLength: 3 },
    { sideName: "b", sideLength: 4 },
    { sideName: "c", sideLength: 5 },
  ],
  answersFilter: {
    nonValid: true,
    validCorrect: true,
    validIncorrect: true,
  },
  answers: [],

  // TODO: remove this workaround
  hasAnswers() {
    return this.answers.length > 0;
  },
};

function setupEventListeners(root) {
  const checkButton = root.querySelector("#check-button");
  checkButton.addEventListener("click", eventProcessor);

  const nonValidCheckbox = root.querySelector("#non-valid");
  const validCorrectCheckbox = root.querySelector("#valid-correct");
  const validIncorrectCheckbox = root.querySelector("#valid-incorrect");

  nonValidCheckbox?.addEventListener("change", eventProcessor);
  validCorrectCheckbox?.addEventListener("change", eventProcessor);
  validIncorrectCheckbox?.addEventListener("change", eventProcessor);
}

function render(root, data) {
  root.innerHTML = "";

  const app = createApplicationDiv(data);

  setupEventListeners(app);

  root.append(app);
}

function main() {
  const appDiv = document.body.querySelector("#app");

  if (appDiv !== null) {
    eventProcessor.root = appDiv;
    eventProcessor.renderFunction = render;

    render(appDiv, initialData);
  } else {
    console.log("App div not found");
  }
}

export { main };
