export const fetchPokemon = async (pokemonId) => {
  const format = (name) => {
    const arr = name.split(" ");
    for (let i = 0; i < arr.length; i += 1) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1);
    }
    return arr.join(" ");
  };

  try {
    if (!pokemonId) {
      console.warn(`Provide a Pokemon name`);
      return null;
    }

    // Fetch data from the API
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    // Check if the response is okay
    if (!response.ok) {
      console.warn(`Failed to fetch Pokémon data for: ${pokemonName}`);
      return null;
    }

    // Parse the data
    const data = await response.json();

    // Structure the information
    const information = {
      name: format(data.name),
      img: data.sprites.other.home.front_default,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map((ability) => ability.ability.name),
      cries: data.cries.latest,
    };

    return information;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
