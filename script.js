const modeSwitch = document.getElementById('mode-switch');
const body = document.body;
const monImage = document.querySelector('.mon-image');
const ballImage = document.querySelector('.ball-image');

let monImageFolder;
let monIdentifier = "1";
let ballIdentifier = "poke";
let monOptions = []; // Declare at the top level
let ballOptions = []; // Declare at the top level

const monInput = document.getElementById("mon-input");
const ballInput = document.getElementById("ball-input");
const monDatalist = document.getElementById("mon-options");
const ballDatalist = document.getElementById("ball-options");

async function fetchAndParseCSV(filename) {
    try {
      const response = await fetch(`data/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}`);
      }
  
      const csvData = await response.text();
      const rows = csvData.split("\n");
  
      // Extract data from CSV (assuming the second column contains the options)
      const options = rows
        .map(row => row.split(";")[0].trim()) // Swap to [0] for Name column
        .filter(option => option !== "Identifier"); // Remove the header row
  
      return options;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
// Load and parse monOptions and ballOptions
async function loadOptions() {
  monOptions = await fetchAndParseCSV("mon-data.csv");
  ballOptions = await fetchAndParseCSV("ball-data.csv");
  
  // Use the loaded options
  console.log("monOptions:", monOptions);
  console.log("ballOptions:", ballOptions);
  
  // Populate datalists with options (you can call populateDatalist here)
  populateDatalist(monDatalist, monOptions);
  populateDatalist(ballDatalist, ballOptions);

  // Initialize the monImageFolder based on the initial switch state
  monImageFolder = modeSwitch.checked ? "images/mon-shiny" : "images/mon";
  
  // Initialize the images src
  updateMonImage();
  updateBallImage();
}

// Call loadOptions to load the CSV data and populate datalists
loadOptions();

// Function to populate a datalist with options
function populateDatalist(datalist, options) {
  datalist.innerHTML = "";
  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    datalist.appendChild(optionElement);
  });
}
  
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

// Event listener for the datalists
monDatalist.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    if (selectedOption) {
      monIdentifier = selectedOption.value;
      updateMonImage();
    }
  });
  
  ballDatalist.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    if (selectedOption) {
      ballIdentifier = selectedOption.value;
      updateBallImage();
    }
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
