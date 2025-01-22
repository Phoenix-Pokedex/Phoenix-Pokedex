import { getRandomPokemon } from "./fetch-functions";

let pokemon;
const gameContainer = document.getElementById("game-content");
const dialogHeader = document.getElementById("results");
const dialogFooter = document.getElementById("game-footer");

const handlePlayAgain = () => {
  gameContainer.innerHTML = "";
  renderGame();
};

const guessHandler = (event) => {
  const guessId = Number(event.target.id);
  if (guessId) {
    checkWin(guessId, pokemon.id);
  }
};

const checkWin = (idGuess, correctId) => {
  const text = document.createElement("p");
  if (idGuess === correctId) {
    text.textContent = `It's ${pokemon.name}!`;
    text.style.color = "green";
  } else {
    text.textContent = `Oh no! it was ${pokemon.name}`;
    text.style.color = "red";
  }
  document.querySelector("#image-container img").style.filter = "none";
  dialogHeader.append(text);
  renderPlayAgain();
};

export const renderPlayAgain = () => {
  document
    .getElementById("options-list")
    .removeEventListener("click", guessHandler);
  const playAgainButton = document.createElement("button");
  playAgainButton.id = "play-again-button";
  playAgainButton.textContent = "Play Again?";
  playAgainButton.addEventListener("click", handlePlayAgain);
  dialogFooter.append(playAgainButton);
};

export const renderOptions = async (correctPokemon) => {
  const list = document.createElement("ul");
  list.id = "options-list";
  list.addEventListener("click", guessHandler);

  const card = document.createElement("li");
  card.innerText = correctPokemon.name;
  card.id = correctPokemon.id;

  for (let i = 0; i < 2; i += 1) {
    const pokemon = await getRandomPokemon();
    const wrongCard = document.createElement("li");
    wrongCard.id = pokemon.id;
    wrongCard.innerText = pokemon.name;
    list.append(wrongCard);
  }

  list.append(card);

  //Shuffle
  for (let i = 0; i < list.children.length; i += 1) {
    list.appendChild(list.children[(Math.random() * i) | 0]);
  }
  dialogFooter.append(list);
};

export const renderGame = async () => {
  dialogFooter.innerHTML = "";
  dialogHeader.innerHTML = "";
  pokemon = await getRandomPokemon();

  const div = document.createElement("div");
  div.id = "image-container";

  const img = document.createElement("img");
  img.src = pokemon.img;

  div.append(img);
  gameContainer.append(div);
  renderOptions(pokemon);
};
