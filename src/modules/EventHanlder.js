export class EventHandler {
  constructor(countryToISO, postalCodes) {
    this.countries = countryToISO;
    this.postalCodes = postalCodes;
    this.emailInput = document.querySelector('[data-id="email"]');
    this.countryInput = document.querySelector('[data-id="country"]');
    this.postalInput = document.querySelector('[data-id="postal"]');
    this.passwordInput = document.querySelector('[data-id="password"]');
    this.confirmInput = document.querySelector('[data-id="confirm"]');
    this.errorMsg = {
      email: {
        typeMismatch: "Wrong type",
        valueMissing: "Value missing",
      },
      country: {
        typeMismatch: "The country must exist",
        valueMissing: "Value missing",
      },
      postal: {
        typeMismatch: "The code doesn't exist",
        valueMissing: "Value missing",
      },
      password: {
        typeMismatch: `The password must contain al least:
        - one uppercase English letter
        - one lowercase English letter
        - one digit
        - one special character.`,
        valueMissing: "Value missing",
      },
      confirm: {
        typeMismatch: "The passwords must be equal",
        valueMissing: "Value missing",
      },
    };

    this.input = {
      email: () => this.inputHandler(this.isEmail, this.emailInput),
      country: () => this.inputHandler(this.isCountry, this.countryInput),
      postal: () => this.inputHandler(this.isPostalCode, this.postalInput),
      password: () => this.inputHandler(this.isPassword, this.passwordInput),
      confirm: () => this.inputHandler(this.isConfirm, this.confirmInput),
    };

    this.focusout = {
      email: () => this.focusoutHandler(this.isEmail, this.emailInput),
      country: () => this.focusoutHandler(this.isCountry, this.countryInput),
      postal: () => this.focusoutHandler(this.isPostalCode, this.postalInput),
      password: () => this.focusoutHandler(this.isPassword, this.passwordInput),
      confirm: () => this.focusoutHandler(this.isConfirm, this.confirmInput),
    };

    this.submit = {
      form: (e) => {
        if (!this.isEmail() || !this.isPostalCode() || !this.isConfirm()) {
          e.preventDefault();
        }
      },
    };
  }

  isPostalCode = () => {
    let countryName;
    if(!this.isCountry()){
      return false;
    } else {
      countryName = this.capitalizeStr(this.countryInput.value);
    }
    const postalRegExp = new RegExp(
      this.postalCodes[this.countries[countryName]],
    );
    const validity =
      countryName.length !== 0 &&
      postalRegExp.test(this.postalInput.value) &&
      this.isCountry();
    return validity;
  };

  isEmail = () => {
    return this.emailInput.validity.valid;
  };

  isCountry = () => {
    return (
      this.countryInput.validity.valid &&
      Object.hasOwn(this.countries, this.capitalizeStr(this.countryInput.value))
    );
  };

  isPassword = () => {
    return this.passwordInput.validity.valid;
  };

  isConfirm = () => {
    return (
      this.confirmInput.value === this.passwordInput.value && this.isPassword()
    );
  };

  inputHandler(validator, input) {
    if (validator()) {
      input.nextElementSibling.textContent = "";
    }
  }

  focusoutHandler(validator, input) {
    const errorSpan = input.nextElementSibling;
    if (validator()) {
      errorSpan.textContent = "";
    } else {
      this.showError(input, errorSpan);
    }
  }

  findErrorMsg(input) {
    const inputName = input.dataset.id;
    const errorMsg = input.validity.valueMissing
      ? this.errorMsg[inputName].valueMissing
      : this.errorMsg[inputName].typeMismatch;
    return errorMsg;
  }

  showError(input, errorSpan) {
    const errorMsg = this.findErrorMsg(input);
    errorSpan.textContent = errorMsg;
  }

  capitalizeStr = (str) => {
    const [first, ...rest] = str.split("");
    return first.toUpperCase() + rest.join("");
  };
}
