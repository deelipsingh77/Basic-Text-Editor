const editorContainer = document.getElementById('editor-container');
const saveButton = document.getElementById('save-button');
const formatButtons = document.querySelectorAll('.format-button');
const fontSizeDropdown = document.getElementById('font-size-dropdown');
const fontFamilyDropdown = document.getElementById('font-family-dropdown');
const fontColorPicker = document.getElementById('font-color-picker');

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

// Function to set font size to selected text
function setFontSize(fontSize) {
    document.execCommand('fontSize', false, fontSize);
    editorContainer.focus(); // Refocus on the editor container
    updateButtonStates(); // Update button states
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

// Add event listener to the font size dropdown
fontSizeDropdown.addEventListener('change', () => {
    const fontSize = fontSizeDropdown.value;
    setFontSize(fontSize);
});

fontFamilyDropdown.addEventListener('change', () => {
    const fontFamily = fontFamilyDropdown.value;
    applyFormatAndFocus('fontName', fontFamily);
});

fontColorPicker.addEventListener('change', () => {
    const fontColor = fontColorPicker.value;
    applyFormatAndFocus('foreColor', fontColor);
});

// Highlight the "Align Left" button by default
const alignLeftButton = document.querySelector('.format-button[data-command="justifyLeft"]');
alignLeftButton.classList.add('active');
