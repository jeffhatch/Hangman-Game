	// Set zero variables for wins and losses
	var wins = 0;
	var losses = 0;
	var remainingGuesses = 12;

	document.querySelector("#wins").innerHTML = (wins + " Wins");
	document.querySelector("#losses").innerHTML = (wins + " Losses");
	document.querySelector("#numguesses").innerHTML = remainingGuesses;

	// Set the words for the game
	var wordArray = [
	"ALADDIN", 
	"SHREK", 
	"DUMBO", 
	"CINDERELLA", 
	"MADAGASCAR", 
	"TANGLED", 
	"TARZAN", 
	"PINOCCHIO", 
	"RATATOUILLE", 
	"HERCULES", 
	"THUMBELINA", 
	"MULAN"
	];

	// Fill array with guessed letters
	var playerGuessed = [];
	var randomSelect = wordArray[Math.floor(Math.random() * wordArray.length)];
	var letterArray = [];

	for (var i = 0; i < randomSelect.length; i++) {
		letterArray.push(randomSelect.charAt(i));
	}

	// Create an array for push of underscores and string to populate #field on page
	var workingArray = [];

	for (var i = 0; i < letterArray.length; i++) {
		workingArray.push("_");
	}

	var workingArrayString = workingArray.join(" ");

	document.querySelector("#field").innerHTML = workingArrayString;



	// Create a function to reset the game
	function gameReset() {

		// Reset the number of guesses
		remainingGuesses = 12;
		document.querySelector("#numguesses").innerHTML = remainingGuesses;


		// Player's guessed letters
		playerGuessed = [];
		document.querySelector("#letters").innerHTML = playerGuessed;

		// Random select of a word and then fill the array with the letters
		randomSelect = wordArray[Math.floor(Math.random() * wordArray.length)];

		letterArray = [];
		for (var i = 0; i < randomSelect.length; i++) {
			letterArray.push(randomSelect.charAt(i));
		}

		// Use an array and a string as workers to remove comma separators and display the underscores
		workingArray = [];
		for (var i = 0; i < letterArray.length; i++) {
			workingArray.push("_ ");
		}

		workingArrayString = workingArray.join(" ");

		document.querySelector("#field").innerHTML = workingArrayString;
	} // **** END of function *****


	// Get letter selection from player and ensure it is UPPERCASE
	document.onkeyup = function(event) {

		var userGuess = event.key.toUpperCase();
		console.log("userGuess: " + userGuess);

		// Create a function for the array.some Method to work; used to check userGuess to any array
		function checkArray(letter) {
		    return letter == userGuess;
		}

		// Check userGuess to playerGuessed to see if letter has already been guessed and is not in word,
		// if not, add letter to playerGuessed and update guessed letters field in HTML
		if ((playerGuessed.some(checkArray) === false) && (letterArray.some(checkArray) === false)) {
			playerGuessed.push(userGuess);
			playerGuessedString = playerGuessed.join(" ");
			document.querySelector("#letters").innerHTML = playerGuessedString;
		}

		// If letter has a match then place the appropriate _(s) in workingArray
		if (letterArray.some(checkArray) === true) {
			for (var i = 0; i < workingArray.length; i++) {
				if (userGuess == letterArray[i]) {
					workingArray[i] = letterArray[i];
					workingArrayString = workingArray.join(" ");

					// Update game field HTML to show correctly guessed letter
					document.querySelector("#field").innerHTML = workingArrayString;
				}
			}
		}

		// If no letter match then subtract number of guesses by 1
		else {
			reduceGuesses();
		}

	// Run function to check if user wins or loses
	checkWinLoseConditions();

	} // **** END onkeyup function ****


	// Create a function to subtract remaining guesses by 1
	function reduceGuesses() {
		remainingGuesses = remainingGuesses - 1;
		document.querySelector("#numguesses").innerHTML = remainingGuesses;
	}


	// Win/Loss Logic
	// Create a function to check if two arrays are equal, used to check win condition
	function arraysEqual(a, b) {

	  if (a === b) return true;
	  if (a == null || b == null) return false;
	  if (a.length != b.length) return false;

	  // If you don't care about the order of the elements inside
	  // the array, you should sort both arrays here.

	  for (var i = 0; i < a.length; ++i) {
	    if (a[i] !== b[i]) return false;
	  }
	  return true;
	}

	function checkWinLoseConditions() {

	// If all letters are guessed correctly, add 1 to win count and restart game
		if (arraysEqual(workingArray, letterArray) == true) {
			wins = wins + 1;
			document.querySelector("#wins").innerHTML = (wins + " Wins");
			document.querySelector("#winword").innerHTML = ("Word was: " + randomSelect);
			gameReset();
		}
	// If number of guesses reaches 0, add 1 to the losses count and restart game
		else if (remainingGuesses === 0) {
			losses = losses + 1;
			document.querySelector("#losses").innerHTML = (losses + " Losses");
			document.querySelector("#winword").innerHTML = ("Word was: " + randomSelect);
			gameReset();
		}
		else {
			return
		}
	}