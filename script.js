const modeSwitch = document.getElementById('mode-switch');
const body = document.body;
const monImage = document.querySelector('.mon-image');
const ballImage = document.querySelector('.ball-image');

let monImageFolder;
let monIdentifier = "1";
let ballIdentifier = "poke";

const monOptions = ["1", "2", "3", "3-m", "25", "25-m", "26", "26-m", "10100"];
const ballOptions = ["poke", "great", "ultra", "master", "safari"];

const monInput = document.getElementById("mon-input");
const ballInput = document.getElementById("ball-input");
const monDatalist = document.getElementById("mon-options");
const ballDatalist = document.getElementById("ball-options");

// Function to populate a datalist with options
function populateDatalist(datalist, options) {
  datalist.innerHTML = "";
  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    datalist.appendChild(optionElement);
  });
}
  
// Initial population of datalists
populateDatalist(monDatalist, monOptions);
populateDatalist(ballDatalist, ballOptions);
  
// Event listener for the filter inputs
monInput.addEventListener("input", function () {
  const searchTerm = this.value;
  monIdentifier = searchTerm;
  updateMonImage();
});
  
ballInput.addEventListener("input", function () {
  const searchTerm = this.value;
  ballIdentifier = searchTerm;
  updateBallImage();
});

// Event listener to clear input fields when they are clicked
monInput.addEventListener("focus", function () {
    this.value = ""; // Clear the input field
  });
  
  ballInput.addEventListener("focus", function () {
    this.value = ""; // Clear the input field
  });

// Function to update the mon-image src
function updateMonImage() {
    const monImagePath = monImageFolder + "/" + monIdentifier + ".png";
    // Check if the image file exists, if not, use the previous one
    const img = new Image();
    img.src = monImagePath;
    img.onload = function() {
      monImage.src = monImagePath;
    };
    img.onerror = function() {
      // Use the previous image source
      monImage.src = monImageFolder + "/" + monImage.src.split("/").pop();
    };
}

// Function to update the ball-image src
function updateBallImage () {
    const ballImagePath = "images/ball/" + ballIdentifier + ".png";
    // Check if the image file exists, if not, use the previous one
    const img = new Image();
    img.src = ballImagePath;
    img.onload = function() {
      ballImage.src = ballImagePath;
    };
    img.onerror = function() {
      // Use the previous image source
      ballImage.src = "images/ball/" + ballImage.src.split("/").pop();
    };
}

// Initialize the monImageFolder based on the initial switch state
monImageFolder = modeSwitch.checked ? "images/mon-shiny" : "images/mon";
  
// Initialize the images src
updateMonImage();
updateBallImage();
    
modeSwitch.addEventListener('change', function() {
    if (this.checked) {
        // Switch is ON (shiny mode)
        body.style.backgroundColor = 'var(--black-color)';
        body.style.color = 'var(--white-color)';
        monImageFolder = "images/mon-shiny";
    } else {
        // Switch is OFF (normal mode)
        body.style.backgroundColor = 'var(--white-color)';
        body.style.color = 'var(--black-color)';
        monImageFolder = "images/mon";
    }
    
    // Update the mon-image src based on the mode switch state
    updateMonImage();
});    