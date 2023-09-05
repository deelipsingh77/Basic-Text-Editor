const editorContainer = document.getElementById('editor-container');
const saveButton = document.getElementById('save-button');
const formatButtons = document.querySelectorAll('.format-button');
const fontSizeDropdown = document.getElementById('font-size-dropdown');
const fontFamilyDropdown = document.getElementById('font-family-dropdown');
const fontColorPicker = document.getElementById('font-color-picker');

// Function to apply formatting to selected text and refocus on the editor
function applyFormatAndFocus(command, value = null) {
    editorContainer.focus(); // Refocus on the editor container
    document.execCommand(command, false, value);
    updateButtonStates(); // Update button states
}

// Function to toggle formatting for bold, italic, underline, and strikethrough
function toggleFormat(command) {
    document.execCommand(command, false, null);
    editorContainer.focus(); // Refocus on the editor container
    updateButtonStates(); // Update button states
}

// Function to toggle formatting for unordered and ordered lists
function toggleList(command) {
    document.execCommand(command, false, null);
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

// Prevent the default behavior for certain buttons
formatButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const command = button.getAttribute('data-command');
        if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
            toggleList(command);
        } else if (command === 'fontSize') {
            const fontSize = button.getAttribute('data-value');
            setFontSize(fontSize);
        } else {
            toggleFormat(command);
        }
        e.preventDefault();
    });
});

// Add event listener to the save button
saveButton.addEventListener('click', () => {
    const content = editorContainer.innerHTML;
    // You can implement code here to save the content to a server or perform other actions.
    alert('Content saved successfully.');
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
