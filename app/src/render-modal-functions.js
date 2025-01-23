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

  // creates the <img> tag
  const img = document.createElement("img");
  img.id = "single-pokemon-image";
  img.src = data.img;
  img.alt = `An image of the ${data.name} Pokemon`;
  div.appendChild(img);

  // creates <h2> element that will store pokemon name
  const pokemonItem = document.createElement("h2");
  pokemonItem.id = "pokemon-name";
  pokemonItem.textContent = `${data.name}`;
  div.appendChild(pokemonItem);

  // creates the <li> tag that will hold <ul> of the Pokemon stats
  const pokemonListStats = document.createElement("ul");
  pokemonListStats.id = "pokemon-stats";

  // function that converts decimeters to inches
  const decimetersToInches = (dm) => {
    const inchesPerDecimeter = 3.937;
    return dm * inchesPerDecimeter;
  };

  // creates <ul> for pokemon height
  const pokemonHeight = document.createElement("li");
  pokemonHeight.id = "pokemon-height";
  const dm = data.height;
  const inches = decimetersToInches(dm);
  const roundedInches = Math.round(inches);
  pokemonHeight.textContent = `Height: ${roundedInches} in`;
  pokemonListStats.appendChild(pokemonHeight);

  // function that converts hectograms to pounds
  const hectogramsToPounds = (hg) => {
    const poundsPerHectogram = 0.2204622622;
    return hg * poundsPerHectogram;
  };

  // creates <ul> for pokemon weight
  const pokemonWeight = document.createElement("li");
  pokemonWeight.id = "pokemon-weight";
  const hg = data.weight;
  const pounds = hectogramsToPounds(hg);
  const roundedPounds = Math.round(pounds);
  pokemonWeight.textContent = `Weight: ${roundedPounds} lb`;
  pokemonListStats.appendChild(pokemonWeight);

  // creates <ul> for pokemon abilities
  const pokemonAbilities = document.createElement("li");
  pokemonAbilities.id = "pokemon-abilities";
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

  // creates the button element to click and play the audio
  const pokemonCryButton = document.createElement("button");
  pokemonCryButton.id = "cry-button";
  pokemonCryButton.textContent = "Play Cry!";

  pokemonCryButton.addEventListener("click", () => {
    pokemonAudio.play();
  });

  div.appendChild(pokemonAudio);
  div.appendChild(pokemonCryButton);

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
