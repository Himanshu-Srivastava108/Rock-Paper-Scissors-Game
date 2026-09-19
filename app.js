let userScore = 0;
let compScore = 0;

let round = 0;
const totalRounds = 9;
let gameOver = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const roundInfo = document.querySelector("#round-info");
const restartBtn = document.querySelector("#restart-btn");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game Draw. Play Again!";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const showFinalResult = () => {
    gameOver = true;

    if(userScore>compScore){
        msg.innerText = `Match Over! You Win🏆 ${userScore} - ${compScore};`
        msg.style.backgroundColor = "green";
    } else if (compScore > userScore) {
        msg.innerText = `Match Over! Computer Wins 🤖 ${compScore} - ${userScore}`;
        msg.style.backgroundColor = "red";
    } else {
        msg.innerText = `Match Draw! 🤝 ${userScore} - ${compScore}`;
        msg.style.backgroundColor = "#081b31";
    }
};

const playGame = (userChoice) => {

    if(gameOver){
        return;
    }

    round++;
    roundInfo.innerText = `Round ${round} / ${totalRounds}`;

    if(round>totalRounds){
        return;
    }
    //Generate computer choice
    const compChoice = genCompChoice();

    if (userChoice === compChoice){
        //Draw Game
        drawGame();
        if (round === totalRounds) {
        showFinalResult();
        }
    } else {
        let userWin = true;
        if(userChoice === "rock") {
            //scissors, paper
            userWin = compChoice === "paper" ? false : true;
        } else if(userChoice === "paper"){
            //rock, scissors
            userWin = compChoice === "scissors" ? false : true;
        }else{
            //rock, paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
        if(round === totalRounds){
            showFinalResult();
        }
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

restartBtn.addEventListener("click", () =>{
    userScore = 0;
    compScore = 0;
    round = 0;
    gameOver = false;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    roundInfo.innerText = compScore;
    roundInfo.innerText = `Round ${round} / ${totalRounds}`;
});