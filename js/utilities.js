// Utilities script
// This script defines an object that has some utilitarian functions.

// 1. Defines global variables and arrays
// 2. A function for getting an element by ID
// 3. Adding an event listener 
// 4. Removing an event listener
// 5. Fetching a random word from JSON data file
// 6. Fetches an on-screen keyboard
// 7. A keyboard button handler function
// 8. A getAllIndexes function for the letters array indexes

let U = {

    alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    the_word: "",
    letters_array: [],
    underscored_letters_array: [],
    guessed_letters_array: [],
    correct_letters_array: [],
    wrong_letters_array: [],
    gameOver: false,
    triesLeft: 6,
    current_score: 0,
    wins: 0,
    losses: 0,

    //////////////////////////////////////////////  For getting the document element by ID:
    $: function (id) {
        'use strict';
        if (typeof id == 'string') {
            return document.getElementById(id);
        }
    }, // End of $() function.   

    //////////////////////////////////////////// Create event listeners:
    addEvent: function (obj, type, fn) {
        'use strict';
        if (obj && obj.addEventListener) { // W3C
            obj.addEventListener(type, fn, false);
        } else if (obj && obj.attachEvent) { // Older IE
            obj.attachEvent('on' + type, fn);
        }
    }, // End of addEvent() function.

    //////////////////////////////////////////// Remove event listeners:
    removeEvent: function (obj, type, fn) {
        'use strict';
        if (obj && obj.removeEventListener) { // W3C
            obj.removeEventListener(type, fn, false);
        } else if (obj && obj.detachEvent) { // Older IE
            obj.detachEvent('on' + type, fn);
        }
    }, // End of removeEvent() function.

    ///////////////////////////////////////////// Creates and returns ajax object via XMLHttpRequest object:
    ///////////////////////////////////////////////////// Fetches the word:
    fetchWord: function () {
        'use strict';
        let ajax = new XMLHttpRequest();
        let the_word_element = U.$("the-word");
        // the_word_element.innerHTML = "Loading...";

        ajax.open('GET', '../data/data.json');

        ajax.onload = function () {
            if (ajax.status == 200) {
                let wordArray = JSON.parse(ajax.responseText); // Parse the JSON response into an array
                let randomIndex = Math.floor(Math.random() * wordArray.length); // Generate a random index within the array length
                U.the_word = wordArray[randomIndex].toUpperCase(); // Select a random word from the array and convert it to uppercase
                U.letters_array = U.the_word.split(""); // Split U.the_word into U.letters_array
                console.log(U.the_word);

                for (let i = 0; i < U.letters_array.length; i++) {
                    U.underscored_letters_array.push(U.letters_array[i].replace(/[a-z]/gi, '_'));
                    the_word_element.innerHTML = U.underscored_letters_array.join("");
                }
            }
        }
        ajax.send(null);
    },
    /////////////////////////////////////////////////////////// End of Fetch word:  

    /////////////////////////////////////////////////////////////// Fetches keyboard
    fetchKeyboard: function () {

        let keyboard = U.$('keyboard');    // Get a new reference to "keyboard"   
        let keyboard_letters = U.alphabet;

        for (let i = 0; i < keyboard_letters.length; i++) {
            keyboard_button = '<button class="btn btn-outline-light m-1" value="' + keyboard_letters[i] + '">' + keyboard_letters[i] + '</button>';
            keyboard.innerHTML += keyboard_button;
        }
        // keyboard.style.visibility = "visible";    // Make the keyboard visible son 
        return keyboard;
    },  // End of fetchKeyboard

    keyboard_button_handler: function (event) {    // Make the keyboard clicky wicky        
        let target = event.target;
        $('#output-message').removeClass('wiggle-animation text-warning text-success text-danger');
        if (target.value != undefined) {    // If target.value is a letter  
            target.disabled = true;         // Disable the keyboard button after click
            target.style.backgroundColor = "#6c757d"; // Change the background-color of the
            U.guessed_letters_array.push(target.value);     // Push the letter into U.guessed_letters_array
            // console.log("You've guessed these letters so far (U.guessed_letters_array): " + U.guessed_letters_array.join(" "));
            let indexes = U.getAllIndexes(U.letters_array, target.value);   // Loop through U.letters_array and get index of target.value                
            for (let i = 0; i < indexes.length; i++) {   // Loop through indexes
                U.underscored_letters_array.splice(indexes[i], 1, target.value);    // Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements. 
                // console.log("Underscored letters array: (U.underscored_letters_array)" + U.underscored_letters_array.join(" "));
            }

            U.$("the-word").innerHTML = "";     // Clears the word's innerHTML
            U.$("the-word").innerHTML = U.underscored_letters_array.join("");   // Displays a new word, in the word's innerHTML

            // If underscored_letters_array includes the target.value, then push target.value into correct_letters_array. 
            if (U.underscored_letters_array.includes(target.value)) {
                U.correct_letters_array.push(target.value);

                $('#output-message').addClass('wiggle-animation text-success');
                U.$("output-message").innerHTML = "Correct Guess";   // Display "Correct Guess." message                 
                U.$("correct-guesses").innerHTML = "Correct Guesses: " + U.correct_letters_array.length;   // Displays "Correct Guesses" 
                // else push target.value into wrong_letters_array
            } else {
                U.wrong_letters_array.push(target.value);
                $('#output-message').removeClass('wiggle-animation text-success text-warning text-danger');
                $('#output-message').addClass('wiggle-animation text-danger');
                U.$("output-message").innerHTML = "Wrong Guess";   // Display "Wrong Guess." message
                U.triesLeft--;
                U.$("tries-left").innerHTML = "Tries Left: " + U.triesLeft;
                U.$("wrong-guesses").innerHTML = "Wrong Guesses: " + U.wrong_letters_array.length;   // Display "Wrong Guess" 
                // Displays hangman parts based on U.wrong_letters_array.length value
                if (U.wrong_letters_array.length == 1) {
                    U.$('head').style.visibility = "visible";
                } else if (U.wrong_letters_array.length == 2) {
                    U.$('torso').style.visibility = "visible";
                } else if (U.wrong_letters_array.length == 3) {
                    U.$('left-arm').style.visibility = "visible";
                } else if (U.wrong_letters_array.length == 4) {
                    U.$('right-arm').style.visibility = "visible";
                } else if (U.wrong_letters_array.length == 5) {
                    U.$('left-leg').style.visibility = "visible";
                } else if (U.wrong_letters_array.length == 6) {
                    U.$('right-leg').style.visibility = "visible";
                }
            }

            // Losing condition
            if (U.triesLeft == 0) {
                U.gameOver = true;
                keyboard.style.visibility = "hidden";
                U.$("output-message").innerHTML = "You Lose! The word is " + U.the_word;   // Display "You Lose!" message               
                $('#end-button').fadeOut(0);    // JQuery fades out end button
                $('#start-button').fadeIn(200);    // JQuery fades out end button    
                U.current_score = 0;
                U.$('current-score').innerHTML = "Winning Streak: " + U.current_score;
                U.losses++;
                U.$('losses').innerHTML = "Losses: " + U.losses;
            }   // End of losing condition

            // Winning condition
            if (!(U.underscored_letters_array.includes("_"))) {
                U.gameOver = false;
                U.$("output-message").innerHTML = "You Win!";   // Display "You Win!" message
                keyboard.style.visibility = "hidden";
                $('#end-button').fadeOut(0);    // JQuery fades out end button
                $('#start-button').fadeIn(200);    // JQuery fades out end button     
                U.current_score++;
                U.$('current-score').innerHTML = "Winning Streak: " + U.current_score;
                U.wins++;
                U.$('wins').innerHTML = "Wins: " + U.wins;
            }    // End of winning condition            

        }   //If target.value is a letter


    },////////////////////////////////////////////////////////////// End of keyboard_button_handler

    getAllIndexes: function (arr, val) {
        let get_indexes = [], i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                get_indexes.push(i);
            }
        }
        return get_indexes;
    }

}; // End of U declaration.