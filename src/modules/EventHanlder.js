export class EventHandler {
  constructor(formFieldsState) {
    this.formFieldsState = formFieldsState;
  }

  submitHandler(e) {
    e.preventDefault();
    this.formFieldsState.updateFormStatus();

    if (!this.formFieldsState.formStatus) {
      this.formFieldsState.fields.forEach((field) => {
        const { errorSpan, name } = field;
        errorSpan.textContent = this.formFieldsState.getErrorMsg(name);
      });
    }
  }

  inputHandler(fieldName) {
    const validator = this.formFieldsState.validators[fieldName];
    const field = this.formFieldsState[fieldName];
    const input = field.inputElement;
    input.nextElementSibling.textContent = "";
    if (validator()) {
      field.setStatus(input.dataset.id, true);
    }
  }

  focusoutHandler(fieldName) {
    const { errorSpan } = this.formFieldsState[fieldName];
    const validator = this.formFieldsState.validators[fieldName];
    if (validator()) {
      errorSpan.textContent = "";
    } else {
      errorSpan.textContent = this.formFieldsState.getErrorMsg(fieldName);
      this.formFieldsState.updateFieldStatus(fieldName);
    }
  }
}
