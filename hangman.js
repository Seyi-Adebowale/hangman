const words = ["javascript", "browser", "programming", "markup", "cascading"];
const displayPlayer = document.getElementById('currentPlayer');
const wordDisplay = document.getElementById('wordDisplay');
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const playerOne = document.getElementById('playerOne')
const playerTwo = document.getElementById('playerTwo')

let word = words[Math.floor(Math.random() * words.length)];

let currentPlayer = 1;

let playerOneScore = 0;
let playerTwoScore = 0;

let answer = [];

//for loop [_, _, _, _, _, _, _]
for (let i = 0; i < word.length; i++) {
  answer[i] = "_";
}

let remainingLetters = word.length;
let guessedLetters = []

wordDisplay.innerHTML = answer.join(" ")

//listen for the submit button
guessForm.addEventListener('submit', function(e) {
	e.preventDefault();
  	let guess = guessInput.value.toLowerCase()

  	// Check if the guess has already been made
  	if (guessedLetters.includes(guess)) {
    	alert("The letter has already been guessed");
    	guessInput.value = "";
    	return;
  	}

  	guessInput.value = "";

  	//collect a new letter or get a new guess from player
  	if (currentPlayer == 1) {
		displayPlayer.classList.add('player2-style')
		displayPlayer.classList.remove('player1-style')
    	//validate the letter
    	if (guess.length !== 1) {
      		alert("Please guess a single letter.");
    	} 
		else {
      	//update the game state
      	for (let j = 0; j < word.length; j++) {
        	if (guess === word[j]) {
          		answer[j] = "<span style='color:red'>" + guess + "</span>";
		  		remainingLetters--;
		  		playerOneScore++;
          		currentPlayer = 2;
		  		displayPlayer.innerHTML = currentPlayer
		  		playerOne.innerHTML = playerOneScore 
        	} 
			else {
			currentPlayer = 2;
		  	displayPlayer.innerHTML = currentPlayer
			}
		}
    }
} 	else if (currentPlayer == 2) {
		displayPlayer.classList.add('player1-style')
		displayPlayer.classList.remove('player2-style')
    	//validate the letter
    	if (guess.length !== 1) {
      		alert("Please guess a single letter.");
    	} 
		else {
      	//update the game state
      	for (let j = 0; j < word.length; j++) {
        	if (guess === word[j]) {
		  		answer[j] = "<span style='color:blue'>" + guess + "</span>";
          		remainingLetters--; 
		  		playerTwoScore++;
          		currentPlayer = 1;
		  		displayPlayer.innerHTML = currentPlayer
		  		playerTwo.innerHTML = playerTwoScore
        	}
			else {
				currentPlayer = 1;
		  		displayPlayer.innerHTML = currentPlayer
			}
    	}
 	}
}
	
	guessedLetters.push(guess);
	wordDisplay.innerHTML = answer.join(" ");
 
	if (remainingLetters == 0) {
    	endGame();
	}
});


function endGame() {
  alert(`Good job! The answer was ${word}.`);
  if (playerOneScore > playerTwoScore) {
    alert(`Player One Wins! Scores: ${playerOneScore} - ${playerTwoScore}`);
  } else if (playerTwoScore > playerOneScore) {
    alert(`Player Two Wins! Scores: ${playerOneScore} - ${playerTwoScore}`);
  } else {
    alert(`It's a tie! Scores: ${playerOneScore} - ${playerTwoScore}`);
  }
}