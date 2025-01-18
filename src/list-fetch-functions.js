const getAllPokemon = async () => {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=-1"
    );
    if (!response.ok) {
      console.warn("Failed to get pokemon data");
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error.message);
    return null;
  }
};

const getTwentyPokemon = async (
  endpoint = "https://pokeapi.co/api/v2/pokemon"
) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      console.warn("Failed to get pokemon data");
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error.message);
    return null;
  }
};

const getPokemonInformation = async (endpoint) => {
  let pokemons = await getTwentyPokemon(endpoint);

  const information = {
    nextPage: pokemons.next,
    previousPage: pokemons.previous,
    pokemonList: [],
  };

  for (let pokemon of pokemons.results) {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    information.pokemonList.push({
      name: data.name,
      type: data.types[0].type.name,
      img: data.sprites.other.home.front_default,
      id: data.id,
    });
  }

  return information;
};

export { getTwentyPokemon, getPokemonInformation, getAllPokemon };
