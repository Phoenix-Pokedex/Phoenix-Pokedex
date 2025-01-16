import { getPokemonInformation } from "./list-fetch-functions";

const renderOverview = async (overviewDiv, pokemonArr, pokemonId) => {
  const data = {};
  for (let pokemon of pokemonArr) {
    if (pokemon.id === pokemonId) {
      data.name = pokemon.name;
      data.img = pokemon.img;
      data.type = pokemon.type;
    }
  }

  const name = document.createElement("h2");
  name.textContent = data.name;
  const img = document.createElement("img");
  img.src = data.img;
  img.style.height = "400px";
  img.style.width = "400px";
  const type = document.createElement("p");
  type.textContent = data.type;
  const learnMore = document.createElement("button");
  learnMore.textContent = "Learn More";

  overviewDiv.append(img, name, type, learnMore);
};

export { renderOverview };
