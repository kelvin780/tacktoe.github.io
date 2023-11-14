let currentPlayer = 'X';
const board = document.getElementById('board');

function createBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const cell = event.target;
    if (!cell.textContent) {
        cell.textContent = currentPlayer;
        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            resetBoard();
        } else if (checkTie()) {
            alert("It's a tie!");
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const cells = document.querySelectorAll('.cell');
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    const cells = document.querySelectorAll('.cell');
    return Array.from(cells).every(cell => cell.textContent !== '');
}

function resetBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}

window.onload = createBoard;
