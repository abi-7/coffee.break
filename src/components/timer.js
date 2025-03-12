var myTimer = null; //for setInterval
var time = 1500; //time of timer
var isRunning = false; //is timer started or stopped
const emptyMug = "public/images/pixil-cup-empty.png";
const fullMug = "public/images/pixil-cup-full.png";
let mugInterval = null;
const coffeeBeanFull = "public/images/pixil-coffee-bean-full.png";
const coffeeBeanEmpty = "public/images/pixil-coffee-bean-empty.png";

function updateCoffeeCup() {
  const coffeeCup = document.getElementById("coffee-cup");

  let isFilling = false; // Track state

  //clear any existing interval
  if (mugInterval) {
    clearInterval(mugInterval);
  }

  //switch between empty and full images while timer is running
  if (isRunning) {
    mugInterval = setInterval(() => {
      isFilling = !isFilling; // Toggle state
      coffeeCup.src = isFilling ? fullMug : emptyMug;
    }, 500);
  } else {
    coffeeCup.src = emptyMug;
  }
}

//fills up empty coffee beans as timer goes on
function updateProgress() {
  const progressContainer = document.getElementById("progress-container");

  //clear any existing beans
  progressContainer.innerHTML = "";

  const totalBeans = 5;

  const elapsed = 1500 - time; // Time that has passed
  const beansToFill = Math.floor((elapsed / 1500) * totalBeans);

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

//updates time
function updateTimer() {
  if (time > 0) {
    time--;
    generateTime();
    updateProgress();
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
  updateProgress();
};
