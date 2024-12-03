function getComputerChoice() {
    const choice = ["Rock", "Paper", "Scissors"];
    return choice[Math.floor(Math.random() * choice.length)];
}

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    if (humanChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return `YOU WIN! ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)} beats ${computerChoice}`;
    } else {
        return `YOU LOSE! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${humanChoice}`;
    }
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    const target = document.querySelector('#rps-btns');
    const resultsDiv = document.querySelector('#results');
    const gameMessage = document.querySelector('#game-message');
    const scoreDisplay = document.querySelector('#score');

    const humanBar = document.querySelector('#human-bar');
    const computerBar = document.querySelector('#computer-bar');

    const resetGame = () => {
        humanScore = 0;
        computerScore = 0;
        humanBar.style.width = `50%`;
        computerBar.style.width = `50%`;
        gameMessage.textContent = "Choose your weapon!";
        scoreDisplay.textContent = "Harry Potter 0 - 0 Voldemort";

        // Remove reset button
        const resetButton = document.querySelector('#reset-btn');
        if (resetButton) resetButton.remove();

        // Re-enable buttons
        buttons.forEach((btn) => (btn.disabled = false));
    };

    const createResetButton = () => {
        const resetBtn = document.createElement('button');
        resetBtn.id = 'reset-btn';
        resetBtn.textContent = 'Reset Game';
        resultsDiv.appendChild(resetBtn);

        resetBtn.addEventListener('click', resetGame);
    };

    const updateBars = () => {
        const totalScore = humanScore + computerScore || 1; // Prevent division by zero
        const humanPercentage = (humanScore / totalScore) * 100;
        const computerPercentage = (computerScore / totalScore) * 100;

        humanBar.style.width = `${humanPercentage}%`;
        computerBar.style.width = `${computerPercentage}%`;
    };

    const createButton = (id, label) => {
        const btn = document.createElement('button');
        btn.id = id;
        btn.textContent = label;
        return btn;
    };

    const buttons = [
        createButton('rock', 'Rock'),
        createButton('paper', 'Paper'),
        createButton('scissors', 'Scissors'),
    ];

    buttons.forEach((btn) => {
        target.appendChild(btn);
        btn.addEventListener('click', () => {
            if (humanScore < 5 && computerScore < 5) {
                const humanChoice = btn.id;
                const computerChoice = getComputerChoice();
                const roundResult = playRound(humanChoice, computerChoice);

                if (roundResult.includes("YOU WIN")) {
                    humanScore++;
                } else if (roundResult.includes("YOU LOSE")) {
                    computerScore++;
                }

                gameMessage.textContent = roundResult;
                scoreDisplay.textContent = `Harry Potter ${humanScore} - ${computerScore} Voldemort`;

                updateBars();

                if (humanScore === 5 || computerScore === 5) {
                    gameMessage.textContent = humanScore === 5
                        ? "Congratulations! Harry defeated Voldemort!"
                        : "Bad luck! Voldemort defeated Harry!";

                    // Disable buttons and show reset
                    buttons.forEach((btn) => (btn.disabled = true));
                    createResetButton();
                }
            }
        });
    });
}
playGame();
