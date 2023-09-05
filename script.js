// Get elements from the DOM
const editorContainer = document.getElementById('editor-container');
const saveButton = document.getElementById('save-button');
const formatButtons = document.querySelectorAll('.format-button'); // Select all formatting buttons
const fontSizeDropdown = document.getElementById('font-size-dropdown');
const fontFamilyDropdown = document.getElementById('font-family-dropdown');
const fontColorPicker = document.getElementById('font-color-picker'); // Font Color Picker Element

// Function to apply formatting to selected text and refocus on the editor
function applyFormatAndFocus(command, value = null) {
    document.execCommand(command, false, value);
    editorContainer.focus(); // Refocus on the editor container
    updateButtonStates(); // Update button states
}

// Function to check and update button states for all formatting buttons
function updateButtonStates() {
    formatButtons.forEach(button => {
        const command = button.getAttribute('data-command');
        const isActive = document.queryCommandState(command);
        button.classList.toggle('active', isActive);
    });
}

// Function to change font size
function changeFontSize() {
    const selectedSize = fontSizeDropdown.value;
    applyFormatAndFocus('fontSize', selectedSize);
}

// Function to change font family
function changeFontFamily() {
    const selectedFont = fontFamilyDropdown.value;
    applyFormatAndFocus('fontName', selectedFont);
}

// Function to change font color
function changeFontColor() {
    const selectedColor = fontColorPicker.value;
    applyFormatAndFocus('foreColor', selectedColor);
}

// Add event listener to the save button
saveButton.addEventListener('click', () => {
    const content = editorContainer.innerHTML;
    // You can implement code here to save the content to a server or perform other actions.
    alert('Content saved successfully.');
});

// Add event listeners for formatting buttons
formatButtons.forEach(button => {
    button.addEventListener('click', () => {
        const command = button.getAttribute('data-command');
        applyFormatAndFocus(command);
    });
});

// Event listeners for font size, font family, and font color
fontSizeDropdown.addEventListener('change', changeFontSize);
fontFamilyDropdown.addEventListener('change', changeFontFamily);
fontColorPicker.addEventListener('input', changeFontColor);

// Check and update button states when the editor is clicked or the cursor moves
editorContainer.addEventListener('click', updateButtonStates);
editorContainer.addEventListener('keyup', updateButtonStates);
editorContainer.addEventListener('mouseup', updateButtonStates);

// Initial update of button states
updateButtonStates();
