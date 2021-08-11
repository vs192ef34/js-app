import { createApplicationDiv } from "./components/application/application.js";

import { eventProcessor } from "./processors/event-processor.js";

const defaultSides = [
  { sideName: "a", sideLength: 3 },
  { sideName: "b", sideLength: 4 },
  { sideName: "c", sideLength: 5 },
];

function setupEventListeners(root) {
  const checkButton = root.querySelector("#check-button");
  checkButton.addEventListener("click", eventProcessor);
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

    render(appDiv, {
      input: defaultSides,
      answers: [],
    });
  } else {
    console.log("App div not found");
  }
}

export { main };
