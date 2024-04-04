const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");
const form = document.querySelector(".login");
const amount = document.querySelector(".login__amount");
const error = document.querySelector(".login__error");
let pars = "";
let nameChecked = false;
let buttonChecked = false;

input.addEventListener("input", ({ target }) => {
  if (target.value.length > 2 && target.value.length <= 10) {
    error.classList.add("hide");
    if (buttonChecked) button.removeAttribute("disabled");
    return;
  } else {
    error.classList.remove("hide");
    button.setAttribute("disabled", "");
  }
});

amount.addEventListener("click", ({ target }) => {
  const isButton = target.tagName === "BUTTON";

  if (isButton) {
    const buttons = document.querySelectorAll(".login__amount-num");
    pars = target.value;
    buttons.forEach((button) => {
      button.classList.remove("active");
      buttonChecked = true;
    });
    target.classList.add("active");
    if (nameChecked) button.removeAttribute("disabled");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  localStorage.setItem("player", input.value);
  localStorage.setItem("cardsNum", pars);
  window.location = "pages/game.html";
});
