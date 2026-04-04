import { Field } from "./Field.js";

export class FormFieldsState {
  constructor(countries, postalCodes) {
    this.countries = countries;
    this.postalCodes = postalCodes;
    this.hasErrors = false;
    this.email = new Field(
      { typeMismatch: "Wrong type", valueMissing: "Value Missing" },
      "email",
    );
    this.country = new Field(
      {
        customMismatch: "The country must exist",
        valueMissing: "Value Missing",
      },
      "country",
    );
    this.postal = new Field(
      {customMismatch: "The code doesn't exist",
      valueMissing: "Value Missing"},
      "postal",
    );
    this.password = new Field(
      { patternMismatch: `The password must contain al least:
        - one uppercase English letter
        - one lowercase English letter
        - one digit
        - one special character.`,
      valueMissing: "Value missing"},
      "password",
    );
    this.confirm = new Field(
      {customMismatch: "The passwords must be equal",
      valueMissing: "Value missing",},
      "confirm",
    );

    this.validators = {
      email: () => this.isEmail(),
      country: () => this.isCountry(),
      postal: () => this.isPostalCode(),
      password: () => this.isPassword(),
      confirm: () => this.isConfirm(),
    };

    this.fields = [
      this.email,
      this.country,
      this.postal,
      this.password,
      this.confirm,
    ];
  }

  updateFormStatus() {
    this.fields.forEach(({name}) => this.updateFieldStatus(name));
    this.hasErrors = this.fields.some((field) => {
      return field.hasErrors === true;
    });
  }

  updateFieldStatus = (fieldName) => {
    const status = !this.validators[fieldName]();
    this[fieldName].setStatus(status);
  };

  getErrorMsg(fieldName) {
    const { inputElement, errors } = this[fieldName];
    const { valueMissing, typeMismatch, patternMismatch, customMismatch } = errors;
    const errorMsg = inputElement.validity.valueMissing
      ? valueMissing : inputElement.validity.typeMismatch ?
      typeMismatch : inputElement.validity.patternMismatch ?
      patternMismatch : customMismatch;
    return errorMsg;
  }

  isPostalCode = () => {
    let countryName;
    if (!this.isCountry()) {
      return false;
    } else {
      countryName = this.country.inputElement.value.toLowerCase();
    }
    const postalRegExp = new RegExp(
      this.postalCodes[this.countries[countryName]],
    );
    const validity =
      countryName.length !== 0 &&
      postalRegExp.test(this.postal.inputElement.value) &&
      this.isCountry();
    return validity;
  };

  isEmail = () => {
    return this.email.inputElement.validity.valid;
  };

  isCountry = () => {
    return (
      this.country.inputElement.validity.valid &&
      Object.hasOwn(
        this.countries,
        this.country.inputElement.value.toLowerCase(),
      )
    );
  };

  isPassword = () => {
    return this.password.inputElement.validity.valid;
  };

  isConfirm = () => {
    return (
      this.confirm.inputElement.value === this.password.inputElement.value &&
      this.isPassword()
    );
  };
}
