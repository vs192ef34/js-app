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

function createTextInput(name, id, value, className = "") {
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.name = name;
  textInput.id = id;
  textInput.value = value;
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

function createInput(idName, labelText, value) {
  const fragment = new DocumentFragment();

  const inputLabel = createLabel(idName, labelText);
  fragment.append(inputLabel);

  const valueInput = createTextInput(idName, idName, value);
  fragment.append(valueInput);

  return fragment;
}

function createInputFieldset(
  prefix,
  side,
  nameLabel,
  valueLabel,
  nameValidationResult,
  lengthValidationResult
) {
  const fieldset = createFieldset(prefix);

  const nameInput = createInput(`${prefix}name`, nameLabel, side?.sideName);
  fieldset.append(nameInput);

  const valueInput = createInput(
    `${prefix}value`,
    valueLabel,
    side?.sideLength
  );
  fieldset.append(valueInput);

  if (!nameValidationResult?.isValid) {
    const errorDiv = document.createElement("div");
    errorDiv.innerHTML = nameValidationResult?.messages.join(";");

    fieldset.append(errorDiv);
  }

  if (!lengthValidationResult?.isValid) {
    const errorDiv = document.createElement("div");
    errorDiv.innerHTML = lengthValidationResult?.messages.join(";");

    fieldset.append(errorDiv);
  }

  return fieldset;
}

function createControlFieldset(prefix, isEditMode) {
  const fieldset = createFieldset(prefix);

  fieldset.id = "form-controls";

  const checkButton = createButton("check-button", "Проверить");
  fieldset.append(checkButton);

  if (isEditMode) {
    const resetButton = createButton("reset-button", "Отмена");
    fieldset.append(resetButton);
  }

  const resetButton = createResetButton("Сбросить");
  fieldset.append(resetButton);

  return fieldset;
}

function createInputForm(idName, sides, isEditMode, state) {
  const nameLabel = "Имя стороны:";
  const valueLabel = "Длина стороны:";

  const form = createForm(idName);

  const fieldsets = [1, 2, 3].map((prefix) =>
    createInputFieldset(
      `side${prefix}`,
      sides[prefix - 1],
      nameLabel,
      valueLabel,
      state.nameValidationResults[prefix - 1],
      state.lengthValidationResults[prefix - 1]
    )
  );

  fieldsets.push(createControlFieldset("controls", isEditMode));

  fieldsets.forEach((fieldset) => form.append(fieldset));

  return form;
}

export { createInputForm };
