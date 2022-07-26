"use strict"

const player = (type) => {
    this.type = type;
    const getType = () => type;

    return { getType };
}

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const setType = (pos, type) => {
        if(pos > board.length) return;

        board[pos] = type;
    };

    const getType = (pos) => {
        if(pos > board.length) return;
        return board[pos];
    };

    const resetAll = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = '';
        }
    };

    return { setType, getType, resetAll };
})();

const displayController = (() => {
    const boxes = document.querySelectorAll('.grid-text');
    const currentPlayerText = document.querySelector('.current-player-turn')
    const restartBtn = document.querySelector('.restart-btn');

    boxes.forEach((box) => 
        box.addEventListener('click', (e) => {
            if(game.isGameOver() || e.target.textContent !== '') return;
            game.playRound(parseInt(e.target.dataset.index));
            updateGameBoard();
        })
    );

    restartBtn.addEventListener('click', (e) => {
        gameBoard.resetAll();
        game.restart();
        updateGameBoard();
        setCurrentPlayerText("Player O's Turn");
    });

    const updateGameBoard = () => {
        for(let i = 0; i < boxes.length; i++){
            boxes[i].textContent = gameBoard.getType(i);
        }
    };

    const setResultText = (winner) => {
        if(winner == 'DRAW') {
            setCurrentPlayerText("It's a DRAW!");
        } else {
            setCurrentPlayerText(`Player ${winner} has won!`);
        }
    };

    const setCurrentPlayerText = (msg) => {
        currentPlayerText.textContent = msg;
    };

    return { setResultText, setCurrentPlayerText };
})();

const game = (() => {
    const playerO = player('O');
    const playerX = player('X');
    let round = 1;
    let gameOver = false;

    const playRound = (boxIndex) => {
        gameBoard.setType(boxIndex, getCurrentPlayerType());
    

        if(checkWinner(boxIndex)) {
            displayController.setResultText(getCurrentPlayerType());
            gameOver = true;
            return;
        }
        console.log(round);
        if(round === 9) {
            displayController.setResultText('DRAW');
            gameOver = true;
            console.log('Game over its a tie');
            return;
        }

        round++;
        

        displayController.setCurrentPlayerText(
            `Player ${getCurrentPlayerType()}'s turn`
        );
    };

    const getCurrentPlayerType = () => {
        if(round % 2 === 1){
            return playerO.getType();
        } else {
            return playerX.getType();
        }
    }

    const checkWinner = (boxIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
    

        return winConditions.filter((combo) => combo.includes(boxIndex))
            .some((posCombo) => posCombo.every(
            (index) => gameBoard.getType(index) === getCurrentPlayerType())
        );
    };

    const isGameOver = () => {
        return gameOver;
    }

    const restart = () => {
        round = 1;
        gameOver = false;
    }

    return { playRound, isGameOver, restart}
})();;

const player1 = player('x');

console.log(player1.getType());



