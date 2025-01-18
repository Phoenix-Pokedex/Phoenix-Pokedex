import {
  getPokemonInformation,
  getAllPokemon,
  getAllPokemonInformation,
} from "./src/list-fetch-functions";
import { renderPokemonList } from "./src/render-list-functions";
import { longerMessageRequired } from "./src/dom-helper-functions";
import { renderOverview } from "./src/render-overview-functions";
import { search } from "./src/search-query-functions";

const main = async () => {
  const pokemonUl = document.querySelector("#pokemon-list");
  const overviewDiv = document.querySelector("#overview-wrapper");
  const pokemons = await getPokemonInformation(); // Source of truth

  // Implementation of search feature
  const searchInput = document.querySelector("#search-box");
  const allPokemonCache = await getAllPokemon();
  let searchMode = true;
  let pokemonInformation;

  // Default renders
  renderPokemonList(pokemonUl, pokemons.pokemonList);
  renderOverview(overviewDiv, pokemons, 1);

  searchInput.addEventListener("input", async (event) => {
    let value = event.target.value;
    searchMode = false;
    if (value && value.trim().length >= 3) {
      pokemonUl.innerHTML = "";
      value = value.trim().toLowerCase();

      // Searches for the pokemon name in the pokemon name cache
      let searchResults = search(allPokemonCache.results, value);
      pokemonInformation = await getAllPokemonInformation(searchResults);

      renderPokemonList(pokemonUl, pokemonInformation.pokemonList);
    } else if (value && value.trim().length < 3) {
      pokemonUl.innerHTML = "";
      longerMessageRequired(pokemonUl);
    } else if (value.trim().length === 0) {
      pokemonUl.innerHTML = "";
      searchMode = true;
      renderPokemonList(pokemonUl, pokemons.pokemonList);
    }
  });

  // Implementation of pokemon overview
  pokemonUl.addEventListener("click", (event) => {
    let pokemonId;
    if (event.target.nodeName === "LI") {
      pokemonId = event.target.id;
    } else if (event.target.nodeName === "IMG") {
      pokemonId = event.target.parentNode.id;
    } else if (event.target.nodeName === "P") {
      pokemonId = event.target.parentNode.id;
    }

    if (
      Number(pokemonId) &&
      Number(pokemonId) > pokemons.pokemonList.slice(-1)[0].id
    ) {
      overviewDiv.innerHTML = "";
      renderOverview(overviewDiv, pokemonInformation, Number(pokemonId));
    } else if (Number(pokemonId)) {
      overviewDiv.innerHTML = "";
      renderOverview(overviewDiv, pokemons, Number(pokemonId));
    }
  });

  // Implementation of list update on list scroll
  pokemonUl.addEventListener("scroll", async () => {
    if (searchMode) {
      const myScrollTop = pokemonUl.scrollTop;
      const myScrollHeight = pokemonUl.scrollHeight;
      const height = pokemonUl.clientHeight;
      const diff = myScrollHeight - myScrollTop;

      if (diff === height && pokemons.nextPage !== null) {
        getPokemonInformation(pokemons.nextPage).then((incomingData) => {
          pokemons.nextPage = incomingData.nextPage;
          pokemons.previousPage = incomingData.previousPage;
          pokemons.pokemonList = pokemons.pokemonList.concat(
            incomingData.pokemonList
          );
          // Add new pokemon to the list
          renderPokemonList(pokemonUl, incomingData.pokemonList);
        });
      }
    }
  });
};

main();
