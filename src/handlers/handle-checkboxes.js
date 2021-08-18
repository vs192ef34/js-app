import { getFilterValues } from "../input/filter-input.js";

function handleCheckboxes(state, event) {
  const filter = getFilterValues(event);

  if (filter !== null) {
    switch (filter.name) {
      case "non-valid":
        state.answersFilter.nonValid = filter.value;
        break;
      case "valid-correct":
        state.answersFilter.validCorrect = filter.value;
        break;
      case "valid-incorrect":
        state.answersFilter.validIncorrect = filter.value;
        break;
      default:
        break;
    }
  }
}

export { handleCheckboxes };
