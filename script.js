// Get the card elements
const cards = document.querySelectorAll('.card');

// Variable to track the open cards
let openCards = [];

// Variable to track the number of moves
let moves = 0;

// Variable to track the number of matched pairs
let matchedPairs = 0;

// Variable to track the timer
let timerInterval;
let time = 0;

// Variable to track the star rating
let starRating = 3;

// Get the elements for moves, star rating, and timer
const movesElement = document.getElementById('move-step');
const starRatingElement = document.getElementById('Starrating');
const timerElement = document.getElementById('timer');

// Function to handle card click
function handleCardClick() {
  // Check if the card is already matched or open
  if (this.classList.contains('matched') || this.classList.contains('open')) {
    return;
  }

  // Flip the card
  this.classList.add('open');

  // Add the card to the list of open cards
  openCards.push(this);

  // Check if two cards are open
  if (openCards.length === 2) {
    // Disable clicking on other cards
    cards.forEach(card => card.removeEventListener('click', handleCardClick));

    // Increment the number of moves
    moves++;
    movesElement.textContent = moves;

    // Check if the open cards match
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      // Cards match
      openCards.forEach(card => card.classList.add('matched'));
      matchedPairs++;

      // Check if all pairs are matched
      if (matchedPairs === 6) {
        // Stop the timer
        clearInterval(timerInterval);

        // Display game completion message
        setTimeout(() => {
          alert(`Congratulations! You won the game in ${moves} moves and ${time} seconds.`);
        }, 500);
      }
    } else {
      // Cards do not match
      setTimeout(() => {
        openCards.forEach(card => card.classList.remove('open'));
        openCards = [];
      }, 1000);
    }

    // Enable clicking on other cards
    setTimeout(() => {
      cards.forEach(card => card.addEventListener('click', handleCardClick));
    }, 1000);
  }
}

// Function to start the game
function startGame() {
  // Shuffle the cards
  const shuffledCards = Array.from(cards).sort(() => Math.random() - 0.5);

  // Reset the game state
  openCards = [];
  moves = 0;
  matchedPairs = 0;
  starRating = 3;

  // Reset the moves element
  movesElement.textContent = moves;

  // Reset the star rating element
  starRatingElement.textContent = "*";

  // Reset the timer
  clearInterval(timerInterval);
  time = 0;
  timerElement.textContent = time;

  // Add event listeners to the cards
  cards.forEach(card => {
    card.addEventListener("click", handleCardClick);
    card.classList.remove("open", "matched");
  });

  // Start the timer
  timerInterval = setInterval(() => {
    time++;
    timerElement.textContent = time;
  }, 1000);
}

// Event listener for the start button
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);