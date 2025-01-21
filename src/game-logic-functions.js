export const checkWin = (idGuess, correctId) => {
  console.log(idGuess, correctId);
  const div = document.getElementById("win-status");
  const text = document.createElement("p");
  if (idGuess === correctId) {
    text.textContent = "Congrats";
  } else {
    text.textContent = "Sorry";
  }
  div.append(text);
};
