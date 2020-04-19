document.addEventListener('DOMContentLoaded', () => { 

// card options
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

// shuffle the images
cardArray.sort( () => 0.5 - Math.random());

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector('#result');
var cardsChosen = [];
var cardsChosenId = [];  
var cardsWon = [];
var count = 0;    
    
// create the board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}
    
// check for matches
function checkForMatch() {
    var cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    var message = '<br />';
    if (cardsChosen[0] === cardsChosen[1]) {
        message += 'You found a match';
        cards[optionOneId].style = "transform: scaleX(-1)";
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].style = "transform: scaleX(-1)";
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].style = "transform: scaleX(-1)";
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].style = "transform: scaleX(-1)";
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        message += 'Sorry, try again';
    }
    cardsChosen = [];
    cardsChosenId = [];
    // used innerHTML in order for <br> to work
    resultDisplay.innerHTML = cardsWon.length + message;

    setTimeout(() => {resultDisplay.textContent = cardsWon.length}, 1500);
    
    if (cardsWon.length === cardArray.length/2) {
        resultDisplay.parentElement.innerHTML = 'Congratulations! You found them all!';
        
        //moves count
        var btn = document.querySelector('#restart');
        var countElement = document.createElement("p");
        countElement.innerHTML = "Score: " + cardsWon.length + ". With a total number of clicks: " + count + "<br /><br />";
        countElement.style.textAlign = 'center';
        countElement.style.fontSize = '2em';
        btn.before(countElement);
        
        // remove the board
        let boardDiv = document.querySelector('.grid');
        boardDiv.remove(); 
    }
}
    
// flip the card
function flipCard() {
    
    var cardId = this.getAttribute('data-id');
    // check to see if you clicked on a fliped card
    if (cardsChosenId.includes(cardId)) {
        this.style = "transform: scaleX(1)";
        this.setAttribute('src', 'images/blank.png');
        cardsChosenId.splice(cardsChosenId.indexOf(cardId), 1);
        cardsChosen.splice(cardsChosen.indexOf(cardArray[cardId].name), 1);
    } else if (this.getAttribute('src') !== 'images/white.png' ) { // check to see if the card is empty
        count++;
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.style = "transform: scaleX(-1)";
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}
    
createBoard(); 
})























