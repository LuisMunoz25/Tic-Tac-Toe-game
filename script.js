const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function renderBoard() {
    boardElement.innerHTML = '';
    for (let index = 0; index < board.length; index++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerText = board[index];
        cell.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (board[index] !== '' || !isGameActive) {
        return;
    }
    board[index] = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    renderBoard();
}

function checkResult() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusElement.innerText = `${board[a]} wins!`;
            isGameActive = false;
            return;
        }
    }
    if (!board.includes('')) {
        statusElement.innerText = 'It\'s a draw!';
        isGameActive = false;
    }
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusElement.innerText = '';
    renderBoard();
}

// Initial rendering of the board
renderBoard();
