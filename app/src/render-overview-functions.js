import { fetchPokemon } from "./modal-fetch-functions";
import { renderOnePokemon, showPokemonDetails } from "./render-modal-functions";
import { format } from "./dom-helper-functions";

const renderOverview = async (overviewDiv, object, pokemonId = 1) => {
  const data = {};

  if (object.pokemonList) {
    for (let pokemon of object.pokemonList) {
      if (pokemon.id === pokemonId) {
        data.name = pokemon.name;
        data.img = pokemon.img;
        data.type = pokemon.type;
      }
    }
  } else {
    for (let pokemon of object) {
      if (pokemon.id === pokemonId) {
        data.name = pokemon.name;
        data.img = pokemon.img;
        data.type = pokemon.type;
      }
    }
  }

  const detailsDiv = document.createElement("div");
  detailsDiv.id = "overview-details-container";

  const name = document.createElement("h2");
  name.textContent = `#${pokemonId} - ${format(data.name)} `;
  const imageWrapper = document.createElement("div");
  imageWrapper.id = "overview-image-wrapper";
  const img = document.createElement("img");
  img.id = "pokemon-image";
  img.src = data.img;

  const typeContainer = document.createElement("div");
  typeContainer.id = "type-container";

  const type = document.createElement("p");
  type.textContent = format(data.type);

  const typeImg = document.createElement("img");
  typeImg.src = `Phoenix-Pokedex/app/assets/types/${data.type}.png`;

  const learnMore = document.createElement("img");
  learnMore.src = "assets/svg/icons/info.png";
  learnMore.id = "learn-more-button";
  learnMore.setAttribute("pokemon-id", pokemonId);

  learnMore.addEventListener("click", async (event) => {
    const pokemonId = Number(event.target.getAttribute("pokemon-id"));
    const pokemons = await fetchPokemon(pokemonId);
    renderOnePokemon(pokemons);
    showPokemonDetails();
  });

  imageWrapper.append(img, learnMore);

  typeContainer.append(typeImg, type);

  detailsDiv.append(name, typeContainer);

  overviewDiv.append(detailsDiv, imageWrapper);
};

export { renderOverview };
