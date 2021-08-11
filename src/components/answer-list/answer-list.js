function createErrorList(messages) {
  const errorListElement = document.createElement("ul");

  messages.forEach((message) => {
    const messageItem = document.createElement("li");
    messageItem.innerHTML = message;

    errorListElement.append(messageItem);
  });

  return errorListElement;
}

function createHelpText(helpText) {
  const helpTextElement = document.createElement("p");
  helpTextElement.innerHTML = helpText;

  return helpTextElement;
}

function createErrorBlock(messages, helpText) {
  const fragment = new DocumentFragment();

  fragment.append(createErrorList(messages));
  fragment.append(createHelpText(helpText));

  return fragment;
}

function createAnswerPhrase(answerPhrase) {
  const answerElement = document.createElement("p");
  answerElement.innerHTML = answerPhrase;

  return answerElement;
}

function createNonvalidResultDiv(messages, helpText) {
  const answerDiv = document.createElement("div");
  answerDiv.classList.add("tooltip-box");
  answerDiv.classList.add("error-box");

  answerDiv.append(createErrorBlock(messages, helpText));

  return answerDiv;
}

function createValidResultDiv(isTriangle, answerPhrase) {
  const answerDiv = document.createElement("div");
  answerDiv.classList.add("tooltip-box");

  const boxClassName = isTriangle ? "info-box" : "warning-box";
  answerDiv.classList.add(boxClassName);

  answerDiv.append(createAnswerPhrase(answerPhrase));

  return answerDiv;
}

function createAnswerDivs(root, data) {
  const fragment = new DocumentFragment();

  data.forEach((result) => {
    fragment.append(
      result.validationResult.isValid
        ? createValidResultDiv(result.isTriangle, result.answerPhrase)
        : createNonvalidResultDiv(
            root,
            result.validationResult.errorMessages,
            result.helpText
          )
    );
  });

  return fragment;
}

function createCheckbox(idName, text) {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.id = idName;
  checkBox.name = idName;

  const label = document.createElement("label");
  label.htmlFor = idName;
  label.innerHTML = text;

  const fragment = new DocumentFragment();
  fragment.append(checkBox);
  fragment.append(label);

  return fragment;
}

function createFilterBlock() {
  const filterDiv = document.createElement("div");

  const checkboxes = [
    createCheckbox("non-valid", "Non valid"),
    createCheckbox("valid-correct", "Triangles"),
    createCheckbox("valid-incorrect", "Not triangles"),
  ];

  checkboxes.forEach((ch) => filterDiv.append(ch));

  return filterDiv;
}

function createAnswerList(id, data) {
  const answerListDiv = document.createElement("div");
  answerListDiv.id = id;

  if (data.length !== 0) {
    answerListDiv.append(createFilterBlock());
  }

  answerListDiv.append(createAnswerDivs(answerListDiv, data));

  return answerListDiv;
}

export { createAnswerList };
