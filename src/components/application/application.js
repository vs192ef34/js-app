import { createInputForm } from "../input-form/input-form.js";
import { createAnswerListFilter } from "../answer-list-filter/answer-list-filter.js";
import { createAnswerList } from "../answer-list/answer-list.js";

function createApplicationDiv(data) {
  const fragment = new DocumentFragment();

  fragment.append(createInputForm("new-triangle", data.input));

  if (data.hasAnswers()) {
    fragment.append(createAnswerListFilter(data.answersFilter));
  }

  fragment.append(createAnswerList("answer-list", data.answers));

  return fragment;
}

export { createApplicationDiv };
