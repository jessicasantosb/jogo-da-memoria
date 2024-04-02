const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");
const form = document.querySelector(".login");
const amount = document.querySelectorAll(".login__amount-num");
let pars = "";

input.addEventListener("input", ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute("disabled");
    return;
  }
  button.setAttribute("disabled", "");
});

amount.forEach((btn) => {
  btn.addEventListener("click", () => {
    pars = btn.value;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  localStorage.setItem("player", input.value);
  localStorage.setItem("cardsNum", pars);
  window.location = "pages/game.html";
});
