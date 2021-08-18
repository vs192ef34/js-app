function createEditButton(id) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = "Edit";
  button.className = "edit-button";
  button.dataset.answerId = id;

  return button;
}

function createDeleteButton(id) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = "Delete";
  button.className = "delete-button";
  button.dataset.answerId = id;

  return button;
}

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

function createNonvalidResultDiv(id, messages, helpText) {
  const answerDiv = document.createElement("div");
  answerDiv.classList.add("tooltip-box");
  answerDiv.classList.add("error-box");

  answerDiv.append(createErrorBlock(messages, helpText));

  answerDiv.append(createDeleteButton(id));
  answerDiv.append(createEditButton(id));

  return answerDiv;
}

function createValidResultDiv(id, isTriangle, answerPhrase) {
  const answerDiv = document.createElement("div");
  answerDiv.classList.add("tooltip-box");

  const boxClassName = isTriangle ? "info-box" : "warning-box";
  answerDiv.classList.add(boxClassName);

  answerDiv.append(createAnswerPhrase(answerPhrase));

  answerDiv.append(createDeleteButton(id));
  answerDiv.append(createEditButton(id));

  return answerDiv;
}

function createAnswerDivs(data) {
  const fragment = new DocumentFragment();

  const visibleData = data.filter((result) => result.isVisible);

  visibleData.forEach((result) => {
    fragment.append(
      result.validationResult.isValid
        ? createValidResultDiv(
            result.id,
            result.isTriangle,
            result.answerPhrase
          )
        : createNonvalidResultDiv(
            result.id,
            result.validationResult.errorMessages,
            result.helpText
          )
    );
  });

  return fragment;
}

function createAnswerList(id, data) {
  const answerListDiv = document.createElement("div");
  answerListDiv.id = id;

  answerListDiv.append(createAnswerDivs(data));

  return answerListDiv;
}

export { createAnswerList };
