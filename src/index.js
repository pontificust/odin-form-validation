import { EventHandler, countryToISO, postalCodes } from "./modules/modules.js";

document.addEventListener("DOMContentLoaded", () => {
  const eventHandler = new EventHandler(countryToISO, postalCodes);

  document.addEventListener('input', (e) => {
    if(e.target.dataset.id) {
        eventHandler.input[e.target.dataset.id](e);
    }
  });

  document.addEventListener('focusout', (e) => {
    if(e.target.dataset.id) {
        eventHandler.focusout[e.target.dataset.id](e);
    }
  });

    document.addEventListener('submit', (e) => {
    if(e.target.dataset.id) {
        eventHandler.submit[e.target.dataset.id](e);
    }
  });
});
