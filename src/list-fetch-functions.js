const getTwentyPokemon = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
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

const getPokemonInformation = async () => {
  const pokemons = await getTwentyPokemon();
  const information = [];
  for (let pokemon of pokemons.results) {
    const response = await fetch(pokemon.url);
    const data = await response.json();

    information.push({
      name: data.name,
      type: data.types[0].type.name,
      no: data.game_indices[0].game_index,
      img: data.sprites.front_default,
    });
  }
  return information;
};

export { getPokemonInformation };
