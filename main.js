import { getPokemonInformation } from "./src/list-fetch-functions";
import { renderPokemonList } from "./src/render-list-functions";

const main = async () => {
  const pokemonUl = document.querySelector("#pokemon-list");
  const pokemons = await getPokemonInformation();

  renderPokemonList(pokemonUl, pokemons);
};

main();
