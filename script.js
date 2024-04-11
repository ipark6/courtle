document.addEventListener('DOMContentLoaded', async () => {
    const opinionsContainer = document.getElementById('opinions');
    const justicesContainer = document.getElementById('justices');
    const submitButton = document.getElementById('submit');
    let caseData = await fetch('data.json').then(response => response.json());
    let currentCase = caseData.cases[0]; // Assuming we're working with the first case

    // Display Case Description
    const caseDescription = document.createElement('p');
    caseDescription.textContent = currentCase.description;
    opinionsContainer.before(caseDescription);

    // Dynamic Opinion Types
    let opinionTypes = currentCase.opinions.map(opinion => opinion.type);
    opinionTypes.forEach((type, index) => {
        const column = document.createElement('div');
        column.className = 'opinion-column';
        const typeDiv = document.createElement('div');
        typeDiv.className = 'opinion-type';
        typeDiv.textContent = type;
        column.appendChild(typeDiv);

        const emptyBox = document.createElement('div');
        emptyBox.className = 'empty-box';
        emptyBox.setAttribute('data-type', type);
        column.appendChild(emptyBox);
        opinionsContainer.appendChild(column);
    });

    // Options for Each Opinion
    const justiceNames = [...caseData.justices, "Rehnquist", "Stevens", "O'Connor", "Scalia", "Kennedy", "Souter", "Breyer", "Ginsburg"];
    justiceNames.forEach(name => {
        const box = document.createElement('div');
        box.className = 'justice-box';
        box.textContent = name;
        box.draggable = true;
        box.id = name.replace(/\s+/g, '-').toLowerCase();
        justicesContainer.appendChild(box);
    });

    // Drag and Drop Mechanism
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
            e.target.className = 'filled-box'; // Change class to reflect the box is now filled
            draggedElement.remove(); // Remove from the original list
        });
    });
});
