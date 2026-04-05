export class EventHandler {
  constructor(formFieldsState) {
    this.formFieldsState = formFieldsState;
  }

  submitHandler(e) {
    e.preventDefault();
    this.formFieldsState.updateFormStatus();

    const { error, success, initial } = this.formFieldsState.formStatus;

    if (this.formFieldsState.hasErrors) {
      this.formFieldsState.fields.forEach((field) => {
        if (field.hasErrors) {
          const { errorSpan, name } = field;
          errorSpan.textContent = this.formFieldsState.getErrorMsg(name);
          errorSpan.classList.add("active");
        }
      });
      this.formFieldsState.setCurrentStatus(error);
      this.formFieldsState.formStatusElem.classList.add("form-error"); 
    } else {
      this.formFieldsState.setCurrentStatus(success);
      e.target.reset();
      setTimeout(() => {
        this.formFieldsState.setCurrentStatus(initial);
      }, 4000);
    }
  }

  inputHandler(fieldName) {
    const validator = this.formFieldsState.validators[fieldName];
    const field = this.formFieldsState[fieldName];
    const { name, errorSpan } = field;
    errorSpan.textContent = "";
    errorSpan.classList.remove("active");
    if (validator()) {
      field.setStatus(name, true);
      this.formFieldsState.formStatusElem.classList.remove("form-error");
      this.formFieldsState.formStatusElem.classList.remove("warning");
      this.formFieldsState.formStatusElem.textContent =
        "status: awaiting input...";
    } else {
      this.formFieldsState.setCurrentStatus(field.errors.statusMessage);
      this.formFieldsState.formStatusElem.classList.add("warning");
    }
  }

  focusoutHandler(fieldName) {
    const { errorSpan } = this.formFieldsState[fieldName];
    const validator = this.formFieldsState.validators[fieldName];
    if (validator()) {
      errorSpan.textContent = "";
      errorSpan.classList.remove("active");
    } else {
      errorSpan.textContent = this.formFieldsState.getErrorMsg(fieldName);
      errorSpan.classList.add("active");
      this.formFieldsState.updateFieldStatus(fieldName);
    }
  }

  clickHandler(fieldName) {
    const validator = this.formFieldsState.validators[fieldName];
    const { errorSpan, errors } = this.formFieldsState[fieldName];
    errorSpan.classList.remove("active");

    if (!validator()) {
      this.formFieldsState.formStatusElem.classList.remove("form-error");
      this.formFieldsState.formStatusElem.classList.add("warning");
      this.formFieldsState.formStatusElem.textContent =
        errors.statusMessage;
    }
  }
}
