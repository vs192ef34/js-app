import { state } from "../state/state.js";

const eventProcessor = {
  root: null,

  renderFunction: () => {},

  handlersMap: {},

  handleEvent(event) {
    if (Object.hasOwn(this.handlersMap, event.type)) {
      const handlers = this.handlersMap[event.type];
      handlers.forEach((handler) => handler(state, event));

      state.updateAnswersVisibility();

      this.renderFunction(this.root, state);
    }
  },
};

export { eventProcessor };
