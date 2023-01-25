// Window onload event triggers my game logic to prepare for play
window.onload = function () {
    console.log("Welcome to Numbricks!");

// Variable Declarations for game

let playing = false;
  const history = [];
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  const input = document.getElementById("guess");
  const feedbackP = document.getElementById("feedback");
  const historyP = document.getElementById("history");
  const timeP = document.getElementById("time");
  const btn = document.getElementById("guess-btn");
  const quitBtn = document.getElementById("quit-btn");

  btn.addEventListener("click", startGame);
  quitBtn.addEventListener("click", endGame);

  function startGame() {

    // Change playing status to true

    playing = true;

    // Change btn text

    btn.textContent = "Guess";

    // Enable input

    input.disabled = false;

    btn.removeEventListener("click", startGame);
    btn.addEventListener("click", guess);

    // Start game clock

    const duration = setInterval(clock, 1000);

    function guess() {
      if (playing) {
        giveFeedback(input.value);
      }
    }

    function clock() {
        if (playing) {
          seconds++;
        }
        if (seconds > 59) {
          seconds = 0;
          minutes++;
        } else if (minutes > 59) {
          seconds = 0;
          minutes = 0;
          hours++;
        } else if (hours > 24 || !playing) {
          clearInterval(duration);
        }
        timeP.textContent = `${hours
          .toString()
          .padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      }
    }

    function endGame() {
        if (playing) {
          playing = false;
          btn.addEventListener("click", startGame);
    
          btn.textContent = "Start";
          input.disabled = true;
          feedbackP.textContent = "Guess a whole number between 1 and 100";
          historyP.textContent = "-";
          timeP.textContent = "00:00:00";
          seconds = 0;
          minutes = 0;
          hours = 0;
        }
      }
}