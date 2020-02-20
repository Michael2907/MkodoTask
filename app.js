// Starting deck of cards
var deckOfCards = [
    // Ace
    { id: 0, card: "AS" },
    { id: 1, card: "2S" },
    { id: 2, card: "3S" },
    { id: 3, card: "4S" },
    { id: 4, card: "5S" },
    { id: 5, card: "6S" },
    { id: 6, card: "7S" },
    { id: 7, card: "8S" },
    { id: 8, card: "9S" },
    { id: 9, card: "10S" },
    { id: 10, card: "JS" },
    { id: 11, card: "QS" },
    { id: 12, card: "KS" },

    // Hearts
    { id: 13, card: "AH" },
    { id: 14, card: "2H" },
    { id: 15, card: "3H" },
    { id: 16, card: "4H" },
    { id: 17, card: "5H" },
    { id: 18, card: "6H" },
    { id: 19, card: "7H" },
    { id: 20, card: "8H" },
    { id: 21, card: "9H" },
    { id: 22, card: "10H" },
    { id: 23, card: "JH" },
    { id: 24, card: "QH" },
    { id: 25, card: "KH" },

    // Clubs
    { id: 26, card: "AC" },
    { id: 27, card: "2C" },
    { id: 28, card: "3C" },
    { id: 29, card: "4C" },
    { id: 30, card: "5C" },
    { id: 31, card: "6C" },
    { id: 32, card: "7C" },
    { id: 33, card: "8C" },
    { id: 34, card: "9C" },
    { id: 35, card: "10C" },
    { id: 36, card: "JC" },
    { id: 37, card: "QC" },
    { id: 38, card: "KC" },

    // Diamonds
    { id: 39, card: "AD" },
    { id: 40, card: "2D" },
    { id: 41, card: "3D" },
    { id: 42, card: "4D" },
    { id: 43, card: "5D" },
    { id: 44, card: "6D" },
    { id: 45, card: "7D" },
    { id: 46, card: "8D" },
    { id: 47, card: "9D" },
    { id: 48, card: "10D" },
    { id: 49, card: "JD" },
    { id: 50, card: "QD" },
    { id: 51, card: "KD" },
];
let cardPile = [];
// players
let playerOne = { name: "George" };
let playerTwo = { name: "Desmond" };
let gameInPlay = false;
let playerInPlay

// begins game
startGame();

function startGame() {
    gameInPlay = true;
    whosTurn = 0
    // runs until winner or draw
    while (gameInPlay == true) {
        // who's turn is it
        if (whosTurn == 0) {
            playerInPlay = playerOne;
            whosTurn = 1;
        }
        else {
            playerInPlay = playerTwo;
            whosTurn = 0;
        }
        // player takes card
        let card = playerTakeCard(playerInPlay.name)
        // player adds to deck
        addCardToPile(card);
        // checks if all cards have been taken
        checkIfDraw();
    }
}

// adds card to plile
function addCardToPile(card) {
    cardPile.push(card);
    // needs to be more than 1 card in order for there to be a snap
    if (cardPile.length > 2) {
        checkIfSnap();
    }
}

// checks if there is a snap
function checkIfSnap() {
    // check if number or A, J, Q or K
    aceCard = cardPile[cardPile.length - 1].card.includes("A")
    jackCard = cardPile[cardPile.length - 1].card.includes("J")
    queenCard = cardPile[cardPile.length - 1].card.includes("Q")
    kingCard = cardPile[cardPile.length - 1].card.includes("K");

    // Number
    if (!aceCard && !jackCard && !queenCard && !kingCard) {
        // split up card to get number 
        cardNumber = cardPile[cardPile.length - 1].card.match(/\d+/)[0]
        previousAceCard = cardPile[cardPile.length - 2].card.includes("A")
        previousJackCard = cardPile[cardPile.length - 2].card.includes("J")
        previousQueenCard = cardPile[cardPile.length - 2].card.includes("Q")
        previousKingCard = cardPile[cardPile.length - 2].card.includes("K");

        // Previous is also Number
        if (!previousAceCard && !previousJackCard && !previousQueenCard && !previousKingCard) {

            previousCardNumber = cardPile[cardPile.length - 2].card.match(/\d+/)[0]

            if (cardNumber == previousCardNumber) {
                snap();
            }
        }
    } // Not a number
    else {

        previousAceCard = cardPile[cardPile.length - 2].card.includes("A")
        previousJackCard = cardPile[cardPile.length - 2].card.includes("J")
        previousQueenCard = cardPile[cardPile.length - 2].card.includes("Q")
        previousKingCard = cardPile[cardPile.length - 2].card.includes("K");

        // Previous is also NOT Number
        if (previousAceCard || previousJackCard || previousQueenCard || previousKingCard) {

            if (aceCard == true && previousAceCard == true || jackCard == true && previousJackCard == true || queenCard == true && previousQueenCard == true || kingCard == true && previousKingCard == true) {
                snap();
            }
        }
    }
}

function snap() {
    let playerOneTime = Math.random();
    let playerTwoTime = Math.random();

    if (playerTwoTime > playerOneTime) {
        console.log("SNAP! " + playerOne.name + " is the winner!!");
    }
    else {
        console.log("SNAP! " + playerTwo.name + " is the winner!!")
    }
    gameInPlay = false;
}

function playerTakeCard(playerName) {
    let index = Math.floor(Math.random() * deckOfCards.length)
    cardTaken = deckOfCards[index];

    deckOfCards.splice(index, 1)

    console.log(playerName + " turns card " + cardTaken.card);
    console.log("____________________________");

    return cardTaken;
}

function checkIfDraw() {
    if (deckOfCards.length == 0) {
        console.log("game is over and is a draw");
        gameInPlay = false
    }
}

