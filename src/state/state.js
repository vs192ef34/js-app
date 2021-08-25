import { isTriangle } from "./triangles/geometry.js";
import {
  getHelpText,
  validateSide,
  validateTriangle,
} from "./triangles/validation.js";
import { getAnswerPhrase } from "./triangles/output.js";

let counter = 1;

const state = {
  lowerBound: 0,
  upperBound: 1000,

  isEditMode: false,
  editedAnswerId: 0,

  input: [],

  nameValidationResults: [],
  lengthValidationResults: [],

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

    const businessValidationResults = sides.map((side) => {
      const result = validateSide(side, this.lowerBound, this.upperBound);
      return {
        isValid: result.isValid,
        messages: [result.errorMessage],
      };
    });

    const isValid = !businessValidationResults.some(
      (sideResult) => sideResult.isValid === false
    );

    [0, 1, 2].forEach((idx) => {
      this.lengthValidationResults[idx].isValid =
        this.lengthValidationResults[idx].isValid &&
        businessValidationResults[idx].isValid;

      this.lengthValidationResults[idx].messages = [
        ...this.lengthValidationResults[idx].messages,
        ...businessValidationResults[idx].messages,
      ];
    });

    return isValid
      ? {
          id: counter++,
          position: 0,
          sides,
          validationResult,
          isTriangle: isTriangle(sides),
          helpText: getHelpText(this.lowerBound, this.upperBound),
          answerPhrase: getAnswerPhrase(sides, isTriangle(sides)),
          isVisible: true,
        }
      : null;
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

    if (triangleData === null) return;

    this.answers = [triangleData, ...this.answers];

    let position = 1;
    this.answers.forEach((answer) => (answer.position = position++));
  },

  processAndUpdateTriangle(sides) {
    const oldAnswerId = this.editedAnswerId;
    const triangleData = this.processTriangleData(sides);

    if (triangleData === null) return false;

    const oldAnswerIndex = this.answers.findIndex(
      (answer) => answer.id === oldAnswerId
    );

    this.answers[oldAnswerIndex] = triangleData;

    let position = 1;
    this.answers.forEach((answer) => (answer.position = position++));

    return true;
  },

  hasAnswers() {
    return this.answers.length > 0;
  },

  setEditMode(answerId) {
    this.isEditMode = true;
    this.editedAnswerId = answerId;
  },

  resetEditMode() {
    this.isEditMode = false;
    this.editedAnswerId = 0;
  },

  isInEditMode() {
    return this.isEditMode;
  },
};

export { state };
