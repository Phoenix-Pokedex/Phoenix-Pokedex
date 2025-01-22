import {
  getTwentyPokemon,
  getPokemon,
  getData,
} from "./src/list-fetch-functions";
import { renderPokemonList } from "./src/list-render-functions";
import { longerMessageRequired } from "./src/dom-helper-functions";
import { renderOverview } from "./src/render-overview-functions";
import { search } from "./src/search-query-functions";
import { renderGame } from "./src/game-render-functions";

const main = async () => {
  const pokemonUl = document.querySelector("#pokemon-list");
  const overviewDiv = document.querySelector("#overview-wrapper");
  const pokemons = await getTwentyPokemon();

  // Default renders
  renderPokemonList(pokemonUl, pokemons.pokemonList);
  renderOverview(overviewDiv, pokemons, 1);

  // Implementation of search feature
  const searchInput = document.querySelector("#search-box");
  const allPokemonCache = await getData(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=-1"
  );

  let searchMode = true;
  let pokemonInformation;

  searchInput.addEventListener("input", async (event) => {
    pokemonUl.innerHTML = "";
    searchMode = false;
    let value = event.target.value.trim().toLowerCase();

    if (value.length === 0) {
      searchMode = true;
      renderPokemonList(pokemonUl, pokemons.pokemonList);
    }

    if (value && value.length < 3) {
      longerMessageRequired(pokemonUl);
    }

    if (value && value.length >= 3) {
      // Searches for the pokemon name in the pokemon name cache
      let searchResults = search(allPokemonCache, value);
      pokemonInformation = await getPokemon(searchResults);
      renderPokemonList(pokemonUl, pokemonInformation.pokemonList);
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

    // If the id of the pokemon to render is not render already get the information from the other source of pokemon information
    if (Number(pokemonId) > pokemons.pokemonList.slice(-1)[0].id) {
      overviewDiv.innerHTML = "";
      renderOverview(overviewDiv, pokemonInformation, Number(pokemonId));
    } else if (Number(pokemonId)) {
      overviewDiv.innerHTML = "";
      renderOverview(overviewDiv, pokemons, Number(pokemonId));
    }
  });

  // Implementation of fetch update on list scroll
  pokemonUl.addEventListener("scroll", async () => {
    if (searchMode) {
      const myScrollTop = Math.ceil(pokemonUl.scrollTop);
      const myScrollHeight = pokemonUl.scrollHeight;
      const height = pokemonUl.clientHeight;
      const diff = myScrollHeight - myScrollTop;

      if (diff <= height && pokemons.nextPage !== null) {
        getTwentyPokemon(pokemons.nextPage).then((incomingData) => {
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

  // Implementation of minigame
  const gameDialog = document.getElementById("game-dialog");
  const openDialogButton = document.getElementById("minigame-button");
  const closeDialogButton = document.getElementById("dialog-close-button");

  openDialogButton.addEventListener("click", () => {
    document.getElementById("game-content").innerHTML = "";
    gameDialog.showModal();
    renderGame();
  });

  closeDialogButton.addEventListener("click", () => {
    gameDialog.close();
  });
};

main();
