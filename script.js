document.addEventListener('DOMContentLoaded', async () => {
    const opinionsContainer = document.getElementById('opinions');
    const justicesContainer = document.getElementById('justices');
    let caseData = await fetch('data.json').then(response => response.json());
    let currentCase = caseData.cases[0]; // Assuming we're working with the first case

    // Display Case Description
    const caseDescription = document.createElement('p');
    caseDescription.textContent = currentCase.description;
    opinionsContainer.before(caseDescription);

    // Dynamically generate opinion types with 6 rows, but only the first row is droppable
    currentCase.opinions.forEach((opinion, index) => {
        const column = document.createElement('div');
        column.className = 'opinion-column';
        const typeDiv = document.createElement('div');
        typeDiv.className = 'opinion-type';
        typeDiv.textContent = opinion.type;
        column.appendChild(typeDiv);

        for (let i = 0; i < 6; i++) {
            const emptyBox = document.createElement('div');
            emptyBox.className = i === 0 ? 'empty-box' : 'empty-box locked';
            emptyBox.setAttribute('data-type', opinion.type);
            column.appendChild(emptyBox);
        }

        opinionsContainer.appendChild(column);
    });

    // Justice names including additional justices as options
    const justiceNames = [...caseData.justices, "Rehnquist", "Stevens", "O'Connor", "Scalia", "Kennedy", "Souter", "Breyer", "Ginsburg"];
    justiceNames.forEach(name => {
        const box = document.createElement('div');
        box.className = 'justice-box';
        box.textContent = name;
        box.draggable = true;
        box.id = name.replace(/\s+/g, '-').toLowerCase();
        justicesContainer.appendChild(box);
    });

    // Drag and Drop Mechanism with adjustment for populating with a box
    document.querySelectorAll('.justice-box').forEach(box => {
        box.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text', e.target.id);
        });
    });

    document.querySelectorAll('.empty-box:not(.locked)').forEach(box => {
        box.addEventListener('dragover', e => {
            e.preventDefault();
        });

        box.addEventListener('drop', e => {
            const id = e.dataTransfer.getData('text');
            const draggedElement = document.getElementById(id);
            const clone = draggedElement.cloneNode(true);
            clone.className = 'justice-box filled';
            e.target.replaceWith(clone);
            draggedElement.remove();
        });
    });
});
