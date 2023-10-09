import $ from "jquery";
import { StateJSHelpers } from "./state-js-helpers";

export class StateJS {
  constructor({ value, bindingInput }) {
    this.helpers = new StateJSHelpers();
    this.value = value;
    this.updatedCallback = null;
    this.bindingInput = bindingInput;
    this.onBindingInput(bindingInput);
  }

  onBindingInput(input) {
    if (input) {
      $("#" + input).on("change", (e) => {
        this.set(e.target.value);
      });
    }
  }

  onChange(callback) {
    if (this.updatedCallback === null) this.updatedCallback = callback;
    else throw new Error("This hook is defined before");
  }

  get() {
    return this.value;
  }

  set(param) {
    let newState = param;
    if (typeof param === "function") newState = param(this.value);
    if (!this.helpers.isObjDeepEqual(this.value, newState)) {
      this.value = newState;
      if (this.bindingInput) $(`#${this.bindingInput}`).val(this.value);
      if (this.updatedCallback) this.updatedCallback(this.value);
    }
  }
}
