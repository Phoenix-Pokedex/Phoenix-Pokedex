import {
  getPokemonInformation,
  getAllPokemon,
} from "./src/list-fetch-functions";
import {
  renderPokemonList,
  renderSearchMessage,
} from "./src/render-list-functions";
import { renderOverview } from "./src/render-overview-functions";

const main = async () => {
  const pokemonUl = document.querySelector("#pokemon-list");
  const overviewDiv = document.querySelector("#overview-wrapper");
  const pokemons = await getPokemonInformation(); // Source of truth

  // Default renders
  renderPokemonList(pokemonUl, pokemons.pokemonList);
  renderOverview(overviewDiv, pokemons, 1);

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
    if (Number(pokemonId)) {
      overviewDiv.innerHTML = "";
      renderOverview(overviewDiv, pokemons, Number(pokemonId));
    }
  });

  // Implementation of list update on list scroll
  pokemonUl.addEventListener("scroll", async () => {
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
  });

  // Implementation of search feature
  const searchInput = document.querySelector("#search-box");
  const allPokemonCache = await getAllPokemon();

  searchInput.addEventListener("input", async (event) => {
    let value = event.target.value;
    if (value && value.trim().length > 0) {
      pokemonUl.innerHTML = "";
      value = value.trim().toLowerCase();

      // Tries to look for what is already in the pokemons variable
      let filteredResults = pokemons.pokemonList.filter((pokemon) => {
        return pokemon.name.includes(value);
      });

      // Tries to look in the pokemon names cache
      let pokemonNamesArr = allPokemonCache.results.filter((pokemon) => {
        return pokemon.name.includes(value);
      });

      if (filteredResults.length === 0 && pokemonNamesArr.length > 0) {
        renderSearchMessage(pokemonUl);
      } else {
        renderPokemonList(pokemonUl, filteredResults);
      }
    } else {
      pokemonUl.innerHTML = "";
      renderPokemonList(pokemonUl, pokemons.pokemonList);
    }
  });
};

main();
