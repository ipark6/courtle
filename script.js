document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Assuming data is loaded correctly, initialize the game with the first case
            // initializeGame(data.cases[0]); // Your existing initialization logic
            setupOpinionDropZones(caseData);  // Setup drop zones based on the case data
        })
        .catch(error => console.error('Error loading JSON data: ', error));
});




document.addEventListener('DOMContentLoaded', function() {
    // Example initialization (replace with fetch and actual game setup)
    initializeGame({
        name: "Example Case",
        description: "Example Description",
        disposition: "Disposition here",
        opinions: [
            {type: "Majority Opinion", author: "Justice 1"},
            {type: "Concurring Opinion", author: "Justice 2"},
            {type: "Dissenting Opinion", author: "Justice 3"}
        ]
    });
});

function initializeGame(caseData) {
    // Set up case information (this part can be dynamic based on your caseData)
    document.getElementById('caseName').textContent = caseData.name;
    document.getElementById('caseDescription').textContent = caseData.description;
    document.getElementById('caseDisposition').textContent = `Disposition: ${caseData.disposition}`;

    // Assuming you have justices' icons ready to be dragged (not shown here)
    // Setup drop zones (should already be in HTML, adjust if generating dynamically)
    setupDragAndDrop();
}





function setupOpinionDropZones(caseData) {
    const opinionZones = document.getElementById('opinionZones');
    opinionZones.innerHTML = ''; // Clear existing zones before creating new ones

    // Loop through each opinion to create a drop zone
    caseData.opinions.forEach((opinion, index) => {
        const dropZone = document.createElement('div');
        dropZone.classList.add('drop-zone');
        dropZone.setAttribute('data-opinion-type', opinion.type);
        dropZone.textContent = `${opinion.type} ${index + 1}`; // Adding a number to distinguish between same types
        opinionZones.appendChild(dropZone);
    });

    setupDragAndDrop(); // Assuming this function sets up the drag-and-drop functionality
}



function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.justice-icon');
    const dropZones = document.querySelectorAll('.drop-zone');

    // Setup draggables
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text/plain', draggable.id);
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    // Setup drop zones
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
            const draggableAllowed = zone.getAttribute('data-opinion-type'); // Example of using data attribute to match draggables and drop zones
            
            if (draggable && (!draggableAllowed || draggableAllowed === draggable.getAttribute('data-opinion-type'))) { // Example condition, adjust as needed
                zone.appendChild(draggable);
            }
            zone.classList.remove('active-drop-zone');
        });
    });
}


// Remaining functions (getDragAfterElement, submitGuess) unchanged


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.justice-icon:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


function submitGuess(correctAuthor) {
    const guess = document.getElementById('guessInput').value;
    const feedback = document.getElementById('feedback');
    
    if (guess === correctAuthor) {
        feedback.innerHTML = `<p style="color: green;">Correct! The author was ${correctAuthor}.</p>`;
    } else {
        feedback.innerHTML = `<p style="color: red;">Incorrect, try again.</p>`;
    }
}
