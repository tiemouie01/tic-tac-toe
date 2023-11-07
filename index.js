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

    return {
        getBoard,
        addMark
    }
})();

function Cell() {
    let mark = '';
    const setMark = (playerMark) => {
        mark = playerMark;
    }
    const getMark = () => value;
    return {
        setMark,
        getMark
    };
}

function Player(name, mark) {
    return {
        name,
        mark
    };
}

function gameController(
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
        gameboard.getBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const declareWinner = () => {

    }

    const checkForWinner = (mark, board) => {
        let won = false;
        if (board[0][0] === mark && board[0][1] === mark && board[0][2] === mark){
            won = true;
        } else if(board[0][0] === mark && board[1][0] === mark && board[2][0] === mark) {
            won = true;
        } else if (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) {
            won = true;
        } else if(board[0][1] === mark && board[1][1] === mark && board[2][1] === mark) {
            won = true;
        } else if (board[2][0] === mark && board[1][1] === mark && board[0][2] === mark) {
            won = true;
        } else if(board[0][2] === mark && board[1][2] === mark && board[2][2] === mark) {
            won = true;
        }
        return won;
    }

    const playRound = (row, column) => {
        console.log(`Placing ${getActivePlayer().mark} onto the board in row ${row}, column ${column}...`);
        gameboard.addMark(row, column, getActivePlayer().mark);

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = gameController('Timothy', 'X', 'Eve', 'O');