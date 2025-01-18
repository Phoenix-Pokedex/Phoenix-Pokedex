import { format, noResults } from "./helper-functions";

const renderPokemonList = (listUl, pokemonInformation) => {
  pokemonInformation.forEach((pokemon) => {
    const li = document.createElement("li");
    li.className = "pokemon";
    li.setAttribute("id", pokemon.id);
    const name = document.createElement("p");
    name.textContent = format(pokemon.name);
    const type = document.createElement("p");
    type.textContent = format(pokemon.type);
    const no = document.createElement("p");
    no.textContent = `No. ${pokemon.id}`;
    const img = document.createElement("img");
    img.src = pokemon.img;
    img.style.height = "80px";
    img.style.width = "80px";

    li.append(img, no, name, type);
    listUl.append(li);
  });

  if (pokemonInformation.length === 0) {
    noResults();
  }
};

const renderSearchMessage = (listUl) => {
  const li = document.createElement("li");
  const message = document.createTextNode(
    "Keep Scrolling to Fetch and Find this Pokemon!"
  );

  li.append(message);
  listUl.append(li);
};

export { renderPokemonList, renderSearchMessage };
