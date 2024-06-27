document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const gameStatus = document.getElementById('game-status');
    const resetButton = document.getElementById('resetBtn');
    const newGameButton = document.getElementById('newGameBtn');
    const timerElement = document.getElementById('time-left');
    const sizeButtons = document.querySelectorAll('#game-settings button');

    let boardSize = 3;
    let board = [];
    let currentPlayer = 'X';
    let isGameActive = true;
    let timer;
    const moveTime = 10; // seconds

    const createBoard = (size) => {
        board = Array(size * size).fill('');
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        
        const cellSize = 50 / size; // Calculate cell size based on the grid size
        const fontSize = cellSize * 0.7; 
        document.documentElement.style.setProperty('--cell-font-size', `${fontSize}vh`);

        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    };

    const winningConditions = (size) => {
        const conditions = [];
        // Rows and columns
        for (let i = 0; i < size; i++) {
            const row = [];
            const col = [];
            for (let j = 0; j < size; j++) {
                row.push(i * size + j);
                col.push(i + j * size);
            }
            conditions.push(row);
            conditions.push(col);
        }
        // Diagonals
        const diag1 = [];
        const diag2 = [];
        for (let i = 0; i < size; i++) {
            diag1.push(i * size + i);
            diag2.push(i * size + (size - i - 1));
        }
        conditions.push(diag1);
        conditions.push(diag2);

        return conditions;
    };

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
        const conditions = winningConditions(boardSize);
        let roundWon = false;
        for (let i = 0; i < conditions.length; i++) {
            const winCondition = conditions[i];
            const firstCell = board[winCondition[0]];
            let allEqual = firstCell !== '' && winCondition.every(index => board[index] === firstCell);
            if (allEqual) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameStatus.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
            clearInterval(timer);
            return;
        }

        if (!board.includes('')) {
            gameStatus.textContent = `It's a draw!`;
            isGameActive = false;
            clearInterval(timer);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
        resetTimer();
    };

    const handleResetButton = () => {
        board = Array(boardSize * boardSize).fill('');
        isGameActive = true;
        currentPlayer = 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
        resetTimer();
    };

    const handleNewGameButton = () => {
        handleResetButton();
    };

    const resetTimer = () => {
        clearInterval(timer);
        timerElement.textContent = moveTime;
        timer = setInterval(() => {
            const timeLeft = parseInt(timerElement.textContent, 10);
            if (timeLeft > 1) {
                timerElement.textContent = timeLeft - 1;
            } else {
                clearInterval(timer);
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                gameStatus.textContent = `Player ${currentPlayer}'s turn`;
                resetTimer();
            }
        }, 1000);
    };

    const handleSizeButton = (event) => {
        boardSize = parseInt(event.target.id.charAt(0));
        createBoard(boardSize);
        handleResetButton();
    };

    sizeButtons.forEach(button => button.addEventListener('click', handleSizeButton));
    resetButton.addEventListener('click', handleResetButton);
    newGameButton.addEventListener('click', handleNewGameButton);

    createBoard(boardSize);
    resetTimer();
});
