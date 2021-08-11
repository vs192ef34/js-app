import { createInputForm } from "../input-form/input-form.js";
import { createAnswerList } from "../answer-list/answer-list.js";

function createApplicationDiv(data) {
  const fragment = new DocumentFragment();

  fragment.append(createInputForm("new-triangle", data.input));
  fragment.append(createAnswerList("answer-list", data.answers));

  return fragment;
}

export { createApplicationDiv };
