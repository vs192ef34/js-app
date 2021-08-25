import { getTriangleSides } from "../input/triangle-input.js";

import { validateSideName } from "../input/validators/side-name.js";
import { validateSideLength } from "../input/validators/side-length.js";

function checkTriangleHandler(state, event) {
  if (event.target.id !== "check-button") return;

  const sides = getTriangleSides(event);

  state.input = sides;

  state.nameValidationResults = sides.map((side) => {
    return validateSideName(side.sideName);
  });

  state.lengthValidationResults = sides.map((side) => {
    return validateSideLength(side.sideLength);
  });

  const nameFormatIsValid = !state.nameValidationResults.some(
    (result) => result.isValid === false
  );

  const lengthFormatIsValid = !state.lengthValidationResults.some(
    (result) => result.isValid === false
  );

  if (!nameFormatIsValid || !lengthFormatIsValid) {
    return null;
  }

  const convertedSides = sides.map((side) => ({
    sideName: side.sideName,
    sideLength: parseInt(side.sideLength),
  }));

  if (state.isInEditMode()) {
    if (state.processAndUpdateTriangle(convertedSides)) {
      state.resetEditMode();
    }
  } else {
    state.processAndAddTriangle(convertedSides);
  }
}

export { checkTriangleHandler };
