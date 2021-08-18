function editResultHandler(state, event) {
  if (
    event.target.type === "button" &&
    event.target.className === "edit-button"
  ) {
    const answerId = parseInt(event.target.dataset.answerId);
    console.log(`Edit for result ${answerId}`);
  }
}

export { editResultHandler };
