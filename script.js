const choices = document.querySelectorAll('.choice');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart');
const playerNameInput = document.getElementById('player-name');
const playerNameDisplay = document.getElementById('player-name-display');
const gameModeSelect = document.getElementById('game-mode');
const startGameButton = document.getElementById('start-game');
const gameArea = document.querySelector('.game-area');
const themeToggle = document.getElementById('toggle-theme');

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
let gameMode = 3;
let playerName = 'Player';

const playRound = (playerChoice) => {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);

    if (winner === 'player') {
        playerScore++;
        resultMessage.textContent = `You win! ${capitalize(playerChoice)} beats ${capitalize(computerChoice)}.`;
    } else if (winner === 'computer') {
        computerScore++;
        resultMessage.textContent = `You lose! ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}.`;
    } else {
        resultMessage.textContent = `It's a draw! Both chose ${capitalize(playerChoice)}.`;
    }

    updateScores();
    roundsPlayed++;

    if (roundsPlayed === gameMode) {
        endGame();
    }
};

const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
};

const updateScores = () => {
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
};

const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const endGame = () => {
    if (playerScore > computerScore) {
        resultMessage.textContent = `${playerName} wins the series!`;
    } else if (playerScore < computerScore) {
        resultMessage.textContent = 'Computer wins the series!';
    } else {
        resultMessage.textContent = 'The series ends in a draw!';
    }
    restartButton.classList.remove('hidden');
    choices.forEach(choice => choice.classList.add('hidden'));
};

const restartGame = () => {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    updateScores();
    resultMessage.textContent = 'Make your choice!';
    choices.forEach(choice => choice.classList.remove('hidden'));
    restartButton.classList.add('hidden');
};

const startGame = () => {
    playerName = playerNameInput.value || 'Player';
    playerNameDisplay.textContent = playerName;
    gameMode = parseInt(gameModeSelect.value, 10);
    gameArea.classList.remove('hidden');
};

choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        playRound(e.target.closest('.choice').dataset.choice);
    });
});

restartButton.addEventListener('click', restartGame);
startGameButton.addEventListener('click', startGame);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
