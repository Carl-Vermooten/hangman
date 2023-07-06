let init = function () {  ///////////////////////////////////////////// Initialize main program

  U.$("current-score").innerHTML = "Winning Streak: " + 0;
  U.$("wins").innerHTML = "Wins: " + U.wins;
  U.$("losses").innerHTML = "Losses: " + U.losses;
  U.$("tries-left").innerHTML = "Tries Left: " + U.triesLeft;
  U.$("correct-guesses").innerHTML = "Correct Guesses: " + U.correct_letters_array.length;
  U.$("wrong-guesses").innerHTML = "Wrong Guesses: " + U.wrong_letters_array.length;

  U.$('start-button').addEventListener("click", function () { /////////////////////// Start a new game

    $('#output-message').removeClass('wiggle-animation text-success text-danger'); // Removes the css wiggle animation class from the HTML in the front end 
    console.log('New game started.');

    // Reset all values for new game
    U.triesLeft = 6;
    U.guessed_letters_array = [];
    U.correct_letters_array = [];
    U.wrong_letters_array = [];
    U.underscored_letters_array = [];
    U.$("the-word").innerHTML = "____________";   // Clear the word
    U.$("keyboard").innerHTML = "";   // Clear the keyboard 
    U.$("current-score").innerHTML = "Winning Streak: " + U.current_score;
    U.$("tries-left").innerHTML = "Tries Left: " + U.triesLeft;
    U.$("correct-guesses").innerHTML = "Correct Guesses: " + U.correct_letters_array.length;
    U.$("wrong-guesses").innerHTML = "Wrong Guesses: " + U.wrong_letters_array.length;

    // Hide hangman bits for new game
    U.$('head').style.visibility = "hidden";
    U.$('torso').style.visibility = "hidden";
    U.$('left-arm').style.visibility = "hidden";
    U.$('right-arm').style.visibility = "hidden";
    U.$('left-leg').style.visibility = "hidden";
    U.$('right-leg').style.visibility = "hidden";


    $('#start-button').fadeOut(1);  // JQuery fades out start button

    U.fetchWord();    // Fetches a random word from the JSON data file     

    theKeyboard = U.fetchKeyboard();     // Creates the on-screen keyboard
    theKeyboard.style.visibility = "visible"; // Makes the on-screen keyboard visible
    theKeyboard.addEventListener("click", U.keyboard_button_handler, true); // Attaches the keyboard_button_handler event to the keys of the on-screen keyboard

    $('#output-message').addClass('wiggle-animation text-warning'); // Makes the output-div wiggle when clicking "Start Game" button
    U.$("output-message").innerHTML = "Game started";   // Display "Game ended" message     

    $('#end-button').fadeIn(200); // JQuery fades in end button
  });   ///////////////////////////////// End of Start button event listener


  U.$('end-button').addEventListener("click", function () { /////////////////////////////////////// End this game button    
    $('#output-message').removeClass('wiggle-animation text-success text-danger'); // Removes the wiggle animation from the DOM
    console.log('Game ended.');

    $('#end-button').fadeOut(1);    // JQuery fades out end button   

    theKeyboard.removeEventListener("click", U.keyboard_button_handler, true);  // Remove event listener from keyboard    

    U.triesLeft = 6;
    U.current_score = 0;
    U.guessed_letters_array = [];
    U.correct_letters_array = [];
    U.wrong_letters_array = [];
    U.underscored_letters_array = [];

    U.$("the-word").innerHTML = "____________";   // Clear the word
    U.$("keyboard").innerHTML = "";   // Clear the keyboard 

    U.$('current-score').innerHTML = "Winning Streak: " + U.current_score;
    U.$("wins").innerHTML = "Wins: " + U.wins;
    U.$("losses").innerHTML = "Losses: " + U.losses;
    U.$("tries-left").innerHTML = "Tries Left: " + U.triesLeft;
    U.$("correct-guesses").innerHTML = "Correct Guesses: " + U.correct_letters_array.length;
    U.$("wrong-guesses").innerHTML = "Wrong Guesses: " + U.wrong_letters_array.length;

    // Hide hangman bits for new game
    U.$('head').style.visibility = "hidden";
    U.$('torso').style.visibility = "hidden";
    U.$('left-arm').style.visibility = "hidden";
    U.$('right-arm').style.visibility = "hidden";
    U.$('left-leg').style.visibility = "hidden";
    U.$('right-leg').style.visibility = "hidden";

    $('#output-message').addClass('wiggle-animation text-warning'); // Makes the output-div wiggle after clicking "End Game" button
    U.$("output-message").innerHTML = "Game ended";   // Display "Game ended" message

    $('#start-button').fadeIn(200); // JQuery fades in start button   

  });   ///////////////////////////////////////// End of End button event listener

};  ////////////////////////////////////////////////////////////////// End of init()

window.onload = init();   /////////////////////////// Attach init() function to window.onload event






