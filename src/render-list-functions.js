const renderPokemonList = (listUl, pokemonInformation) => {
  pokemonInformation.forEach((pokemon) => {
    const li = document.createElement("li");
    const name = document.createElement("p");
    name.textContent = pokemon.name;
    const type = document.createElement("p");
    type.textContent = pokemon.type;
    const no = document.createElement("p");
    no.textContent = pokemon.no;
    const img = document.createElement("img");
    img.src = pokemon.img;

    li.append(img, no, name, type);
    listUl.append(li);
  });
};

export { renderPokemonList };
