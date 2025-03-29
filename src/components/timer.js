var myTimer = null; //for setInterval
var time = 1500; //time of timer
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
var isBreak = false; //tracks if the timer is in a break state

/* Updates coffee cup images based on if timer is running or not running */
function updateCoffeeCup() {
  const coffeeCup = document.getElementById("coffee-cup");
  const breakAnimation = document.getElementById("break-animation");
  const breakText = document.getElementById("break-text");
  //show coffee cup
  coffeeCup.style.display = "block";
  // Hide break animation
  breakAnimation.style.display = "none";
  // Hide break text
  breakText.style.display = "none";

  let isFilling = false;

  //clear any existing interval
  if (mugInterval) {
    clearInterval(mugInterval);
  }

  //switch between empty and full images while timer is running
  if (isRunning) {
    mugInterval = setInterval(() => {
      isFilling = !isFilling;
      coffeeCup.src = isFilling ? fullMug : emptyMug;
    }, 500);
  } else {
    coffeeCup.src = emptyMug;
  }
}

/* Fills up empty coffee means in progress bar as timer goes on */
function updateProgress() {
  if (isBreak) return; //dont update progress if on break
  const progressContainer = document.getElementById("progress-container");
  //show progress bar
  progressContainer.style.display = "flex";
  //clear any existing beans
  progressContainer.innerHTML = "";

  const totalBeans = 5;
  const intervalPerBean = time / totalBeans; // Time interval for each bean to fill
  const elapsed = time; // Remaining time
  const beansToFill = Math.floor((time - elapsed) / intervalPerBean); // Calculate beans to fill

  //display row of empty coffee beans
  for (let i = 0; i < totalBeans; i++) {
    const coffeeBean = document.createElement("img");
    coffeeBean.src = i < beansToFill ? coffeeBeanFull : coffeeBeanEmpty;
    coffeeBean.alt = "Empty Coffee Bean";
    coffeeBean.classList.add("coffee-bean");
    progressContainer.appendChild(coffeeBean);
  }
}

/* Generates the time basedon deafult or chosen time period  */
function generateTime() {
  var second = time % 60;
  var minute = Math.floor(time / 60) % 60;

  document.querySelector(".second").textContent =
    second < 10 ? "0" + second : second;
  document.querySelector(".minute").textContent =
    minute < 10 ? "0" + minute : minute;
}

/* When timer ends and its time for coffee break this 
functionality will run  */
function coffeeBreak() {
  isBreak = true;
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
  breakAnimation.style.display = "block";

  //show break-text when break starts
  const breakText = document.getElementById("break-text");
  breakText.style.display = "block";

  // Hide the break animation after 5 minutes
  setTimeout(() => {
    breakAnimation.style.display = "none";
    breakText.style.display = "none";
  }, 300000); //5 min
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
    alert("Time for a coffee break!");
    coffeeBreak();
    //when 5 min break is over, reset timer
    setTimeout(() => {
      isBreak = false;
      alert("Coffee break is done! Time to get back to work :)");
      time = 1500; //25 min
      generateTime();
      updateCoffeeCup();
      updateProgress();
      startTimer();
    }, 300000); //5 min
  }
}

//starts timer
function startTimer(interval = 1000) {
  if (!isRunning) {
    isRunning = true;
    myTimer = setInterval(updateTimer, interval);
    updateCoffeeCup();
    updateProgress();
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
  updateProgress();

  const steamElements = document.querySelectorAll(".steam");
  steamElements.forEach((steam) => {
    steam.classList.remove("steam-active");
  });

  audio.pause(); //pause audio
}

//resets timer
function resetTimer() {
  stopTimer();
  time = 1500; //25 minutes
  generateTime();
  updateCoffeeCup();
  updateProgress();
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function changeColor(color) {
  document.body.style.backgroundColor = color;

  // Select the button(s) and change their background color
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.backgroundColor = color;
  });
}

function changeTime(newTime) {
  time = newTime;
  generateTime();
  stopTimer();

  const progressContainer = document.getElementById("progress-container");
  progressContainer.innerHTML = ""; // Clear any existing beans
  updateProgress();
}

function openColorModal() {
  const modal = document.getElementById("colorModal");
  modal.style.display = "block";
}

function closeColorModal() {
  const modal = document.getElementById("colorModal");
  modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
  const modal = document.getElementById("colorModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function openTimeModal() {
  const modal = document.getElementById("timeModal");
  modal.style.display = "block";
}

function closeTimeModal() {
  const modal = document.getElementById("timeModal");
  modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
  const modal = document.getElementById("timeModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropDownMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

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
