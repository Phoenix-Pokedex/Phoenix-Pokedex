const search = (cache, query) => {
  return cache.filter((pokemon) => {
    return pokemon.name.includes(query);
  });
};

export { search };
