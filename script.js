document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            setupOpinionDropZones(data.cases[0]); // Setup drop zones based on the case data
            initializeJustices(); // Initialize justice icons
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
        blankSquare.setAttribute('data-index', 0); // Add index attribute to identify the position
        opinionZone.appendChild(blankSquare);

        opinionZones.appendChild(opinionZone);
    });
}

function initializeJustices() {
    const draggables = document.querySelectorAll('.justice-icon');

    draggables.forEach(draggable => {
        draggable.draggable = true;
        draggable.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text/plain', draggable.id);
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });
}

function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.justice-icon');
    const dropZones = document.querySelectorAll('.drop-zone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text/plain', draggable.id);
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', event => {
            event.preventDefault();
            zone.classList.add('active-drop-zone');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('active-drop-zone');
        });

        zone.addEventListener('drop', event => {
            event.preventDefault();
            const draggableId = event.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(draggableId);
            const blankSquare = zone.querySelector('.blank-square'); // Find the blank square within the drop zone
            if (draggable && blankSquare && blankSquare.textContent === '') {
                blankSquare.textContent = draggable.textContent; // Replace the text of the blank square with the draggable's text content
                draggable.textContent = ''; // Clear the draggable's text content
            }
            zone.classList.remove('active-drop-zone');
        });
    });
}
