export class Field {
    constructor(typeMismatch, valueMissing, inputName) {
        this.typeMismatch = typeMismatch;
        this.valueMissing = valueMissing;
        this.inputElement = document.querySelector(`[data-id=${inputName}]`);
        this.errorSpan = this.inputElement.nextElementSibling;
        this.status = true;
    }

    setStatus(status) {
        this.status = status;
    }
}