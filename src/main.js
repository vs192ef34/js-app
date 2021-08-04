import { getApplicationDiv } from "./lib.js";

import { getHelpText, validateTriangle } from "./triangles/validation.js";
import { isTriangle } from "./triangles/geometry.js";
import { getAnswerPhrase } from "./triangles/output.js";

import { range } from "./triangles/util.js";

const defaultSides = [
  { sideName: "a", sideLength: 3000 },
  { sideName: "b", sideLength: 4000 },
  { sideName: "c", sideLength: 5000 },
];

const lowerBound = 0;
const upperBound = 1000;

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

function renderNonvalidResult(messages) {
  const answerList = document.body.querySelector("#answer-list");

  const answerDiv = document.createElement("div");
  answerDiv.classList.add("tooltip-box");
  answerDiv.classList.add("error-box");

  answerDiv.append(
    renderErrorScreen(messages, getHelpText(lowerBound, upperBound))
  );

  answerList.append(answerDiv);
}

function renderValidResult(sides, isTriangle) {
  const answerList = document.body.querySelector("#answer-list");

  const answerDiv = document.createElement("div");
  answerDiv.classList.add("tooltip-box");

  const boxClassName = isTriangle ? "info-box" : "warning-box";
  answerDiv.classList.add(boxClassName);

  answerDiv.append(renderAnswerScreen(getAnswerPhrase(sides, isTriangle)));

  answerList.append(answerDiv);
}

const eventProcessor = {
  getTriangleSide(form, sideNumber) {
    const fieldSet = form[`side${sideNumber}`];

    return {
      sideName: fieldSet.elements[`side${sideNumber}name`].value,
      sideLength: parseInt(fieldSet.elements[`side${sideNumber}value`].value),
    };
  },

  checkTriangleHandler(event) {
    const low = 1;
    const high = 3;

    const sides = range(low, high).map((sideNumber) =>
      this.getTriangleSide(document.forms.newTriangle, sideNumber)
    );

    const validationResult = validateTriangle(sides, lowerBound, upperBound);

    validationResult.isValid
      ? renderValidResult(sides, isTriangle(sides))
      : renderNonvalidResult(validationResult.errorMessages);
  },

  handleEvent(event) {
    switch (event.type) {
      case "click":
        this.checkTriangleHandler(event);
        break;

      default:
        break;
    }
  },
};

// TODO: query elements only inside app div
function main() {
  const appDiv = getApplicationDiv("#app");

  if (appDiv !== null) {
    const checkButton = document.body.querySelector("#check-button");
    checkButton.addEventListener("click", eventProcessor);
  } else {
    console.log("App div not found");
  }
}

export { main };
