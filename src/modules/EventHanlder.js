export class EventHandler {
  constructor(countryToISO, postalCodes) {
    this.countries = countryToISO;
    this.postalCodes = postalCodes;
    this.emailInput = document.querySelector('[data-id="email"]');
    this.countryInput = document.querySelector('[data-id="country"]');
    this.postalInput = document.querySelector('[data-id="postal"]');
    this.passwordInput = document.querySelector('[data-id="password"]');
    this.confirmInput = document.querySelector('[data-id="confirm"]');

    this.input = {
      email: () => {
        if (this.isEmail()) {
          this.emailInput.nextElementSibling.textContent = "";
        }
      },
      country: () => {
        if (this.isCountry()) {
          this.countryInput.nextElementSibling.textContent = "";
        }
      },
      postal: () => {
        if (this.isPostalCode()) {
          this.postalInput.nextElementSibling.textContent = "";
        }
      },
      password: () => {
        if (this.isPassword) {
          this.passwordInput.nextElementSibling.textContent = "";
        }
      },
      confirm: () => {
        if (this.isConfirm()) {
          this.confirmInput.nextElementSibling.textContent = "";
        }
      },
    };

    this.focusout = {
      email: () => {
        if (this.isEmail()) {
          this.emailInput.nextElementSibling.textContent = "";
        } else {
          this.emailInput.nextElementSibling.textContent =
            "Input an email addres in correct format";
        }
      },
      country: () => {
        if (this.isCountry()) {
          this.countryInput.nextElementSibling.textContent = "";
        } else {
          this.countryInput.nextElementSibling.textContent =
            "Input an email addres in correct format";
        }
      },
      postal: () => {
        if (this.isPostalCode()) {
          this.postalInput.nextElementSibling.textContent = "";
        } else {
          this.postalInput.nextElementSibling.textContent = "Error";
        }
      },
      password: () => {
        if (this.isPassword()) {
          this.passwordInput.nextElementSibling.textContent = "";
        } else {
          this.passwordInput.nextElementSibling.textContent = "Error";
        }
      },
      confirm: () => {
        if (this.isConfirm()) {
          this.confirmInput.nextElementSibling.textContent = "";
        } else {
          this.confirmInput.nextElementSibling.textContent = "Error";
        }
      },
    };

    this.submit = {
      form: (e) => {

        if(!this.isEmail() || !this.isPostalCode() || !this.isConfirm()){

          e.preventDefault();
        }
      },
    };
  }

  isPostalCode() {
    const countryName = this.capitalizeStr(this.countryInput.value);
    const postalRegExp = new RegExp(
      this.postalCodes[this.countries[countryName]],
    );
    console.log(postalRegExp);
    const validity =
      countryName.length !== 0 &&
      postalRegExp.test(this.postalInput.value) &&
      this.isCountry();
    return validity;
  }

  isEmail() {
    return this.emailInput.validity.valid;
  }

  isCountry() {
    return (
      this.countryInput.validity.valid &&
      Object.hasOwn(this.countries, this.capitalizeStr(this.countryInput.value))
    );
  }

  isPassword() {
    return this.passwordInput.validity.valid;
  }

  isConfirm() {
    return (
      this.confirmInput.value === this.passwordInput.value && this.isPassword()
    );
  }

  capitalizeStr(str) {
    const [first, ...rest] = str.split("");
    return first.toUpperCase() + rest.join("");
  }
}
