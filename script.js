console.log("Welcome");
let audioMove = new Audio("click.mp3");
let audioWin = new Audio("win1.mp3");
let turn = "X";
let game_over = false;
let movesMade = 0;

// for Move_change
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
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
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won !! ";
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

// Game
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !game_over) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioMove.play();
            movesMade++;
            checkWin();
            checkDraw();
            if (!game_over) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
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
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0px';
    audioWin.pause();
});
