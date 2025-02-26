var myTimer = null;
var time = 0;

function updateTimer() {
  time++;
  document.getElementById("timer").innerHTML = time; //displays time
}

function startTimer() {
  if (!myTimer) {
    // Prevent multiple intervals
    myTimer = setInterval(updateTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(myTimer); //stops timer
  myTimer = null;
}

window.onload = function () {
  document.getElementById("timer").innerHTML = time; // Ensures initial display
};
