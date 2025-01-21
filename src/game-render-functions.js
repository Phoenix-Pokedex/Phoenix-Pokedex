import { getRandomPokemon } from "./fetch-functions";

export const renderMystery = (modal, pokemon) => {
  const img = document.createElement("img");
  img.src = pokemon.img;
  modal.append(img);
};

export const renderOptions = async (Ul, correctPokemon) => {
  const card = document.createElement("li");
  card.innerText = correctPokemon.name;
  card.id = correctPokemon.id;
  for (let i = 0; i < 2; i += 1) {
    const pokemon = await getRandomPokemon();
    const wrongCard = document.createElement("li");
    wrongCard.id = pokemon.id;
    wrongCard.innerText = pokemon.name;
    Ul.append(wrongCard);
  }
  Ul.append(card);

  //Shuffling
  for (let i = 0; i < Ul.children.length; i += 1) {
    Ul.appendChild(Ul.children[(Math.random() * i) | 0]);
  }
};
