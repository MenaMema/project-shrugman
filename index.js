const input = require("readline-sync");

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
}; //formula taken from internet

function replaceLettersWithDashes(str) {
  return str.replace(/[a-z]/gi, "_");
}

const movieArray = [
  "The Goodfather",
  "Pulp Fiction", //Array with all the films prepared for the game
  "The Lord Of The Rings",
  "Forrest Gump",
  "Matrix",
];
let finishedGames = {};
const shrugman = ["¯", "\\", "_", "(", ":", "/", ")", "_", "/", "¯"]; // the shrugman emoji, piece by piece
let endGame = false; //checks if the user press "exit". By default the game isn't finishd yet.

while (!endGame) {
  let shrugmanCounter = -1; //this is the fail counter
  let usedLetters = []; //Array of letters that had been used

  console.log("-----------------------------------");
  console.log("Welcome to the Shrugman Game"); //home menu.
  console.log("  \t 1. Play");
  console.log("  \t 2. Exit");
  console.log("-----------------------------------");
  let answer = input.question("Select your choice: "); // Gives the user the choice of, 1-start the game, 2-finish the game
  let isWordGuessed = false; //Boolean. Indicates if the word it's been guessed. We haven't start the game yet.
  if (answer == 1) {
    var item = movieArray[Math.floor(Math.random() * movieArray.length)]; //imitates random behaviour. Pick a movie from movieArray
    let movieTitle = item;
    item = item.toLowerCase(); //set movie titles to lower case
    let guessedSentence = replaceLettersWithDashes(item); //Hides the movie
    console.clear();
    while (shrugmanCounter < 9 && !isWordGuessed) {
      //The game goes on until the film is correct.
      console.log(guessedSentence); //Prints the game "board"

      let letter = input.question("\n\n Select a letter: "); //Asks for a letter to start with
      console.clear();
      if (item.indexOf(letter) > -1 && !usedLetters.includes(letter)) {
        //If the letter is there, and haven't been used, score! the game goes on
        console.log("Good call, keep trying!");
        while (item.indexOf(letter) > -1) {
          //If the letter is there,
          let possition = item.indexOf(letter); //save the position of the letter
          guessedSentence = guessedSentence.replaceAt(possition, letter); //_ _ _ _ --> _ _ m _
          item = item.replaceAt(possition, "#"); //h o m e --> h o # e
        }
        if (!guessedSentence.includes("_")) {
          //If "guessedSentence" not includes "_", we win
          isWordGuessed = true;
        }
      } else if (usedLetters.includes(letter)) {
        console.log("Hey! You already tried this letter! Choose another one"); //Warns the user about repeting a letter
      } else {
        console.log(
          "oops it looks like that letter is not contained in the title, try again!"
        );

        shrugmanCounter++; //if failed, the counter adds up to one failure
      }
      usedLetters.push(letter); //adds letters used by the user to the array
      let printShrugman = "";
      for (i = 0; i <= shrugmanCounter; i++) {
        printShrugman += shrugman[i]; //according to the user's mistakes, the Shrugman is being printed.
      }
      console.log(printShrugman); //prints the Shrungman status
    }
    if (isWordGuessed) {
      console.clear();
      finishedGames.item = "won";
      console.log("Congratulations! You've guessed the movie!");
    } else {
      console.clear();
      finishedGames.item = "lost";

      console.log("I'm sorry, you lose :(");
    }
    if (finishedGames.length > 0) {
      console.log("Game History: "); //Unfinished. Prints a summary of previous games status
      for (const p in finishedGames) {
        console.log(p, finishedGames[p]);
      }
    }
  } else {
    endGame = true;
    console.log("Thank you for playing!!");
  }
}
