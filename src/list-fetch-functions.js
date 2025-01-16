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
  const format = (name) => {
    const arr = name.split(" ");
    for (let i = 0; i < arr.length; i += 1) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1);
    }
    return arr.join(" ");
  };

  const information = [];
  for (let pokemon of pokemons.results) {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    information.push({
      name: format(data.name),
      type: format(data.types[0].type.name),
      no: data.game_indices[0].game_index,
      img: data.sprites.other.home.front_default,
      id: data.id,
    });
  }
  return information;
};

export { getTwentyPokemon, getPokemonInformation };
