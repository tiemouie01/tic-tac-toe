const gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
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