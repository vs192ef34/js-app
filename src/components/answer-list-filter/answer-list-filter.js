function createCheckbox(idName, text, isChecked) {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.id = idName;
  checkBox.name = idName;
  checkBox.checked = isChecked;

  const label = document.createElement("label");
  label.htmlFor = idName;
  label.innerHTML = text;

  const fragment = new DocumentFragment();
  fragment.append(checkBox);
  fragment.append(label);

  return fragment;
}

function createAnswerListFilter(data) {
  const filterDiv = document.createElement("div");

  const checkboxes = [
    createCheckbox("non-valid", "Non valid", data.nonValid),
    createCheckbox("valid-correct", "Triangles", data.validCorrect),
    createCheckbox("valid-incorrect", "Not triangles", data.validIncorrect),
  ];

  checkboxes.forEach((ch) => filterDiv.append(ch));

  return filterDiv;
}

export { createAnswerListFilter };
