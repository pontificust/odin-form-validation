export class EventHandler {
  constructor(formFieldsState) {
    this.formFieldsState = formFieldsState;

    this.submit = {
      form: (e) => {
        if (!this.isEmail() || !this.isPostalCode() || !this.isConfirm()) {
          e.preventDefault();
        }
      },
    };
  }

  inputHandler(fieldName) {
    const validator = this.formFieldsState.validators[fieldName];
    const input = this.formFieldsState[fieldName].inputElement;
    if (validator()) {
      input.nextElementSibling.textContent = "";
      this.setFieldsStatus(input.dataset.id, true);
    }
  }

  focusoutHandler(fieldName) {
    const { errorSpan } = this.formFieldsState[fieldName];
    const validator = this.formFieldsState.validators[fieldName];
    if (validator()) {
      errorSpan.textContent = "";
    } else {
      this.showError(fieldName, errorSpan);
      this.formFieldsState.updateFieldStatus(fieldName);
    }
  }

  findErrorMsg(fieldName) {
    const {valueMissing, typeMismatch, inputElement} = this.formFieldsState[fieldName];
    const errorMsg = inputElement.validity.valueMissing
      ? valueMissing
      : typeMismatch;
    return errorMsg;
  }

  showError(fieldName, errorSpan) {
    const errorMsg = this.findErrorMsg(fieldName);
    errorSpan.textContent = errorMsg;
  }

  capitalizeStr = (str) => {
    const [first, ...rest] = str.split("");
    return first.toUpperCase() + rest.join("");
  };
}
