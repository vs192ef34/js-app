function createForm(idName) {
  const form = document.createElement("form");
  form.name = idName;
  form.id = idName;

  return form;
}

function createFieldset(name) {
  const fieldset = document.createElement("fieldset");
  fieldset.name = name;

  return fieldset;
}

function createLabel(forName, innerText, className = "") {
  const labelElement = document.createElement("label");
  labelElement.htmlFor = forName;
  labelElement.innerHTML = innerText;
  labelElement.className = className;

  return labelElement;
}

function createTextInput(name, id, className = "") {
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.name = name;
  textInput.id = id;
  textInput.className = className;

  return textInput;
}

function createButton(id, title) {
  const controlInput = document.createElement("input");
  controlInput.id = id;
  controlInput.type = "button";
  controlInput.value = title;

  return controlInput;
}

function createResetButton(title) {
  const controlInput = document.createElement("input");
  controlInput.type = "reset";
  controlInput.value = title;

  return controlInput;
}

function createInput(idName, labelText) {
  const fragment = new DocumentFragment();

  const inputLabel = createLabel(idName, labelText);
  fragment.append(inputLabel);

  const valueInput = createTextInput(idName, idName);
  fragment.append(valueInput);

  return fragment;
}

function createInputFieldset(prefix, nameLabel, valueLabel) {
  const fieldset = createFieldset(prefix);

  const nameInput = createInput(`${prefix}name`, nameLabel);
  fieldset.append(nameInput);

  const valueInput = createInput(`${prefix}value`, valueLabel);
  fieldset.append(valueInput);

  return fieldset;
}

function createControlFieldset(prefix) {
  const fieldset = createFieldset(prefix);

  const checkButton = createButton("check-button", "Проверить");
  fieldset.append(checkButton);

  const resetButton = createResetButton("Сбросить");
  fieldset.append(resetButton);

  return fieldset;
}

function createInputForm(idName) {
  const nameLabel = "Имя стороны:";
  const valueLabel = "Длина стороны:";

  const form = createForm(idName);

  const fieldsets = ["side1", "side2", "side3"].map((prefix) =>
    createInputFieldset(prefix, nameLabel, valueLabel)
  );

  fieldsets.push(createControlFieldset("controls"));

  fieldsets.forEach((fieldset) => form.append(fieldset));

  return form;
}

export { createInputForm };