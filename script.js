document.addEventListener('DOMContentLoaded', () => {
    const opinions = document.getElementById('opinions');
    const justices = document.getElementById('justices');
    const opinionTypes = ['Majority', 'Concurring', 'Dissent']; // Example opinion types
    const justiceNames = gameData.justices;

    // Create opinion rows
    opinionTypes.forEach(type => {
        const row = document.createElement('div');
        row.className = 'opinion-row';
        const typeDiv = document.createElement('div');
        typeDiv.className = 'opinion-type';
        typeDiv.textContent = type;
        const emptyBox = document.createElement('div');
        emptyBox.className = 'empty-box';
        emptyBox.setAttribute('data-type', type);
        row.appendChild(typeDiv);
        row.appendChild(emptyBox);
        opinions.appendChild(row);
    });

    // Create justice boxes
    justiceNames.forEach(name => {
        const box = document.createElement('div');
        box.className = 'justice-box';
        box.textContent = name;
        box.draggable = true;
        box.id = name.replace(/\s+/g, '-').toLowerCase();
        justices.appendChild(box);
    });

    // Drag and Drop Logic
    document.querySelectorAll('.justice-box').forEach(box => {
        box.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text', e.target.id);
        });
    });

    document.querySelectorAll('.empty-box').forEach(box => {
        box.addEventListener('dragover', e => {
            e.preventDefault();
        });

        box.addEventListener('drop', e => {
            const id = e.dataTransfer.getData('text');
            const draggedElement = document.getElementById(id);
            e.target.textContent = draggedElement.textContent;
            e.target.className = 'justice-box';
            draggedElement.remove(); // Remove from the original list
        });
    });
});
