const modeSwitch = document.getElementById('mode-switch');
const body = document.body;

modeSwitch.addEventListener('change', function() {
    if (this.checked) {
        // Switch is ON (shiny mode)
        body.style.backgroundColor = '#121212'; // Change background color for shiny mode
        document.querySelector('.mode-label').textContent = 'Shiny';
        } else {
        // Switch is OFF (normal mode)
        body.style.backgroundColor = '#f0f0f0'; // Change background color for normal mode
        document.querySelector('.mode-label').textContent = 'Normal';
        }
    });
