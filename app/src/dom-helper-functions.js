const format = (name) => {
  const arr = name.split(" ");

  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1);
  }
  return arr.join(" ");
};

const typeGallery = (pokemonType) => {
  const imageUrl = new URL(
    `../assets/types/${pokemonType}.png`,
    import.meta.url
  ).href;
  return imageUrl;
};

const notFoundMessage = (listUl) => {
  const li = document.createElement("li");
  const message = document.createTextNode("Pokemon not found");
  li.append(message);
  listUl.append(li);
};

const longerMessageRequired = (listUl) => {
  const li = document.createElement("li");
  const message = document.createTextNode("Please type a longer query");
  li.append(message);
  listUl.append(li);
};

export { typeGallery, format, notFoundMessage, longerMessageRequired };
