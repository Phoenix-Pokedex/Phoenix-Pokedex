import { fetchPokemon } from "./src/modal-fetch-functions";
import {
  hidePokemonDetails,
  renderOnePokemon,
  showPokemonDetails,
} from "./src/render-modal-functions";

const main = async () => {
  // Creates modal programmatically

  const button = document.querySelector(".learn-more-button");
  button.addEventListener("click", async (event) => {
    const pokemonId = event.target.id;

    console.log(pokemonId);
    const pokemons = await fetchPokemon(pokemonId);
    renderOnePokemon(pokemons);

    showPokemonDetails();
  });
};
main();
