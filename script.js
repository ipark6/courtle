document.addEventListener('DOMContentLoaded', () => {
    const opinions = document.getElementById('opinions');
    const justices = document.getElementById('justices');
    const opinionTypes = ['Majority', 'Concurring', 'Dissent']; // Example opinion types
    const justiceNames = ['Justice 1', 'Justice 2', 'Justice 3', 'Justice 4', 'Justice 5', 'Justice 6', 'Justice 7', 'Justice 8', 'Justice 9'];

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
            e.target
