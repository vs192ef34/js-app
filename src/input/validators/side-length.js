function validateSideLength(value) {
  const length = parseInt(value);

  if (isNaN(length)) {
    return {
      isValid: false,
      messages: ["Triangle side should be a number"],
    };
  }

  if (value != length) {
    return {
      isValid: false,
      messages: ["Triangle side should be a number"],
    };
  }

  return {
    isValid: true,
    messages: [],
  };
}

export { validateSideLength };
