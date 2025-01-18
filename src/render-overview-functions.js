import { fetchPokemon } from "./modal-fetch-functions";
import { renderOnePokemon, showPokemonDetails } from "./render-modal-functions";
import { format } from "./helper-functions";

const renderOverview = async (overviewDiv, object, pokemonId = 1) => {
  const data = {};
  for (let pokemon of object.pokemonList) {
    if (pokemon.id === pokemonId) {
      data.name = pokemon.name;
      data.img = pokemon.img;
      data.type = pokemon.type;
    }
  }

  const name = document.createElement("h2");
  name.textContent = `#${pokemonId} - ${format(data.name)} `;
  const img = document.createElement("img");
  img.src = data.img;
  img.style.height = "400px";
  img.style.width = "400px";
  const type = document.createElement("p");
  type.textContent = format(data.type);
  const learnMore = document.createElement("button");
  learnMore.textContent = "Learn More";
  learnMore.id = "learn-more-button";
  learnMore.setAttribute("pokemon-id", pokemonId);

  learnMore.addEventListener("click", async (event) => {
    const pokemonId = Number(event.target.getAttribute("pokemon-id"));
    const pokemons = await fetchPokemon(pokemonId);
    renderOnePokemon(pokemons);
    showPokemonDetails();
  });

  overviewDiv.append(img, name, type, learnMore);
};

export { renderOverview };
