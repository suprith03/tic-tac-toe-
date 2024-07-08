console.log("Welcome");
let audioMove = new Audio("click.mp3");
let audioWin = new Audio("win1.mp3");
let turn = "X";
let player = "X";
let ai = "O";
let game_over = false;
let movesMade = 0;

// Modal for choosing X or O
const showModal = () => {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal').classList.add('modal-visible'); // Added class to control visibility
};

const hideModal = () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal').classList.remove('modal-visible');
};

showModal(); // Show modal initially

document.getElementById('chooseX').addEventListener('click', () => {
    player = "X";
    ai = "O";
    turn = player;
    hideModal(); // Hide modal after selection
    document.querySelector('.info').innerText = "User's Turn " + turn; // Display user's turn
    console.log("Player chose X");
});

document.getElementById('chooseO').addEventListener('click', () => {
    player = "O";
    ai = "X";
    turn = ai;
    hideModal(); // Hide modal after selection
    aiMove(); // AI starts if player chooses O
});

// for Move_change
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// check for WIN
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            let winner = boxtext[e[0]].innerText === player ? "User" : "AI";
            document.querySelector('.info').innerText = winner + " won!";
            game_over = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "160px";
            audioWin.play();

            e.forEach(index => {
                boxtext[index].parentNode.classList.add('winning-box');
            });
        }
    });
};

// check for DRAW
const checkDraw = () => {
    if (movesMade === 9 && !game_over) {
        document.querySelector('.info').innerText = "It's a draw!";
        game_over = true;
    }
};

// AI Move
const aiMove = () => {
    if (game_over) return;
    let boxtext = document.getElementsByClassName('boxtext');
    let emptyBoxes = [];
    Array.from(boxtext).forEach((element, index) => {
        if (element.innerText === '') emptyBoxes.push(index);
    });

    if (emptyBoxes.length > 0) {
        let aiChoice = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        boxtext[aiChoice].innerText = ai;
        movesMade++;
        checkWin();
        checkDraw();
        if (!game_over) {
            turn = changeTurn();
            document.getElementsByClassName("info")[0].innerText = "User's Turn " + turn;
        }
    }
};

// Game
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !game_over && turn === player) {
            boxtext.innerText = turn;
            audioMove.play();
            movesMade++;
            checkWin();
            checkDraw();
            if (!game_over) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerText = "User's Turn " + turn;
                aiMove(); // AI takes its turn
            }
        }
    });
});

// Reset button
document.getElementById('reset').addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
        element.parentNode.classList.remove('winning-box'); 
    });
    turn = "X";
    game_over = false;
    movesMade = 0; // Reset movesMade
    document.getElementsByClassName("info")[0].innerText = "User's Turn " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0px';
    audioWin.pause();
    showModal(); // Show modal again on reset
    console.log("Game reset");
});
