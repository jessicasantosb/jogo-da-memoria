const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");
const form = document.querySelector(".login");
const amount = document.querySelector(".login__amount");
const error = document.querySelector(".login__error");
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

  const buttons = document.querySelectorAll(".login__amount-num");
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
