var myTimer = null; //for setInterval
var time = 1500; //time of timer
var isRunning = false; //is timer started or stopped
const emptyMug = "public/images/pixil-cup-empty.png";
const fullMug = "public/images/pixil-cup-full.png";
let mugInterval = null;

function updateCoffeeCup() {
  const coffeeCup = document.getElementById("coffee-cup");

  let isFilling = false; // Track state

  // Clear any existing interval
  if (mugInterval) {
    clearInterval(mugInterval);
  }

  // Switch images every 2 seconds if the timer is running
  if (isRunning) {
    mugInterval = setInterval(() => {
      isFilling = !isFilling; // Toggle state
      coffeeCup.src = isFilling ? fullMug : emptyMug;
    }, 1000);
  } else {
    coffeeCup.src = emptyMug;
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

//updates time
function updateTimer() {
  if (time > 0) {
    time--;
    generateTime();
  } else {
    stopTimer();
  }
}

//starts timer
function startTimer(interval = 1000) {
  if (!isRunning) {
    isRunning = true;
    myTimer = setInterval(updateTimer, interval);
    updateCoffeeCup();
  }
}

//stops timer
function stopTimer() {
  clearInterval(myTimer);
  isRunning = false;
  updateCoffeeCup();
  alert("Time is up!");
}

//resets timer - not sure if will use
function resetTimer() {
  stopTimer();
  time = 1500; //25 minutes
  generateTime();
}

//load on page
window.onload = function () {
  generateTime();
  updateCoffeeCup();
};
