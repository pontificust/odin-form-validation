import { Field } from "./Field.js";
import { capitalizeStr } from "./utils.js";

export class FormFieldsState {
  constructor(countries, postalCodes) {
    this.countries = countries;
    this.postalCodes = postalCodes;
    this.formStatus = true;
    this.email = new Field("Wrong type", "Value Missing", "email");
    this.country = new Field(
      "The country must exist",
      "Value Missing",
      "country",
    );
    this.postal = new Field(
      "The code doesn't exist",
      "Value Missing",
      "postal",
    );
    this.password = new Field(
      `The password must contain al least:
        - one uppercase English letter
        - one lowercase English letter
        - one digit
        - one special character.`,
      "Value missing",
      "password",
    );
    this.confirm = new Field(
      "The passwords must be equal",
      "Value missing",
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
    this.formStatus = this.fields.some(field => {
        this.updateFieldStatus(field.name);
        field.status === false;
    });
  }

  updateFieldStatus = (fieldName) => {
    const status = this.validators[fieldName]();
    this[fieldName].setStatus(status);
  };

  getErrorMsg(fieldName) {
    const { valueMissing, typeMismatch, inputElement } =
      this[fieldName];
    const errorMsg = inputElement.validity.valueMissing
      ? valueMissing
      : typeMismatch;
    return errorMsg;
  }

  isPostalCode = () => {
    let countryName;
    if (!this.isCountry()) {
      return false;
    } else {
      countryName = capitalizeStr(this.country.inputElement.value);
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
        capitalizeStr(this.country.inputElement.value),
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
