document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            setupOpinionDropZones(data.cases[0]); // Setup drop zones based on the case data
            initializeJustices(data.cases[0]); // Setup justice icons based on the case data
        })
        .catch(error => console.error('Error loading JSON data: ', error));
});

function setupOpinionDropZones(caseData) {
    const opinionZones = document.getElementById('opinionZones');
    opinionZones.innerHTML = ''; // Clear existing zones before creating new ones

    caseData.opinions.forEach(opinion => {
        const opinionZone = document.createElement('div');
        opinionZone.classList.add('opinion-zone');

        const dropZone = document.createElement('div');
        dropZone.classList.add('drop-zone');
        dropZone.textContent = opinion.type;

        const blankSquares = document.createElement('div');
        blankSquares.classList.add('blank-squares');
        for (let i = 0; i < opinion.joinedBy.length; i++) {
            const blankSquare = document.createElement('div');
            blankSquare.classList.add('blank-square');
            blankSquares.appendChild(blankSquare);
        }

        opinionZone.appendChild(dropZone);
        opinionZone.appendChild(blankSquares);

        opinionZones.appendChild(opinionZone);
    });
}

function initializeJustices(caseData) {
    const justiceIcons = document.getElementById('justice-icons');
    justiceIcons.innerHTML = ''; // Clear existing icons before creating new ones

    const justices = Array.from(new Set(caseData.opinions.flatMap(opinion => opinion.joinedBy)));

    justices.forEach((justice, index) => {
        const justiceIcon = document.createElement('div');
        justiceIcon.classList.add('justice-icon');
        justiceIcon.draggable = true;
        justiceIcon.textContent = justice;
        justiceIcon.id = `justice${index + 1}`;

        justiceIcons.appendChild(justiceIcon);
    });
}
