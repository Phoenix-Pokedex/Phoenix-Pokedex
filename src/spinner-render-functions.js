const spinner = document.getElementById("loading-overlay");

const showSpinner = () => {
  spinner.style.animation = "appear 0.2s";
  spinner.style.display = "flex";
};

const hideSpinner = () => {
  spinner.style.animation = "vanish 0.3s";
  spinner.style.display = "none";
};

export { showSpinner, hideSpinner };
