function deleteResultHandler(state, event) {
  if (
    event.target.type === "button" &&
    event.target.className === "delete-button"
  ) {
    const answerId = parseInt(event.target.dataset.answerId);
    state.answers = state.answers.filter((answer) => answer.id !== answerId);
  }
}

export { deleteResultHandler };
