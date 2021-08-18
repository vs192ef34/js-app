import { getTriangleSides } from "../input/triangle-input.js";

function checkTriangleHandler(state, event) {
  if (event.target.id !== "check-button") return;

  const sides = getTriangleSides(event);

  state.processAndAddTriangle(sides);
}

export { checkTriangleHandler };
