import { getPokemonInformation } from "./src/list-fetch-functions";
import { renderPokemonList } from "./src/render-list-functions";
import { renderOverview } from "./src/render-overview-functions";

const main = async () => {
  const pokemonUl = document.querySelector("#pokemon-list");
  const overviewDiv = document.querySelector("#overview");
  const pokemons = await getPokemonInformation();

  renderPokemonList(pokemonUl, pokemons);

  const obj = {
    name: "pikachu",
    type: "lightning",
    no: 1,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  };

  renderOverview(overviewDiv, obj);
};

main();
