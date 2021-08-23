function createEditButton(id, isEditMode) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = "Edit";
  button.className = "edit-button";
  button.dataset.answerId = id;

  if (isEditMode) {
    button.setAttribute("disabled", "");
  }

  return button;
}

function createDeleteButton(id, isEditMode) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = "Delete";
  button.className = "delete-button";
  button.dataset.answerId = id;

  if (isEditMode) {
    button.setAttribute("disabled", "");
  }

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

function createNonvalidResultDiv(id, messages, helpText, isEditMode) {
  const answerDiv = document.createElement("div");
  answerDiv.classList.add("tooltip-box");
  answerDiv.classList.add("error-box");

  answerDiv.append(createErrorBlock(messages, helpText));

  answerDiv.append(createDeleteButton(id, isEditMode));
  answerDiv.append(createEditButton(id, isEditMode));

  return answerDiv;
}

function createValidResultDiv(id, isTriangle, answerPhrase, isEditMode) {
  const answerDiv = document.createElement("div");
  answerDiv.classList.add("tooltip-box");

  const boxClassName = isTriangle ? "info-box" : "warning-box";
  answerDiv.classList.add(boxClassName);

  answerDiv.append(createAnswerPhrase(answerPhrase));

  answerDiv.append(createDeleteButton(id, isEditMode));
  answerDiv.append(createEditButton(id, isEditMode));

  return answerDiv;
}

function createAnswerDivs(data, isEditMode) {
  const fragment = new DocumentFragment();

  const visibleData = data.filter((result) => result.isVisible);

  visibleData.forEach((result) => {
    fragment.append(
      result.validationResult.isValid
        ? createValidResultDiv(
            result.id,
            result.isTriangle,
            result.answerPhrase,
            isEditMode
          )
        : createNonvalidResultDiv(
            result.id,
            result.validationResult.errorMessages,
            result.helpText,
            isEditMode
          )
    );
  });

  return fragment;
}

function createAnswerList(id, state) {
  const answerListDiv = document.createElement("div");
  answerListDiv.id = id;

  answerListDiv.append(createAnswerDivs(state.answers, state.isInEditMode()));

  return answerListDiv;
}

export { createAnswerList };
