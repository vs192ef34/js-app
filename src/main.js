import { getApplicationDiv } from "./lib.js";

import { createInputForm } from "./components/input-form/input-form.js";

import { eventProcessor } from "./processors/event-processor.js";

const defaultSides = [
  { sideName: "a", sideLength: 3000 },
  { sideName: "b", sideLength: 4000 },
  { sideName: "c", sideLength: 5000 },
];

function renderErrorList(messages) {
  const errorListElement = document.createElement("ul");

  messages.forEach((message) => {
    const messageItem = document.createElement("li");
    messageItem.innerHTML = message;

    errorListElement.append(messageItem);
  });

  return errorListElement;
}

function renderHelpText(helpText) {
  const helpTextElement = document.createElement("p");
  helpTextElement.innerHTML = helpText;

  return helpTextElement;
}

function renderErrorScreen(messages, helpText) {
  const fragment = new DocumentFragment();

  fragment.append(renderErrorList(messages));
  fragment.append(renderHelpText(helpText));

  return fragment;
}

function renderAnswerScreen(answerPhrase) {
  const answerElement = document.createElement("p");
  answerElement.innerHTML = answerPhrase;

  return answerElement;
}

function renderNonvalidResult(messages, helpText) {
  const answerList = document.body.querySelector("#answer-list");

  const answerDiv = document.createElement("div");
  answerDiv.classList.add("tooltip-box");
  answerDiv.classList.add("error-box");

  answerDiv.append(renderErrorScreen(messages, helpText));

  answerList.append(answerDiv);
}

function renderValidResult(sides, isTriangle, answerPhrase) {
  const answerList = document.body.querySelector("#answer-list");

  const answerDiv = document.createElement("div");
  answerDiv.classList.add("tooltip-box");

  const boxClassName = isTriangle ? "info-box" : "warning-box";
  answerDiv.classList.add(boxClassName);

  answerDiv.append(renderAnswerScreen(answerPhrase));

  answerList.append(answerDiv);
}

function createAnswerList(id) {
  const answerDiv = document.createElement("div");
  answerDiv.id = id;

  return answerDiv;
}

function renderAnswer(root, data) {
  data.validationResult.isValid
    ? renderValidResult(data.sides, data.isTriangle, data.answerPhrase)
    : renderNonvalidResult(data.validationResult.errorMessages, data.helpText);
}

function render(root) {
  root.innerHTML = "";

  const form = createInputForm("new-triangle");

  const checkButton = form.querySelector("#check-button");
  checkButton.addEventListener("click", eventProcessor);

  const answerList = createAnswerList("answer-list");

  root.append(form);
  root.append(answerList);
}

// TODO: query elements only inside app div
function main() {
  const appDiv = getApplicationDiv("#app");

  if (appDiv !== null) {
    eventProcessor.root = appDiv;
    eventProcessor.renderFunction = renderAnswer;

    render(appDiv);
  } else {
    console.log("App div not found");
  }
}

export { main };
