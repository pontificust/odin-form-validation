import { EventHandler, countryToISO, postalCodes, FormFieldsState } from "./modules/modules.js";
import "./assets/css/styles.css";

document.addEventListener("DOMContentLoaded", () => {
  const eventHandler = new EventHandler(new FormFieldsState(countryToISO, postalCodes));

  document.addEventListener('input', (e) => {
    if(e.target.dataset.id) {
        eventHandler.inputHandler(e.target.dataset.id);
    }
  });

  document.addEventListener('focusout', (e) => {
    if(e.target.dataset.id) {
        eventHandler.focusoutHandler(e.target.dataset.id);
    }
  });

    document.addEventListener('submit', (e) => {
        eventHandler.submitHandler(e);
  });
});
