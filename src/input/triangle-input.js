import { range } from "../state/triangles/util.js";

function getTriangleSide(form, sideNumber) {
  const fieldSet = form[`side${sideNumber}`];

  return {
    sideName: fieldSet.elements[`side${sideNumber}name`].value,
    sideLength: parseInt(fieldSet.elements[`side${sideNumber}value`].value),
  };
}

function getTriangleSides(event) {
  const low = 1;
  const high = 3;

  return range(low, high).map((sideNumber) =>
    getTriangleSide(document.forms["new-triangle"], sideNumber)
  );
}

export { getTriangleSides };
