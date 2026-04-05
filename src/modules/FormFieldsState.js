import { Field } from "./Field.js";

export class FormFieldsState {
  constructor(countries, postalCodes) {
    this.countries = countries;
    this.postalCodes = postalCodes;
    this.hasErrors = false;
    this.formStatusElem = document.querySelector(".status");
    this.email = new Field(
      {
        typeMismatch: "[ERROR: INVALID_COMMS_ADDRESS_FORMAT]",
        valueMissing: "[CRITICAL: INPUT_BUFFER_EMPTY]",
        statusMessage:
          "STATUS: ACCESSING COMMS_LINK... PLEASE ENTER REGISTERED ADDRESS.",
      },
      "email",
    );

    this.country = new Field(
      {
        customMismatch: "[ERROR: GEOGRAPHIC_REGION_NOT_RECOGNIZED]",
        valueMissing: "[CRITICAL: REGION_DATA_REQUIRED]",
        statusMessage:
          "STATUS: GEOGRAPHIC SCANNER ACTIVE... DEFINE CURRENT SECTOR.",
      },
      "country",
    );

    this.postal = new Field(
      {
        customMismatch: "[ERROR: LOCATION_SECTOR_UNDEFINED]",
        valueMissing: "[CRITICAL: ZIP_COORDS_MISSING]",
        statusMessage:
          "STATUS: INDEXING SECTOR COORDS... ENTER LOCAL DELIVERY CODE.",
      },
      "postal",
    );

    this.password = new Field(
      {
        patternMismatch: `[SECURITY_THRESHOLD_NOT_MET]`,
        valueMissing: "[CRITICAL: SECURITY_KEY_REQUIRED]",
        statusMessage:
          "STATUS: REQ: 8+ CHARS // ALPHA-NUM // 1x CASE // 1x SPEC-CHAR",
      },
      "password",
    );

    this.confirm = new Field(
      {
        customMismatch: "[ERROR: BIT_PARITY_MISMATCH - KEYS_NOT_SYNCED]",
        valueMissing: "[CRITICAL: RE-ENTRY_VALIDATION_REQUIRED]",
        statusMessage:
          "STATUS: INITIALIZING PARITY CHECK... RE-ENTER SECURITY KEY.",
      },
      "confirm",
    );

    this.validators = {
      email: () => this.isEmail(),
      country: () => this.isCountry(),
      postal: () => this.isPostalCode(),
      password: () => this.isPassword(),
      confirm: () => this.isConfirm(),
    };

    this.formStatus = {
      processing: "STATUS: INITIALIZING PARITY CHECK... RE-ENTER SECURITY KEY.",
      success:
        "STATUS: DATA_PACKET_RECEIVED // ENROLLMENT COMPLETE // WELCOME, CITIZEN.",
      error:
        "STATUS: CRITICAL ERROR // DATA_CORRUPTION_DETECTED // RE-ENTER FIELD",
      initial: "STATUS: ROBCO OS V2.5.1 // AWAITING USER INPUT...",
    };

    this.fields = [
      this.email,
      this.country,
      this.postal,
      this.password,
      this.confirm,
    ];
  }

  setCurrentStatus = (status) => {
    this.formStatusElem.textContent = status;
  };

  updateFormStatus() {
    this.fields.forEach(({ name }) => this.updateFieldStatus(name));
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
    const { valueMissing, typeMismatch, patternMismatch, customMismatch } =
      errors;
    const errorMsg = inputElement.validity.valueMissing
      ? valueMissing
      : inputElement.validity.typeMismatch
        ? typeMismatch
        : inputElement.validity.patternMismatch
          ? patternMismatch
          : customMismatch;
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
