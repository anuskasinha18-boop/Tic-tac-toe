const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = false; //playerX starts
let count = 0; //To Track Draw
let scoreX = 0;
let scoreO = 0;
const scoreXElement = document.querySelector("#score-x");
const scoreOElement = document.querySelector("#score-o");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const statusText = document.querySelector("#status-text");

const resetGame = () => {
    turnO = false;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msgContainer.classList.remove("flex");
    statusText.innerText = "PLAYER X TURN";
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            //playerO
            box.innerText = "O";
            box.classList.add("o-color", "box-pop");
            turnO = false;
            statusText.innerText = "PLAYER X TURN";
        } else {
            //playerX
            box.innerText = "X";
            box.classList.add("x-color", "box-pop");
            turnO = true;
            statusText.innerText = "PLAYER O TURN";
        }
        box.disabled = true;
        count++;

        let winnerData = checkWinner();

        if (count === 9 && !winnerData) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `DRAW`;
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("flex");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-color", "o-color", "box-pop", "winning-box");
    }
};

const showWinner = (winner, pattern) => {
    msg.innerText = `${winner} WINS!`;
    if (winner === "X") {
        scoreX++;
        scoreXElement.innerText = scoreX;
    } else {
        scoreO++;
        scoreOElement.innerText = scoreO;
    }
    
    // Highlight winning boxes
    pattern.forEach(index => {
        boxes[index].classList.add("winning-box");
    });

    msgContainer.classList.remove("hide");
    msgContainer.classList.add("flex");
    disableBoxes();
};


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);
                return true;
            }
        }
    }
    return false;
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);