function resetEditMode(state, event) {
  if (event.target.id !== "reset-button") return;

  state.resetEditMode();
}

export { resetEditMode };
