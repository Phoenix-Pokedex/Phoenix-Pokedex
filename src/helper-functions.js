const format = (name) => {
  const arr = name.split(" ");
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1);
  }
  return arr.join(" ");
};

const noResults = () => {
  const pokemonUl = document.querySelector("#pokemon-list");
  const li = document.createElement("li");
  const text = document.createTextNode("Pokemon does not exist");

  li.append(text);
  pokemonUl.append(li);
};

export { format, noResults };
