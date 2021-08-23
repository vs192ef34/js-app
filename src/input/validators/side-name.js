function validateSideName(name) {
  const messages = [];

  let isValid = true;

  if (name.length < 1 || name.length > 3) {
    isValid = false;
    messages.push("Name length should be in [1; 3]");
  } else {
    const startFromLetter = /^[a-zA-Z].{0,2}$/g;

    if (!startFromLetter.test(name)) {
      isValid = false;
      messages.push("Name should start from letter.");
    }

    const correctFormat = /^[a-zA-Z]\w{0,2}$/gm;

    if (!correctFormat.test(name)) {
      isValid = false;
      messages.push("Name can include only letters and digits.");
    }
  }

  return {
    isValid,
    messages,
  };
}

export { validateSideName };
