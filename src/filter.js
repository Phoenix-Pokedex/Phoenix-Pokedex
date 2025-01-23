const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch data from ${url}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error.message);
    return null;
  }
};

const getPokemon = async (pokemonData) => {
  const information = {
    nextPage: pokemonData.next,
    previousPage: pokemonData.previous,
    pokemonList: [],
  };

  const promises = [];
  for (let pokemon of pokemonData.results) {
    promises.push(getData(pokemon.url));
  }

  return Promise.all(promises).then((data) => {
    for (let i = 0; i < data.length; i += 1) {
      information.pokemonList.push({
        name: data[i].name,
        type: data[i].types[0].type.name,
        img:
          data[i].sprites.other.home.front_default === null
            ? "assets/svg/icons/image-break.png"
            : data[i].sprites.other.home.front_default,
        id: data[i].id,
      });
    }
    return information;
  });
};

const filterByType = (pokemonData, type) => {
  const filteredArray = pokemonData.filter((pokemon) => {
    return pokemon.type === type;
  });
  return filteredArray;
};

export { getData, getPokemon, filterByType };
