export class Field {
  constructor(
    { typeMismatch, valueMissing, patternMismatch, customMismatch },
    inputName,
  ) {
    this.name = inputName;
    this.errors = {
      typeMismatch: typeMismatch,
      valueMissing: valueMissing,
      patternMismatch: patternMismatch,
      customMismatch: customMismatch,
    };
    this.typeMismatch = typeMismatch;
    this.valueMissing = valueMissing;
    this.inputElement = document.querySelector(`[data-id=${inputName}]`);
    this.errorSpan = this.inputElement.nextElementSibling;
    this.hasErrors = false;
  }

  setStatus(status) {
    this.hasErrors = status;
  }
}
