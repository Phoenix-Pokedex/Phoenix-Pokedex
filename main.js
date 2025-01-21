import { renderMystery, renderOptions } from "./src/game-render-functions";
import { getRandomPokemon } from "./src/fetch-functions";
import { checkWin } from "./src/game-logic-functions";

const main = async () => {
  const modal = document.getElementById("guess-pokemon-modal");
  const openDialog = document.getElementById("dialog-open-button");
  const closeDialog = document.getElementById("dialog-close-button");
  const optionsDiv = document.getElementById("options-list");

  const sampleData = await getRandomPokemon();

  renderMystery(modal, sampleData);
  renderOptions(optionsDiv, sampleData);

  openDialog.addEventListener("click", () => {
    modal.showModal();
  });

  closeDialog.addEventListener("click", () => {
    modal.close();
  });

  optionsDiv.addEventListener("click", (event) => {
    const guessId = Number(event.target.id);
    if (guessId) {
      checkWin(guessId, sampleData.id);
    }
  });
};

main();
