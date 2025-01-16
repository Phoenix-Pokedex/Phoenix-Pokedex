import { getPokemonInformation } from "./src/list-fetch-functions";
import { renderPokemonList } from "./src/render-list-functions";
import { renderOverview } from "./src/render-overview-functions";
import { renderSearchList } from "./src/search-render-functions";

const main = async () => {
  const pokemonUl = document.querySelector("#pokemon-list");
  const overviewDiv = document.querySelector("#overview-wrapper");
  const pokemons = await getPokemonInformation();

  renderPokemonList(pokemonUl, pokemons);
  renderOverview(overviewDiv, pokemons, 1);
  renderSearchList();

  pokemonUl.addEventListener("click", (event) => {
    let pokemonId;

    if (event.target.nodeName === "LI") {
      pokemonId = event.target.id;
    } else if (event.target.nodeName === "IMG") {
      pokemonId = event.target.parentNode.id;
    } else if (event.target.nodeName === "P") {
      pokemonId = event.target.parentNode.id;
    }

    if (Number(pokemonId)) {
      overviewDiv.innerHTML = "";
      renderOverview(overviewDiv, pokemons, Number(pokemonId));
    }
  });
};

main();
