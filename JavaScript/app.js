document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const gameStatus = document.getElementById('game-status');
    const resetButton = document.getElementById('resetBtn');
    const newGameButton = document.getElementById('newGameBtn');

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

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        checkResult();
    };

    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameStatus.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            gameStatus.textContent = `It's a draw!`;
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    };

    const handleResetButton = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
    };

    const handleNewGameButton = () => {
        handleResetButton();
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleResetButton);
    newGameButton.addEventListener('click', handleNewGameButton);
});

