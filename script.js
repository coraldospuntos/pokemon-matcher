const modeSwitch = document.getElementById('mode-switch');
const body = document.body;
const monImage = document.querySelector('.mon-image');
const ballImage = document.querySelector('.ball-image');

let monImageFolder;
let monIdentifier = "1";
let ballIdentifier = "poke";
let monOptions = [];
let ballOptions = [];
const monInput = document.getElementById("mon-input");
const ballInput = document.getElementById("ball-input");
const monDatalist = document.getElementById("mon-options");
const ballDatalist = document.getElementById("ball-options");

// Create mappings for user-friendly names to identifiers
const monNameToIdentifier = {};
const ballNameToIdentifier = {};

async function fetchAndParseCSV(filename, nameToIdentifierMap) {
  try {
    const response = await fetch(`data/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}`);
    }

    const csvData = await response.text();
    const rows = csvData.split("\n");

    // Extract data from CSV (assuming the first column contains names and the second column contains identifiers)
    const options = rows
      .slice(1) // Excludes 1st row
      .map(row => {
        const [name, identifier] = row.split(";");
        const trimmedName = name.trim();
        const trimmedIdentifier = identifier.trim();
        nameToIdentifierMap[trimmedName] = trimmedIdentifier;
        return trimmedName;
      });

    return options;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function loadOptions() {
  monOptions = await fetchAndParseCSV("mon-data.csv", monNameToIdentifier);
  ballOptions = await fetchAndParseCSV("ball-data.csv", ballNameToIdentifier);

  // Use the loaded options
  console.log("monOptions:", monOptions);
  console.log("ballOptions:", ballOptions);

  // Populate datalists with options
  populateDatalist(monDatalist, monOptions);
  populateDatalist(ballDatalist, ballOptions);

  // Initialize the monImageFolder based on the initial switch state
  monImageFolder = modeSwitch.checked ? "images/mon-shiny" : "images/mon";

  // Initialize the images src
  updateMonImage();
  updateBallImage();
}

loadOptions();

function populateDatalist(datalist, options) {
  datalist.innerHTML = "";
  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    datalist.appendChild(optionElement);
  });
}

monInput.addEventListener("input", function () {
  const searchTerm = this.value;
  if (monNameToIdentifier[searchTerm]) {
    monIdentifier = monNameToIdentifier[searchTerm];
    updateMonImage();
  }
});

ballInput.addEventListener("input", function () {
  const searchTerm = this.value;
  if (ballNameToIdentifier[searchTerm]) {
    ballIdentifier = ballNameToIdentifier[searchTerm];
    updateBallImage();
  }
});

monDatalist.addEventListener("change", function () {
  const selectedOption = this.value;
  if (monNameToIdentifier[selectedOption]) {
    monIdentifier = monNameToIdentifier[selectedOption];
    updateMonImage();
  }
});

ballDatalist.addEventListener("change", function () {
  const selectedOption = this.value;
  if (ballNameToIdentifier[selectedOption]) {
    ballIdentifier = ballNameToIdentifier[selectedOption];
    updateBallImage();
  }
});

// Event listener to clear input fields when they are clicked
monInput.addEventListener("focus", function () {
  this.value = ""; // Clear the input field
});
  
ballInput.addEventListener("focus", function () {
  this.value = ""; // Clear the input field
});

function updateMonImage() {
  const monImagePath = monImageFolder + "/" + monIdentifier + ".png";
  const img = new Image();
  img.src = monImagePath;
  img.onload = function () {
    monImage.src = monImagePath;
  };
  img.onerror = function () {
    // Use the previous image source
    monImage.src = monImageFolder + "/" + monIdentifier + ".png";
  };
}

function updateBallImage() {
  const ballImagePath = "images/ball/" + ballIdentifier + ".png";
  const img = new Image();
  img.src = ballImagePath;
  img.onload = function () {
    ballImage.src = ballImagePath;
  };
  img.onerror = function () {
    // Use the previous image source
    ballImage.src = "images/ball/" + ballIdentifier + ".png";
  };
}

monImageFolder = modeSwitch.checked ? "images/mon-shiny" : "images/mon";

updateMonImage();
updateBallImage();

modeSwitch.addEventListener('change', function () {
  if (this.checked) {
    body.style.backgroundColor = 'var(--black-color)';
    body.style.color = 'var(--white-color)';
    monImageFolder = "images/mon-shiny";
  } else {
    body.style.backgroundColor = 'var(--white-color)';
    body.style.color = 'var(--black-color)';
    monImageFolder = "images/mon";
  }

  updateMonImage();
});
