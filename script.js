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

function initializeGame(caseData) {
    const gameBoard = document.getElementById('gameBoard');
    if (!gameBoard) {
        console.error('Game board element not found.');
        return;
    }
    
    // Dynamically generate your game's content here
    // Example: gameBoard.innerHTML = `<div class="justice-icon" draggable="true">Justice Name</div>`;
    
    // Once content is generated, set up drag-and-drop
    setupDragAndDrop(); // Make sure this is called after your elements are added to the page
}

function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.justice-icon');
    const dropZone = document.getElementById('drop-zone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', event => {
            event.target.classList.add('dragging');
        });

        draggable.addEventListener('dragend', event => {
            event.target.classList.remove('dragging');
        });
    });

    if (dropZone) {
        dropZone.addEventListener('dragover', event => {
            event.preventDefault(); // This allows for dropping
            // Handle dragover event
        });

        dropZone.addEventListener('drop', event => {
            // Handle drop event
            const draggable = document.querySelector('.dragging');
            dropZone.appendChild(draggable); // Example action
            draggable.classList.remove('dragging');
        });
    }
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
