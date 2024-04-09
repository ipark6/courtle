console.log("Script loaded");

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the cases data from the JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Assuming data is loaded correctly, initialize the game with the first case
            initializeGame(data.cases[0]);
        })
        .catch(error => console.error('Error loading JSON data: ', error));
});

function initializeGame(caseData) {
    const gameBoard = document.getElementById('gameBoard');
    if (!gameBoard) {
        console.error('Game board element not found.');
        return;
    }
    
    // Display case information
    gameBoard.innerHTML = `
        <h2>${caseData.name}</h2>
        <p>${caseData.description}</p>
        <p><strong>Disposition:</strong> ${caseData.disposition}</p>
        <input type="text" id="guessInput" placeholder="Enter Justice Name"/>
        <button onclick="submitGuess('${caseData.opinions[0].author}')">Submit Guess</button>
        <div id="feedback"></div>
    `;
}

    const draggables = document.querySelectorAll('.justice-icon');
    const dropZone = document.getElementById('drop-zone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    dropZone.addEventListener('dragover', e => {
        e.preventDefault(); // Necessary to allow dropping
        const afterElement = getDragAfterElement(dropZone, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            dropZone.appendChild(draggable);
        } else {
            dropZone.insertBefore(draggable, afterElement);
        }
    });
});

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
