import { renderGame } from "./src/game-render-functions";

const main = async () => {
  const gameDialog = document.getElementById("game-dialog");
  const openDialogButton = document.getElementById("dialog-open-button");
  const closeDialogButton = document.getElementById("dialog-close-button");

  openDialogButton.addEventListener("click", () => {
    document.getElementById("game-content").innerHTML = "";
    gameDialog.showModal();
    renderGame();
  });

  closeDialogButton.addEventListener("click", () => {
    gameDialog.close();
  });
};

main();
