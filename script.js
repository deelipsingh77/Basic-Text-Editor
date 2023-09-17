const editorContainer = document.getElementById('editor-container');
const formatButtons = document.querySelectorAll('.format-button');
const fontSizeDropdown = document.getElementById('font-size-dropdown');
const fontFamilyDropdown = document.getElementById('font-family-dropdown');
const fontColorPicker = document.getElementById('font-color-picker');
const saveButton = document.getElementById('save-button');

function toggleFormat(command) {
    editorContainer.focus();
    if (command === 'fontSize') {
        const fontSize = fontSizeDropdown.value;
        document.execCommand(command, false, fontSize);
    } else {
        document.execCommand(command, false, null);
    }
    updateButtonStates();
}

function updateButtonStates() {
    formatButtons.forEach(button => {
        const command = button.getAttribute('data-command');
        const isActive = document.queryCommandState(command);
        button.classList.toggle('bg-blue-500', isActive);
        button.classList.toggle('text-white', isActive);
    });
}

function setFontFamily(fontFamily) {
    document.execCommand('fontName', false, fontFamily);
    editorContainer.focus();
    updateButtonStates();
}

function toggleCase(command) {
    const selection = window.getSelection();
    if (selection) {
        const selectedText = selection.toString();
        if (selectedText) {
            const transformedText = command === 'uppercase' ? selectedText.toUpperCase() : selectedText.toLowerCase();
            document.execCommand('insertText', false, transformedText);
        }
    }
    editorContainer.focus();
    updateButtonStates();
}

formatButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const command = button.getAttribute('data-command');
        if (command === 'uppercase') {
            toggleCase(command)
        } else if (command === 'lowercase') {
            toggleCase(command)
        } else if (command === 'fontSize') {
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

saveButton.addEventListener('click', () => {
    window.print();
});

fontSizeDropdown.addEventListener('change', () => {
    toggleFormat('fontSize');
});

fontFamilyDropdown.addEventListener('change', () => {
    const fontFamily = fontFamilyDropdown.value;
    setFontFamily(fontFamily);
});

fontColorPicker.addEventListener('change', () => {
    const fontColor = fontColorPicker.value;
    document.execCommand('foreColor', false, fontColor);
    editorContainer.focus();
    updateButtonStates();
});
