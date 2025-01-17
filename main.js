import { getPokemonInformation } from "./src/list-fetch-functions";
import { renderPokemonList } from "./src/render-list-functions";
import { renderOverview } from "./src/render-overview-functions";

const main = async () => {
  const pokemonUl = document.querySelector("#pokemon-list");
  const overviewDiv = document.querySelector("#overview-wrapper");

  // Source of truth
  let pokemons = await getPokemonInformation();

  renderPokemonList(pokemonUl, pokemons);
  renderOverview(overviewDiv, pokemons);

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

  // Test Button
  const loadPokemonButton = document.getElementById("load-pokemon");

  loadPokemonButton.addEventListener("click", async () => {
    const incomingData = await getPokemonInformation(pokemons.nextPage);
    pokemons.nextPage = incomingData.nextPage;
    pokemons.previousPage = incomingData.previousPage;
    pokemons.pokemonList = pokemons.pokemonList.concat(
      incomingData.pokemonList
    );
    renderPokemonList(pokemonUl, incomingData);
  });

  // Implementation of list scroll update
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
        renderPokemonList(pokemonUl, incomingData);
      });
    }
  });
};

main();
