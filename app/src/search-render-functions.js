import { format, noResults } from "./helper-functions";

export const setList = (resultsUl, results) => {
  for (const pokemon of results) {
    const li = document.createElement("li");
    li.setAttribute("pokemon-id", pokemon.id);
    const p = document.createElement("p");
    p.textContent = format(pokemon.name);
    const img = document.createElement("img");
    img.src = pokemon.img;
    img.style.height = "40px";
    img.style.width = "40px";
    li.append(img, p);
    resultsUl.append(li);
  }

  if (results.length === 0) noResults();
};
