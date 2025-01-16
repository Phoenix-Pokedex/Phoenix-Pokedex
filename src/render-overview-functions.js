const renderOverview = (overviewDiv, pokemonInformation) => {
  const name = document.createElement("h2");
  name.textContent = pokemonInformation.name;
  const img = document.createElement("img");
  img.src = pokemonInformation.img;
  const type = document.createElement("p");
  type.textContent = pokemonInformation.type;
  const learnMore = document.createElement("button");
  learnMore.textContent = "Learn More";

  overviewDiv.append(img, name, type, learnMore);
};

export { renderOverview };
