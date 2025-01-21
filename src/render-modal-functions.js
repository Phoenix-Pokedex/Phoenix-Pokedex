export const renderOnePokemon = (data) => {
  // creates <dialog> tag for the pop-up window
  const dialog = document.createElement("dialog");
  dialog.id = "dialog-id";

  // creates <div> for a single fetched Pokemon
  const div = document.createElement("div");
  div.id = "single-pokemon";

  //   creates <button> for closing the pop-up
  const closeButton = document.createElement("button");
  closeButton.id = "close-button";
  closeButton.textContent = `X`;
  div.appendChild(closeButton);

  // adds an event listener to the close-button when we open the dialog
  closeButton.addEventListener("click", hidePokemonDetails);

  // creates <h2> element that will store pokemon name
  const pokemonItem = document.createElement("h2");
  pokemonItem.id = "pokemon-name";
  pokemonItem.textContent = `${data.name}`;
  div.appendChild(pokemonItem);

  // creates the <img> tag
  const img = document.createElement("img");
  img.id = "single-pokemon-image";
  img.src = data.img;
  // img.style.height = "200px";
  img.alt = `An image of the ${data.name} Pokemon`;
  div.appendChild(img);

  // creates the <li> tag that will hold <ul> of the Pokemon stats
  const pokemonListStats = document.createElement("li");

  // creates <ul> for pokemon height
  const pokemonHeight = document.createElement("ul");
  pokemonHeight.textContent = `Height: ${data.height} in`;
  pokemonListStats.appendChild(pokemonHeight);

  // creates <ul> for pokemon weight
  const pokemonWeight = document.createElement("ul");
  pokemonWeight.textContent = `Weight: ${data.weight} lb`;
  pokemonListStats.appendChild(pokemonWeight);

  // creates <ul> for pokemon abilities
  const pokemonAbilities = document.createElement("ul");
  pokemonAbilities.textContent = `Abilities:${data.abilities.map(
    (ability) => ` ${ability}`
  )}`;
  pokemonListStats.appendChild(pokemonAbilities);

  // appends pokemonListStats to the div
  div.appendChild(pokemonListStats);

  // creates <audio> for pokemon cries
  const pokemonAudio = document.createElement("audio");
  pokemonAudio.id = "audio-play-button";
  pokemonAudio.src = data.cries;
  pokemonAudio.controls = true;

  const handlePlay = () => {};

  pokemonAudio.addEventListener("play", handlePlay);
  div.appendChild(pokemonAudio);

  dialog.appendChild(div);
  document.body.appendChild(dialog);
};

export const showPokemonDetails = () => {
  const showDialog = document.querySelector("#dialog-id");
  showDialog.showModal();
};

export const hidePokemonDetails = () => {
  const dialog = document.querySelector("#dialog-id");
  dialog.close();
  dialog.remove();
};
