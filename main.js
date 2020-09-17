let score = {
  clicks: 0,
  gamesPlayed: 0,
  averageGuesses: 0,
  firstGuessCorrect: 0,
};

let gameInProgress = true;
let numSquares = 6;
let veryHard = !true;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove('selected')
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      veryHard = this.textContent === "Very Hard"
      reset();
    });
  }

  for (let i = 0; i < squares.length; i++) {
    // add click listeners to squares
    squares[i].addEventListener("click", function () {
      if(!gameInProgress) return
      
      score.clicks += 1
      //grab color of clicked square
      const clickedColor = this.style.background;
      
      if (clickedColor === pickedColor) {
        
        gameInProgress = !true
        score.gamesPlayed += 1;
        
        if(!gameInProgress){
          if (score.averageGuesses != 0) {
            score.averageGuesses = ((score.averageGuesses + score.clicks) / 2);
          } else score.averageGuesses = score.clicks;
  
          if (score.clicks == 1) score.firstGuessCorrect += 1;
        } 
        messageDisplay.textContent = "Correct!";

        changeColors(clickedColor);
        h1.style.background = clickedColor;
        resetButton.textContent = "Play Again?";

        console.log("Score: ", score);
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
  reset();
}

function reset() {
  
  gameInProgress = true
  score.clicks = 0
  // generate all new colors
  if(!veryHard) colors = generateRandomColors(numSquares)
  else colors = generateCloselyRandomColors(numSquares)
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked Color
  colorDisplay.textContent = pickedColor;

  messageDisplay.textContent = "";
  //change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  // Reset Button Name
  resetButton.textContent = "New Colors";
  // Reset h1 background
  h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function () {
  reset();
});

function changeColors(color) {
  //loop through all squares
  for (let i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.background = color;
  }
}

function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // make an array
  let arr = [];
  // repeat num times
  for (let i = 0; i < num; i++) {
    // get random color and push into arr
    arr.push(randomColor());
  }
  // return that array at the end
  return arr;
}

const generateCloselyRandomColors = numSquares => {
  
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  
  let arr = [`rgb(${r}, ${g}, ${b})`]
    
  for (let i = 1; i < numSquares; i++) {
    
    let color = [];
    
    for(let i = 0; i < 3; i++){
      
      let posNeg = (Math.random() * 2) > 1 ? -1 : 1
      let diff = posNeg * (Math.floor(Math.random() * 105))
      
      let x = r + diff > 255 ? 255 : r + diff
      let y = g + diff > 255 ? 255 : g + diff
      let z = b + diff > 255 ? 255 : b + diff
      
      switch(i){
        case 0:
          color.push(Math.abs(x));
          break;
        case 1:
          color.push(Math.abs(y))
          break;
        case 2:
        default:
          color.push(Math.abs(z))
      }
    }
    
    let colorString = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    
    if(arr.indexOf(colorString) == -1) arr.push(colorString);
    else i = i - 1
  }
    
  return arr
}

function randomColor() {
  // pick a "red" from 0-255
  const r = Math.floor(Math.random() * 256);
  // pick a "green" from 0-255
  const g = Math.floor(Math.random() * 256);
  // pick a "blue" from 0-255
  const b = Math.floor(Math.random() * 256);
  
  
  
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
