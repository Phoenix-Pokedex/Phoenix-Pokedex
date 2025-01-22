import { getData, getPokemon, filterByType } from "./filter";

const main = async () => {
  const form = document.querySelector("#pokemon-type-form");
  const pokemonListElement = document.querySelector("#pokemon-list");
  const pokemonList = await getData(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=-1"
  );

  const pokemonData = await getPokemon(pokemonList);

  const handleSubmit = (event) => {
    pokemonListElement.innerHTML = "";
    event.preventDefault();
    const data = new FormData(event.target);
    const dataObject = Object.fromEntries(data.entries());
    const pokemonTypeKey = dataObject["pokemon-type"];
    const filteredData = filterByType(pokemonData.pokemonList, pokemonTypeKey);
    renderPokemonList(pokemonListElement, filteredData);
    form.reset();
  };

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
      no.textContent = `No. ${pokemon.id}`;
      const img = document.createElement("img");
      img.src = pokemon.img;
      img.style.height = "80px";
      img.style.width = "80px";

      li.append(img, no, name);
      listUl.append(li);
    });

    if (pokemonInformation.length === 0) {
      notFoundMessage(listUl);
    }
  };

  form.addEventListener("submit", handleSubmit);
};

main();
