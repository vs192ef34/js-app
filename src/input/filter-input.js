function getFilterValues(event) {
  const validIds = ["non-valid", "valid-correct", "valid-incorrect"];

  return validIds.some((id) => id === event.target.id)
    ? {
        name: event.target.id,
        value: event.target.checked,
      }
    : null;
}

export { getFilterValues };
