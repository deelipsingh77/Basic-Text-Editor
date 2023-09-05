const editorContainer = document.getElementById('editor-container');
const formatButtons = document.querySelectorAll('.format-button');
const fontSizeDropdown = document.getElementById('font-size-dropdown');
const fontFamilyDropdown = document.getElementById('font-family-dropdown');
const fontColorPicker = document.getElementById('font-color-picker');
const saveButton = document.getElementById('save-button');

// Function to toggle formatting for bold, italic, underline, and strikethrough
function toggleFormat(command) {
    editorContainer.focus(); // Refocus on the editor container
    if (command === 'fontSize') {
        const fontSize = fontSizeDropdown.value;
        document.execCommand(command, false, fontSize);
    } else {
        document.execCommand(command, false, null);
    }
    updateButtonStates(); // Update button states
}

// Function to check and update button states for all formatting buttons
function updateButtonStates() {
    formatButtons.forEach(button => {
        const command = button.getAttribute('data-command');
        const isActive = document.queryCommandState(command);
        button.classList.toggle('bg-blue-500', isActive); // Highlight active buttons
        button.classList.toggle('text-white', isActive); // Make text white for active buttons
    });
}

// Function to set font family to selected text
function setFontFamily(fontFamily) {
    document.execCommand('fontName', false, fontFamily);
    editorContainer.focus(); // Refocus on the editor container
    updateButtonStates(); // Update button states
}

// Function to toggle formatting for uppercase
function toggleCase(command) {
    const selection = window.getSelection();
    if (selection) {
        const selectedText = selection.toString();
        if (selectedText) {
            const transformedText = command === 'uppercase' ? selectedText.toUpperCase() : selectedText.toLowerCase();
            document.execCommand('insertText', false, transformedText);
        }
    }
    editorContainer.focus(); // Refocus on the editor container
    updateButtonStates(); // Update button states
}

// Prevent the default behavior for certain buttons
formatButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const command = button.getAttribute('data-command');
        if (command === 'uppercase') {
            toggleCase(command)
        } else if (command === 'lowercase') {
            toggleCase(command)
        } else if (command === 'fontSize') {
            // Font size is handled in the toggleFormat function
            toggleFormat(command);
        } else if (command === 'fontName') {
            const fontFamily = button.getAttribute('data-value');
            setFontFamily(fontFamily);
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
    toggleFormat('fontSize'); // Handle font size when dropdown changes
});

// Add event listener to the font family dropdown
fontFamilyDropdown.addEventListener('change', () => {
    const fontFamily = fontFamilyDropdown.value;
    setFontFamily(fontFamily);
});

// Add event listener to the font color picker
fontColorPicker.addEventListener('change', () => {
    const fontColor = fontColorPicker.value;
    document.execCommand('foreColor', false, fontColor);
    editorContainer.focus(); // Refocus on the editor container
    updateButtonStates(); // Update button states
});
