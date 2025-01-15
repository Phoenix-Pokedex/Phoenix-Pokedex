import {
  fetchPokemon,
  //   getPokemonInformation,
} from "./src/modal-fetch-functions";

const main = async () => {
  const pokemons = await fetchPokemon("bulbasaur");
  console.log(pokemons);

  //   const pokemonInfo = await getPokemonInformation();
  //   console.log(pokemonInfo);
};
main();
