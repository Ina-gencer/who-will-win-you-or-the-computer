    gsap.from('#welcome, .bottom-block', {x: -500, duration:2, opacity:0})
    gsap.from('#game', {x: 500, duration:2, opacity:0})
    gsap.from('#btn-guess', {rotation:360, delay:2.2, duration:1.5 })
    gsap.from('#btn-again', {opacity:0, y: 20, delay:3.2, duration:1.5 })


    // -- typewriter -- //
    let heading = "Welcome to the guessing challenge";
    // console.log(heading.length)
    let i = 0; 
    let speed = 80; 
    function type() {
        if (i < heading.length) { 
            document.querySelector("h1").textContent += heading.charAt(i); 
            i++; 
            setTimeout(type, speed); 
        }
    }
    type()
    
            // -- game -- //
    const userGuess = document.querySelector("#input-field");
    const buttonGuess = document.querySelector("#btn-guess");
    const newGame = document.querySelector("#btn-again");
    const remain = document.querySelector("#remaining-guesses");
    const guessSlot = document.querySelector('#previous-guesses');
    let remainingGuesses = 5;
    let previousGuesses = [];
    // console.log(previousGuesses)
    
    const remaining = document.querySelector("#remaining-guesses");
    // console.log(userGuess, buttonGuess)
    const answer = Math.floor(Math.random() * 20) + 1;
    console.log(answer)
    
    userGuess.addEventListener ("keypress", function (a) {
        if (a.keyCode === 13) // curly braces are not necessary
        validateGuess()
    })
    
    buttonGuess.addEventListener("click", validateGuess);
    
    function validateGuess() {
        const inputNumber = document.querySelector("#input-field").value;
    
        remainingGuesses--; // remove 1 guess each time
        document.querySelector("#remaining-guesses").textContent = remainingGuesses;
    
        previousGuesses.push(inputNumber); // add input to array
        document.querySelector("#previous-guesses").textContent += inputNumber + ", "; // =+ to display guesses one after another
    
        if (remainingGuesses === 0) { // if guesses === 0 - either win or victory
    
            if (Number(inputNumber) === answer){ // Number - to make sure that the input is a number - convert into number
                victory();  
            }
            else {
            Swal.fire({
                title: 'Game over',
                imageUrl: 'https://cdn.glitch.me/b4182d20-b59b-4cd0-a2a4-4595d6af2e44%2Fsad.png?v=1637849119307',
                imageWidth: 180,
                imageHeight: 180,
                imageAlt: 'Victory',
                confirmButtonColor: '#2020FF',
            })
            document.querySelector("#message-box").textContent = "Game over. The right answer was " + answer + "." + " Try again!";
            userGuess.value = '';
            userGuess.setAttribute('disabled', '');
            buttonGuess.setAttribute('disabled', '');
        }
        }
        else {
            
            if (inputNumber < 1 || inputNumber > 20) {
                Swal.fire({
                    icon: 'error',
                    iconColor: '#ffcae3',
                    title: 'Please choose a number between 1 and 20!',
                    confirmButtonColor: '#2020FF',
                })
            }
            else if (isNaN(inputNumber)){
                Swal.fire({
                    icon: 'error',
                    iconColor: '#ffcae3',
                    title: 'Please enter a valid number',
                    confirmButtonColor: '#2020FF',
                })
            }
            else {
                if (inputNumber > answer) {
                    document.querySelector("#message-box").textContent = "The number is too high. Try again!";
                    Swal.fire({
                        title: 'The number is too high. Try again!',
                        confirmButtonColor: '#2020FF',
                    })
                }
                else if (inputNumber < answer) {
                    document.querySelector("#message-box").textContent = "The number is too low. Try again!";
                    Swal.fire({
                        title: 'The number is too low. Try again!',
                        confirmButtonColor: '#2020FF',                
                    })
                }
                else {
                    victory();
                }
            }
        }
    
        userGuess.value = ''; // to empty the field
    }
    
    function victory() { 
        Swal.fire({
            title: 'You win!',
            imageUrl: 'https://cdn.glitch.me/b4182d20-b59b-4cd0-a2a4-4595d6af2e44%2Fwin.png?v=1637849131201',
            imageWidth: 180,
            imageHeight: 180,
            imageAlt: 'Victory',
            confirmButtonColor: '#2020FF',
        })
        document.querySelector("#message-box").textContent = "You win! Want to play again?";
        userGuess.value = '';
        userGuess.setAttribute('disabled', ''); // disable the field and the button after the game is over
        buttonGuess.setAttribute('disabled', '');
    }
    
    newGame.addEventListener("click", () =>{ // restart the game
        location.reload(); //method that reloads the current document
    })
    
    
    