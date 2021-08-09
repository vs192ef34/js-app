import { range } from "../triangles/util.js";
import { isTriangle } from "../triangles/geometry.js";
import { getHelpText, validateTriangle } from "../triangles/validation.js";
import { getAnswerPhrase } from "../triangles/output.js";

const eventProcessor = {
  root: null,

  lowerBound: 0,
  upperBound: 1000,

  renderFunction: () => {},

  processTriangleData(sides, lowerBound, upperBound) {
    const validationResult = validateTriangle(sides, lowerBound, upperBound);

    return {
      sides,
      validationResult,
      isTriangle: validationResult.isValid ? isTriangle(sides) : false,
      helpText: getHelpText(this.lowerBound, this.upperBound),
      answerPhrase: getAnswerPhrase(
        sides,
        validationResult.isValid ? isTriangle(sides) : false
      ),
    };
  },

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
      this.getTriangleSide(document.forms["new-triangle"], sideNumber)
    );

    const data = this.processTriangleData(
      sides,
      this.lowerBound,
      this.upperBound
    );

    this.renderFunction(this.root, data);
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

export { eventProcessor };
