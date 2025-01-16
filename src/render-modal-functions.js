export const renderOnePokemon = (data) => {
  // creates <dialog> tag for the pop-up window
  const dialog = document.createElement("dialog");
  dialog.id = "dialog-id";

  // creates <div> for a single fetched Pokemon
  const div = document.createElement("div");

  //   creates <button> for closing the pop-up
  const closeButton = document.createElement("button");
  closeButton.id = "close-button";
  closeButton.textContent = `X`;
  div.appendChild(closeButton);

  // adds an event listener to the close-button when we open the dialog
  closeButton.addEventListener("click", hidePokemonDetails);

  // creates <h2> element that will store pokemon name
  const pokemonItem = document.createElement("h2");
  pokemonItem.textContent = `${data.name}`;
  div.appendChild(pokemonItem);

  // creates the <img> tag
  const img = document.createElement("img");
  img.src = data.img;
  img.style.height = "200px";
  img.alt = `An image of the ${data.name} Pokemon`;
  div.appendChild(img);

  // creates the <li> tag that will hold <ul> of the Pokemon stats
  const pokemonListStats = document.createElement("li");

  // creates <ul> for pokemon height
  const pokemonHeight = document.createElement("ul");
  pokemonHeight.textContent = `Height: ${data.height}`;
  pokemonListStats.appendChild(pokemonHeight);

  // creates <ul> for pokemon weight
  const pokemonWeight = document.createElement("ul");
  pokemonWeight.textContent = `Weight: ${data.weight}`;
  pokemonListStats.appendChild(pokemonWeight);

  // creates <ul> for pokemon abilities
  const pokemonAbilities = document.createElement("ul");
  pokemonAbilities.textContent = `Abilities:${data.abilities.map(
    (ability) => ` ${ability}`
  )}`;
  pokemonListStats.appendChild(pokemonAbilities);

  // appends div to pokemonItem
  div.appendChild(pokemonListStats);

  dialog.appendChild(div);
  document.body.appendChild(dialog);
};

export const showPokemonDetails = () => {
  const showDialog = document.querySelector("#dialog-id");
  showDialog.showModal();
};

export const hidePokemonDetails = () => {
  const closeDialog = document.querySelector("#dialog-id");
  closeDialog.close();
};
