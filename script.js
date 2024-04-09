document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            setupOpinionDropZones(data.cases[0]); // Setup drop zones based on the case data
            setupDragAndDrop(); // Setup drag-and-drop functionality
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

        opinionZone.appendChild(dropZone);

        const blankSquare = document.createElement('div');
        blankSquare.classList.add('blank-square');
        blankSquare.textContent = opinion.author || 'Empty'; // Set the author's name or 'Empty' if no author
        opinionZone.appendChild(blankSquare);

        opinionZones.appendChild(opinionZone);
    });
}

function setupDragAndDrop() {
    // Setup drag-and-drop functionality here
    // This function should remain unchanged if the drag-and-drop behavior is working as expected
}
