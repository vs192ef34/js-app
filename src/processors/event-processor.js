import { getTriangleSides } from "../input/triangle-input.js";

import { state } from "../state/state.js";

const eventProcessor = {
  root: null,

  renderFunction: () => {},

  checkTriangleHandler(event) {
    const sides = getTriangleSides();

    state.processAndAddTriangle(sides);
  },

  handleCheckboxes(event) {
    switch (event.target.id) {
      case "non-valid":
        state.answersFilter.nonValid = event.target.checked;
        break;
      case "valid-correct":
        state.answersFilter.validCorrect = event.target.checked;
        break;
      case "valid-incorrect":
        state.answersFilter.validIncorrect = event.target.checked;
        break;
      default:
        break;
    }
  },

  handleEvent(event) {
    switch (event.type) {
      case "click":
        this.checkTriangleHandler(event);
        break;

      case "change":
        this.handleCheckboxes(event);
        break;

      default:
        break;
    }

    state.updateAnswersVisibility();
    this.renderFunction(this.root, state);
  },
};

export { eventProcessor };
