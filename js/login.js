const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");
const form = document.querySelector(".login");
const amount = document.querySelector(".login__amount");
let pars = "";

input.addEventListener("input", ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute("disabled");
    return;
  }
  button.setAttribute("disabled", "");
});

amount.addEventListener("click", ({ target }) => {
  const isButton = target.tagName === "BUTTON";

  if (isButton) {
    const buttons = document.querySelectorAll(".login__amount-num")
    pars = target.value;
    buttons.forEach(button => {
      button.classList.remove("active");
    });
    target.classList.add("active");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  localStorage.setItem("player", input.value);
  localStorage.setItem("cardsNum", pars);
  window.location = "pages/game.html";
});
