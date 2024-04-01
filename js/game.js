const grid = document.querySelector(".game__grid");

const images = [
  "astronaut",
  "astronaut2",
  "earth",
  "jupiter",
  "mars",
  "moon",
  "moon2",
  "rocket",
  "saturn",
  "space",
  "uranus",
  "venus",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll(".disabled-card")

    if (disabledCards.length === 20) {
        alert("Parabens, voce conseguiu")
    }
}

const checkCards = () => {
  const firstChoice = firstCard.getAttribute("data-image");
  const secondChoice = secondCard.getAttribute("data-image");

  if (firstChoice === secondChoice) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
    firstCard = "";
    secondCard = "";

    checkEndGame()
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");
      firstCard = "";
      secondCard = "";
    }, 1500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) return;

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;
    checkCards();
  }
};

const createCard = (img) => {
  const card = createElement("div", "game__card");
  const front = createElement("div", "game__card__face front");
  const back = createElement("div", "game__card__face back");

  front.style.backgroundImage = `url("../assets/${img}.jpg")`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-image", img);

  return card;
};

const loadGame = () => {
  const duplicateImages = [...images, ...images];

  const shuffledImages = duplicateImages.sort(() => Math.random() - 0.5);

  shuffledImages.forEach((img) => {
    const card = createCard(img);
    grid.appendChild(card);
  });
};

loadGame();
