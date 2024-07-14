const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
};

const playerQueue = [[], []]
const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];
turn = true; // p1 if true, else p2

const printBoard = () => {
    board.forEach(row => {
        console.log('-------------');
        row = row.map(item => {
            if (item === 0) {
                return ' '
            } else if (item === 1) {
                return 'x'
            } else {
                return 'o'
            }
        }).join(' | ')
        console.log('| ' + row + ' |');
    })
    console.log('-------------');
}

const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
        }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    return false;
}

const main = async () => {
    while (true){
        // check winner, then break
        const winner = checkWinner();
        if (winner) {
            console.log(`!!!The winner is ${winner !== 1 ? 'o' : 'x'}!!!`)
            printBoard();
            break;
        }
    
        // print board
        console.log('\n\n\n');
        console.log(`${turn ? 'x' : 'o'}'s turn`);
        printBoard();
        
        // get input p1
        let xInput, yInput;
        while (true) {
            while (true) {
                xInput = parseInt(await askQuestion('x-coordinate: '));
                if (xInput > 0 && xInput < 4) {
                    break;
                } else {
                    console.log('Must be 1-3')
                }
            }
            while (true) {
                yInput = parseInt(await askQuestion('y-coordinate: '));
                if (yInput > 0 && yInput < 4) {
                    break;
                } else {
                    console.log('Must be 1-3')
                }
            }
            // check if slot already taken
            xInput --;
            yInput  = 3 - yInput;
            if (board[yInput][xInput] !== 0) {
                console.log('Error: slot is already taken');
            } else {
                break;
            }
        }

        // pop queue p2 if full and remove oldest input
        let removedItem;
        const queueIndex = turn ? 0 : 1;
        if (playerQueue[queueIndex].length > 2) {
            removedItem = playerQueue[queueIndex].shift();
        }
        playerQueue[queueIndex].push([yInput, xInput])

        // update board
        if (removedItem) {
            board[removedItem[0]][removedItem[1]] = 0;
        }
        board[yInput][xInput] = turn ? 1 : 2
    
        // change turn
        turn = !turn;
    }
}
main();