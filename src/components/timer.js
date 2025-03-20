var myTimer = null; //for setInterval
var time = 120; //time of timer
var isRunning = false; //is timer started or stopped
const emptyMug = "public/images/pixil-cup-empty.png";
const fullMug = "public/images/pixil-cup-full.png";
let mugInterval = null;
const coffeeBeanFull = "public/images/pixil-coffee-bean-full.png";
const coffeeBeanEmpty = "public/images/pixil-coffee-bean-empty.png";
const audio = document.getElementById("audioPlayer");
const muteBtn = document.getElementById("muteBtn");
audio.loop = true; //audio loops continuously
const catGif = "public/images/cat-cute.gif";

function updateCoffeeCup() {
  const coffeeCup = document.getElementById("coffee-cup");
  const breakAnimation = document.getElementById("break-animation"); // Define breakAnimation
  //show coffee cup
  coffeeCup.style.display = "block";
  // Hide break animation
  breakAnimation.style.display = "none";

  let isFilling = false;

  // Clear any existing interval
  if (mugInterval) {
    clearInterval(mugInterval);
  }

  // Switch between empty and full images while timer is running
  if (isRunning) {
    mugInterval = setInterval(() => {
      isFilling = !isFilling;
      coffeeCup.src = isFilling ? fullMug : emptyMug;
    }, 500);
  } else {
    coffeeCup.src = emptyMug;
  }
}

//fills up empty coffee beans as timer goes on
function updateProgress() {
  const progressContainer = document.getElementById("progress-container");
  //show progress bar
  progressContainer.style.display = "flex";
  //clear any existing beans
  progressContainer.innerHTML = "";

  const totalBeans = 5;

  const totalDuration = totalBeans * 5 * 60;
  const elapsed = totalDuration - time; //time that has passed
  const beansToFill = Math.floor(elapsed / (5 * 60));

  //display row of empty coffee beans
  for (let i = 0; i < totalBeans; i++) {
    const coffeeBean = document.createElement("img");
    //coffeeBean.src = coffeeBeanEmpty;
    coffeeBean.src = i < beansToFill ? coffeeBeanFull : coffeeBeanEmpty;
    coffeeBean.alt = "Empty Coffee Bean";
    coffeeBean.classList.add("coffee-bean");
    progressContainer.appendChild(coffeeBean);
  }
}

function generateTime() {
  var second = time % 60;
  var minute = Math.floor(time / 60) % 60;

  document.querySelector(".second").textContent =
    second < 10 ? "0" + second : second;
  document.querySelector(".minute").textContent =
    minute < 10 ? "0" + minute : minute;
}

function coffeeBreak() {
  const coffeeCup = document.getElementById("coffee-cup"); // Define coffeeCup
  const breakAnimation = document.getElementById("break-animation");
  const steamElements = document.querySelectorAll(".steam");
  steamElements.forEach((steam) => {
    steam.classList.remove("steam-active");
  });
  // Hide coffee cup
  coffeeCup.style.display = "none";

  //hide progress bar
  const progressContainer = document.getElementById("progress-container");
  progressContainer.style.display = "none";

  // Show cat-cute.gif animation
  breakAnimation.src = catGif;
  breakAnimation.style.display = "block"; // Ensure the animation is visible
}

//updates time
function updateTimer() {
  if (time > 0) {
    time--;
    generateTime();
    updateProgress();
  } else {
    //time = 0, start coffee break timer
    time = 300; //5 min
    generateTime();
    //alert("Time for a coffee break!");
    coffeeBreak();
  }
}

//starts timer
function startTimer(interval = 1000) {
  if (!isRunning) {
    isRunning = true;
    myTimer = setInterval(updateTimer, interval);
    updateCoffeeCup();
  }

  const steamElements = document.querySelectorAll(".steam");
  steamElements.forEach((steam) => {
    steam.classList.add("steam-active");
  });

  audio.play(); //autoplay audio
}

//stops timer
function stopTimer() {
  clearInterval(myTimer);
  isRunning = false;
  updateCoffeeCup();

  const steamElements = document.querySelectorAll(".steam");
  steamElements.forEach((steam) => {
    steam.classList.remove("steam-active");
  });

  audio.pause(); //pause audio
}

//resets timer - not sure if will use
function resetTimer() {
  stopTimer();
  time = 1500; //25 minutes
  generateTime();
}

//on load
window.onload = function () {
  generateTime();
  updateCoffeeCup();
  updateProgress();

  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔊" : "🔇";
  });
};
