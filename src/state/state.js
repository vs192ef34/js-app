import { isTriangle } from "./triangles/geometry.js";
import { getHelpText, validateTriangle } from "./triangles/validation.js";
import { getAnswerPhrase } from "./triangles/output.js";

import { validateSideName } from "../input/validators/side-name.js";

let counter = 1;

const state = {
  lowerBound: 0,
  upperBound: 1000,

  isEditMode: false,
  editedAnswerId: 0,

  input: [],

  nameValidationResults: [],

  answersFilter: {
    nonValid: true,
    validCorrect: true,
    validIncorrect: true,
  },

  answers: [],

  processTriangleData(sides) {
    this.nameValidationResults = sides.map((side) => {
      return validateSideName(side.sideName);
    });

    const nameIsValid = !this.nameValidationResults.some(
      (result) => result.isValid === false
    );

    if (!nameIsValid) {
      return null;
    }

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

    if (triangleData === null) return;

    this.answers = [triangleData, ...this.answers];

    let position = 1;
    this.answers.forEach((answer) => (answer.position = position++));
  },

  processAndUpdateTriangle(sides) {
    const oldAnswerId = this.editedAnswerId;
    const triangleData = this.processTriangleData(sides);

    this.input = sides;

    if (triangleData === null) return;

    const oldAnswerIndex = this.answers.findIndex(
      (answer) => answer.id === oldAnswerId
    );

    this.answers[oldAnswerIndex] = triangleData;

    let position = 1;
    this.answers.forEach((answer) => (answer.position = position++));
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
