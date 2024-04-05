const input = document.querySelector('[data-input="name"]');
const button = document.querySelector('[data-button="login"]');
const form = document.querySelector('[data-form="login"]');
const amount = document.querySelector('[data-buttons="amount"]');
const error = document.querySelector('[data-erro="login"]');

let pars = "";
let nameChecked = false;
let buttonChecked = false;

const handleDisableButton = () => {
  if (nameChecked && buttonChecked) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "");
  }
};

const handleName = ({ target }) => {
  const validateName = target.value.length > 2 && target.value.length <= 10;

  if (validateName) {
    error.classList.add("hide");
    nameChecked = true;
  } else {
    error.classList.remove("hide");
    nameChecked = false;
  }

  handleDisableButton();
};

const handleAmount = ({ target }) => {
  const isButton = target.tagName === "BUTTON";
  if (!isButton) return null;

  const buttons = document.querySelectorAll('[data-button="number"]');
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  target.classList.add("active");

  buttonChecked = true;
  pars = target.value;

  handleDisableButton();
};

input.addEventListener("input", handleName);

amount.addEventListener("click", handleAmount);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  localStorage.setItem("player", input.value);
  localStorage.setItem("cardsNum", pars);
  window.location = "pages/game.html";
});
