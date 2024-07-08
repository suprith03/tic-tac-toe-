console.log("Welcome");
let audioMove = new Audio("click.mp3");
let audioWin = new Audio("win1.mp3");
let player = "X"; 
let ai = "O"; 
let turn = player; 
let game_over = false;
let movesMade = 0;
let aiThinkingTime = 1000;

// Modal for choosing X or O
const showModal = () => {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal').classList.add('modal-visible');
};

const hideModal = () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal').classList.remove('modal-visible');
};

showModal();

document.getElementById('chooseX').addEventListener('click', () => {
    player = "X";
    ai = "O";
    turn = player;
    hideModal(); 
    document.querySelector('.info').innerText = "User's Turn " + turn; 
    console.log("Player chose X");
});

document.getElementById('chooseO').addEventListener('click', () => {
    player = "O";
    ai = "X";
    turn = ai; 
    hideModal(); 
    document.querySelector('.info').innerText = "Ai's Turn " + turn; 
    console.log("Player chose O");

    // Introduce a delay for AI move after user's selection
    setTimeout(() => {
        aiMove(); 
    }, aiThinkingTime);
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

    for (let i = 0; i < wins.length; i++) {
        let [a, b, c] = wins[i];
        if (
            boxtext[a].innerText !== "" &&
            boxtext[a].innerText === boxtext[b].innerText &&
            boxtext[a].innerText === boxtext[c].innerText
        ) {
            let winner = boxtext[a].innerText === player ? "User" : "Ai";
            document.querySelector('.info').innerText = winner + " won!";
            game_over = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "160px";
            audioWin.play();

            // Highlight winning boxes
            [a, b, c].forEach(index => {
                boxtext[index].parentNode.classList.add('winning-box');
            });
            return;
        }
    }

    // Check for draw
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
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].innerText === '') {
            emptyBoxes.push(i);
        }
    }

    if (emptyBoxes.length > 0) {
        let aiChoice = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        boxtext[aiChoice].innerText = ai;
        movesMade++;
        checkWin();
        if (!game_over) {
            turn = changeTurn();
            document.querySelector('.info').innerText = "User's Turn " + turn;
        }
    }
};

// Game
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    element.addEventListener('click', () => {
        let boxtext = element.querySelector('.boxtext');
        if (boxtext.innerText === '' && !game_over && turn === player) {
            boxtext.innerText = turn;
            audioMove.play();
            movesMade++;
            checkWin();
            if (!game_over) {
                turn = changeTurn();
                document.querySelector('.info').innerText = "Ai's Turn " + turn;
                setTimeout(aiMove, aiThinkingTime); 
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
    player = "X"; 
    ai = "O"; 
    turn = player;
    game_over = false;
    movesMade = 0; 
    document.querySelector('.info').innerText = "User's Turn " + turn; 
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0px';
    audioWin.pause();
    showModal(); 
    console.log("Game reset");
});
