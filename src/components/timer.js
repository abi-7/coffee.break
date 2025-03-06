var myTimer = null; //for setInterval
var time = 1500; //time of timer
var isRunning = false; //is timer started or stopped

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
    isRunning = true; // Timer is running
    // Prevent multiple intervals
    myTimer = setInterval(updateTimer, interval);
  }
}

//stops timer
function stopTimer() {
  clearInterval(myTimer);
  isRunning = false;
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
};
