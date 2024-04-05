const grid = document.querySelector('[data-element="grid"]');
const playerDisplay = document.querySelector('[data-header="player"]');
const timerDisplay = document.querySelector('[data-header="timer"]');
const back = document.querySelector('[data-button="back"]');
const restart = document.querySelector('[data-button="restart"]');
const bestPlayerDisplay = document.querySelector('[data-footer="player"]');
const bestTimeDisplay = document.querySelector('[data-footer="time"]');

const cardsNum = Number(localStorage.getItem("cardsNum"));
const bestTime = JSON.parse(localStorage.getItem("bestTime"));

const images = [
  "astronaut",
  "astronaut2",
  "earth",
  "jupiter",
  "mars",
  "moon",
  "moon2",
  "saturn",
  "space",
  "uranus",
];

let firstCard = "";
let secondCard = "";
let currentTime = 0;

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const fancyTimeFormat = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  let ret = "";

  if (hours > 0) {
    ret += hours + ":" + (minutes < 10 ? "0" : "");
  }

  ret += minutes + ":" + (seconds < 10 ? "0" : "");
  ret += seconds;

  return ret;
};

const getGameLevel = () => {
  if (cardsNum === 4) return "easy";
  if (cardsNum === 6) return "medium";
  if (cardsNum === 10) return "hard";
};

const gameLevel = getGameLevel();

const saveBestTimeToLocalStorage = () => {
  const endGameData = {
    name: playerDisplay.textContent,
    time: currentTime,
  };

  if (!bestTime) return {};
  if (bestTime[gameLevel]) {
    if (bestTime[gameLevel].time > endGameData.time) {
      bestTime[gameLevel] = endGameData;
      localStorage.setItem("bestTime", JSON.stringify(bestTime));
    }
  } else {
    bestTime[gameLevel] = endGameData;
    localStorage.setItem("bestTime", JSON.stringify(bestTime));
  }
};

const displayBestTime = () => {
  if (bestTime[gameLevel]) {
    bestTimeDisplay.textContent = fancyTimeFormat(bestTime[gameLevel].time);
    bestPlayerDisplay.textContent = bestTime[gameLevel].name;
  }
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === cardsNum * 2) {
    setTimeout(() => {
      clearInterval(this.loop);

      saveBestTimeToLocalStorage();

      alert(
        `Parabéns, ${playerDisplay.textContent}! Seu tempo foi: ${timerDisplay.textContent}`
      );
    }, 600);
  }
};

const checkCards = () => {
  const firstChoice = firstCard.getAttribute("data-image");
  const secondChoice = secondCard.getAttribute("data-image");

  if (firstChoice === secondChoice) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
    firstCard = "";
    secondCard = "";

    checkEndGame();
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
  const card = target.dataset.image;
  if (!card) return;

  if (target.className.includes("reveal-card")) return;

  if (firstCard === "") {
    target.classList.add("reveal-card");
    firstCard = target;
  } else if (secondCard === "") {
    target.classList.add("reveal-card");
    secondCard = target;
    checkCards();
  }
};

const createBackCardAstronaut = () => {
  const container = createElement("div", "container");
  const stars = createElement("div", "stars");
  const planet = createElement("div", "planet");
  const astronaut = createElement("div", "astronaut");
  const shadow = createElement("div", "shadow");
  const tank = createElement("div", "tank center");
  const suit = createElement("div", "suit center");
  const helmet = createElement("div", "helmet center");
  const buttons = createElement("div", "buttons center");
  const handL = createElement("div", "hand-l");
  const handR = createElement("div", "hand-r");
  const legL = createElement("div", "leg-l");
  const legR = createElement("div", "leg-r");
  const pipe = createElement("div", "pipe");

  planet.appendChild(shadow);
  astronaut.append(tank, suit);
  suit.append(helmet, buttons, handL, handR, legL, legR, pipe);
  container.append(stars, planet, astronaut);

  return container;
};

const createCard = (img) => {
  const card = createElement("div", "game__card");
  const front = createElement("div", "game__card__face front");
  const back = createElement("div", "game__card__face back");

  front.style.backgroundImage = `url("../assets/${img}.jpg")`;

  const astronaut = createBackCardAstronaut();

  back.appendChild(astronaut);
  card.appendChild(front);
  card.appendChild(back);

  card.setAttribute("data-image", img);

  return card;
};

const loadGame = () => {
  if (cardsNum === 4) {
    grid.style.gridTemplateColumns = `repeat(${cardsNum}, minmax(10%, 1fr))`;
  }

  if (cardsNum === 6)
    grid.style.gridTemplateColumns = `repeat(4, minmax(10%, 1fr))`;

  if (cardsNum === 10)
    grid.style.gridTemplateColumns = `repeat(5, minmax(10%, 1fr))`;

  const imagesShuffled = images.sort(() => Math.random() - 0.5);

  const imagesSliced = imagesShuffled.slice(0, cardsNum);

  const imagesDuplicated = [...imagesSliced, ...imagesSliced];

  const ImagesDuplicatedShuffled = imagesDuplicated.sort(
    () => Math.random() - 0.5
  );

  ImagesDuplicatedShuffled.forEach((img) => {
    const card = createCard(img);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    timerDisplay.textContent = fancyTimeFormat(++currentTime);
  }, 1000);
};

grid.addEventListener("click", revealCard);

back.addEventListener("click", () => {
  const answer = window.confirm("Deseja abandonar a partida?");
  if (answer) window.location = "../index.html";
});

restart.addEventListener("click", () => {
  const answer = window.confirm("Deseja reiniciar a partida?");
  if (answer)
    setTimeout(() => {
      window.location.reload(true);
    }, 200);
});

window.onload = () => {
  playerDisplay.textContent = localStorage.getItem("player");

  displayBestTime();
  startTimer();
  loadGame();
};
