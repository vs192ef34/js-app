import { range } from "../state/triangles/util.js";

function getTriangleSide(form, sideNumber) {
  const fieldSet = form[`side${sideNumber}`];

  return {
    sideName: fieldSet.elements[`side${sideNumber}name`].value,
    sideLength: fieldSet.elements[`side${sideNumber}value`].value,
  };
}

function getTriangleSides(event) {
  const sides = range(1, 3).map((sideNumber) =>
    getTriangleSide(document.forms["new-triangle"], sideNumber)
  );

  return sides;
}

export { getTriangleSides };
