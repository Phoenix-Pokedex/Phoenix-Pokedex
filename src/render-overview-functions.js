import { getPokemonInformation } from "./list-fetch-functions";
import { fetchPokemon } from "./modal-fetch-functions";
import {
  renderOnePokemon,
  showPokemonDetails,
  hidePokemonDetails,
} from "./render-modal-functions";

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
  learnMore.id = "learn-more-button";
  learnMore.setAttribute("pokemon-id", pokemonId);

  learnMore.addEventListener("click", async (event) => {
    const pokemonId = Number(event.target.getAttribute("pokemon-id"));
    console.log(pokemonId);
    const pokemons = await fetchPokemon(pokemonId);
    renderOnePokemon(pokemons);
    showPokemonDetails();
  });

  overviewDiv.append(img, name, type, learnMore);
};

export { renderOverview };
