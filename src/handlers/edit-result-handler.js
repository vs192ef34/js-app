function editResultHandler(state, event) {
  if (
    !(
      event.target.type === "button" && event.target.className === "edit-button"
    )
  ) {
    return;
  }

  const answerId = parseInt(event.target.dataset.answerId);

  const answer = state.answers.find((answer) => answer.id === answerId);

  if (!answer) return;

  state.input = answer.sides;

  state.setEditMode(answerId);
}

export { editResultHandler };
