console.log("Script loaded");

document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Assuming data is loaded correctly, initialize the game with the first case
            initializeGame(data.cases[0]);
            // Now move setupDragAndDrop inside here, or call it after elements are created
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

function setupDragAndDrop() {
    const dropZones = document.querySelectorAll('.drop-zone');
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', event => {
            event.preventDefault(); // Allow dropping
            zone.classList.add('active-drop-zone'); // Visual feedback
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('active-drop-zone'); // Remove visual feedback
        });

        zone.addEventListener('drop', event => {
            event.preventDefault();
            const draggableId = event.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(draggableId);
            zone.classList.remove('active-drop-zone'); // Clean up visual feedback

            if (draggable && zone.children.length === 0) { // Simple logic to prevent multiple drops, adjust as needed
                zone.appendChild(draggable);
            }
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
