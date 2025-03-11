const path = require("path"); // Add this line to require the 'path' module

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }

  // Dynamically set the coffee cup image source
  const coffeeCup = document.getElementById("coffee-cup");
  if (coffeeCup) {
    coffeeCup.src = `file://${path.join(
      __dirname,
      "public/images/pixil-cup-empty.png"
    )}`;
    console.log("Image path set to:", coffeeCup.src); // Debugging
  }
});
