export const fetchPokemon = async (pokemonId) => {
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
      name: data.name,
      img: data.sprites.other.home.front_default,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map((ability) => ability.ability.name),
    };

    return information;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
