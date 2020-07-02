const gameContainer = document.getElementById("game");
let preventClick = false
const bestScore = JSON.parse(localStorage.getItem("bestScore")) || []
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

let clickedCard = null
let card2 = null
let combos  = 0
let score = 0
let bestItem = document.getElementById('best').innerText = `Best score ${localStorage.getItem("steps")}`

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let newItem = document.getElementById('bestscore').innerText = `Your score ${score + 1}`
  if (preventClick) return;
  let target = event.target
  event.target.style.backgroundColor = event.target.className

  if(!clickedCard){
    clickedCard = target
    
  }else if(clickedCard){
    preventClick = true
    if(clickedCard.className !== event.target.className){
      preventClick = true
      setTimeout (function(){
        whiteBG(event.target.className)
        whiteBG(clickedCard.className)
        clickedCard = null
        preventClick = false
        score++
      }
      , 1000)
    }else{ 
      clickedCard.removeEventListener("click", handleCardClick);
      event.target.removeEventListener('click',handleCardClick)
      combos++
      score++
      clickedCard = null
        if(combos === 5)
        alert(`YOU finish with ${score} steps`)
        preventClick = false
        if (score > localStorage.getItem("steps")) 
            localStorage.removeItem("steps")
            localStorage.setItem("steps", score.toString())
      }
  }
  console.log("you just clicked", event.target.className);

  function whiteBG(cardColor){
    let whiteAgain = document.getElementsByClassName(cardColor)

    for(let i of whiteAgain){
      i.style.backgroundColor = "white"
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
