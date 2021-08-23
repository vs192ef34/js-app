import { createApplicationDiv } from "./components/application/application.js";

import { checkTriangleHandler } from "./handlers/check-triangle-handler.js";
import { handleCheckboxes } from "./handlers/handle-checkboxes.js";
import { deleteResultHandler } from "./handlers/delete-result-handler.js";
import { editResultHandler } from "./handlers/edit-result-handler.js";
import { resetEditMode } from "./handlers/reset-edit-mode.js";

import { eventProcessor } from "./processors/event-processor.js";

const initialData = {
  isEditMode: false,
  input: [
    { sideName: "a", sideLength: 3 },
    { sideName: "b", sideLength: 4 },
    { sideName: "c", sideLength: 5 },
  ],
  nameValidationResults: [],
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
  isInEditMode() {
    return this.isEditMode;
  },
};

const defaultEventHandlers = {
  click: [
    checkTriangleHandler,
    deleteResultHandler,
    editResultHandler,
    resetEditMode,
  ],
  change: [handleCheckboxes],
};

function setupEventListeners(root) {
  const fieldset = root.querySelector("#form-controls");
  fieldset.addEventListener("click", eventProcessor);

  const answerDiv = root.querySelector("#answer-list");
  answerDiv.addEventListener("click", eventProcessor);

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
    eventProcessor.handlersMap = defaultEventHandlers;

    render(appDiv, initialData);
  } else {
    console.log("App div not found");
  }
}

export { main };
