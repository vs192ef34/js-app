import { isTriangle } from "./triangles/geometry.js";
import { getHelpText, validateTriangle } from "./triangles/validation.js";
import { getAnswerPhrase } from "./triangles/output.js";

let counter = 1;

const state = {
  lowerBound: 0,
  upperBound: 1000,

  input: [],

  answersFilter: {
    nonValid: true,
    validCorrect: true,
    validIncorrect: true,
  },

  answers: [],

  processTriangleData(sides) {
    const validationResult = validateTriangle(
      sides,
      this.lowerBound,
      this.upperBound
    );

    return {
      id: counter++,
      position: 0,
      sides,
      validationResult,
      isTriangle: validationResult.isValid ? isTriangle(sides) : false,
      helpText: getHelpText(this.lowerBound, this.upperBound),
      answerPhrase: getAnswerPhrase(
        sides,
        validationResult.isValid ? isTriangle(sides) : false
      ),
      isVisible: true,
    };
  },

  updateAnswersVisibility() {
    this.answers.forEach((answer) => {
      const triangleAttr = [
        !answer.validationResult.isValid,
        answer.validationResult.isValid && answer.isTriangle,
        answer.validationResult.isValid && !answer.isTriangle,
      ];

      const filterAttr = [
        this.answersFilter.nonValid,
        this.answersFilter.validCorrect,
        this.answersFilter.validIncorrect,
      ];

      const pairs = [
        triangleAttr[0] && filterAttr[0],
        triangleAttr[1] && filterAttr[1],
        triangleAttr[2] && filterAttr[2],
      ];

      answer.isVisible = pairs.some((flag) => flag === true);
    });
  },

  processAndAddTriangle(sides) {
    const triangleData = this.processTriangleData(sides);

    this.input = sides;
    this.answers = [triangleData, ...this.answers];

    let position = 1;
    this.answers.forEach((answer) => (answer.position = position++));
  },

  hasAnswers() {
    return this.answers.length > 0;
  },
};

export { state };
