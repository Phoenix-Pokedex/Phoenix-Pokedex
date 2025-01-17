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

  const format = (name) => {
    const arr = name.split(" ");
    for (let i = 0; i < arr.length; i += 1) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1);
    }
    return arr.join(" ");
  };

  const information = {
    nextPage: pokemons.next,
    previousPage: pokemons.previous,
    pokemonList: [],
  };

  for (let pokemon of pokemons.results) {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    information.pokemonList.push({
      name: format(data.name),
      type: format(data.types[0].type.name),
      img: data.sprites.other.home.front_default,
      id: data.id,
    });
  }

  return information;
};

export { getTwentyPokemon, getPokemonInformation };
