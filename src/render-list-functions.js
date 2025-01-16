const renderPokemonList = (listUl, pokemonInformation) => {
  pokemonInformation.forEach((pokemon) => {
    const li = document.createElement("li");
    li.className = "pokemon";
    li.setAttribute("id", pokemon.id);
    const name = document.createElement("p");
    name.textContent = pokemon.name;
    const type = document.createElement("p");
    type.textContent = pokemon.type;
    const no = document.createElement("p");
    no.textContent = `No. ${pokemon.no}`;
    const img = document.createElement("img");
    img.src = pokemon.img;
    img.style.height = "80px";
    img.style.width = "80px";

    li.append(img, no, name, type);
    listUl.append(li);
  });
};

export { renderPokemonList };
