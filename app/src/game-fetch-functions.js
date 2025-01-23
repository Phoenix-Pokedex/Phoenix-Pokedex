export const getData = async (
  endpoint = "https://pokeapi.co/api/v2/pokemon/pikachu"
) => {
  try {
    const data = await fetch(endpoint);
    if (!data.ok) {
      console.warn("Error while fetching");
    }
    const json = data.json();
    return json;
  } catch (err) {
    console.warn(err.message4);
    return null;
  }
};

export const getRandomPokemon = async () => {
  const allPokemon = await getData(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=-1"
  );
  const randomPokemonNumber = Math.floor(Math.random() * 900 - 0 + 0);
  const randomPokemon = await getData(
    allPokemon.results[randomPokemonNumber].url
  );
  return {
    name: randomPokemon.name,
    img: randomPokemon.sprites.other.home.front_default,
    id: randomPokemon.id,
  };
};
