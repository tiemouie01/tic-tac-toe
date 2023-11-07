const gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(' ');
        }
    }

    const getBoard = () => board;

    const addMark = (row, column, mark) => {
        board[row][column] = mark;
    }

    const getBox = (row, column) => board[row][column];

    const tie = () => {
        let status = true;
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                if (board[i][j] === ' ') {
                    status = false;
                }
            }
        }
        return status;
    }

    return {
        getBoard,
        addMark,
        getBox,
        tie
    }
})();

function Player(name, mark) {
    return {
        name,
        mark
    };
}

function GameController(
    playerOneName = 'Player One',
    playerOneMark = 'X',
    playerTwoName = 'Player Two',
    playerTwoMark = 'O'
) {
    const players = [
        Player(playerOneName, playerOneMark),
        Player(playerTwoName, playerTwoMark)
    ]

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(gameboard.getBoard());
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const declareWinner = (player) => {
        console.log(gameboard.getBoard());
        console.log(`Congratulations ${player.name}, You won!`);
    }

    const checkForWinner = (mark) => {
        let won = false;
        if (gameboard.getBox(0,0) === mark && gameboard.getBox(0,1) === mark && gameboard.getBox(0,2) === mark){
            won = true;
        } else if(gameboard.getBox(0,0) === mark && gameboard.getBox(1,0) === mark && gameboard.getBox(2,0) === mark) {
            won = true;
        } else if (gameboard.getBox(0,0) === mark && gameboard.getBox(1,1) === mark && gameboard.getBox(2,2) === mark) {
            won = true;
        } else if(gameboard.getBox(0,1) === mark && gameboard.getBox(1,1) === mark && gameboard.getBox(2,1) === mark) {
            won = true;
        } else if (gameboard.getBox(2,0) === mark && gameboard.getBox(1,1) === mark && gameboard.getBox(0,2) === mark) {
            won = true;
        } else if(gameboard.getBox(0,2) === mark && gameboard.getBox(1,2) === mark && gameboard.getBox(2,2) === mark) {
            won = true;
        }
        return won;
    }

    const playRound = (row, column) => {
        console.log(`Placing ${getActivePlayer().mark} onto the board in row ${row}, column ${column}...`);
        gameboard.addMark(row, column, getActivePlayer().mark);

        if (checkForWinner(getActivePlayer().mark)) {
            declareWinner(getActivePlayer());
        } else if (gameboard.tie()){
            console.log('No winner, the game ends as a draw.');
        } else {
            switchPlayerTurn();
            printNewRound();
        }
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer,
    };
}

function screenController () {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

        board.forEach( (row, rowIndex) => {
            row.forEach((box, columnIndex) => {
                const boxButton = document.createElement('button');
                boxButton.classList.add('box');
                boxButton.dataset.column = columnIndex;
                boxButton.dataset.row = rowIndex;
                boxButton.textContent = box.getValue();
                boardDiv.appendChild(boxButton);
            })
        })
    }

    
}