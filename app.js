
let word = document.getElementById('game-word');
 
let hint = document.getElementById('game-hint');
let wordsArr = ['dog', 'giraffe', 'cake', 'window', 'bed', 'phone'];
let wordsHintArr = ['Pretty four legs','Tall four legs', 'Sweet guilt', 'See through', 'Flat and soft', 'Talks all the time'];
let letterButtons =  document.querySelectorAll('.letter-button');
let guesses = document.getElementById('game-guesses');
let image = document.getElementById('game-img');
let guessesCount = 6;
let imgCount = 1;
let reset = document.getElementById('button-reset');
let mainTag =  document.getElementById('body');
 
let container = document.getElementById('container');
let  random = Math.floor(Math.random() * wordsArr.length + 0);

 

// Non repeating random numbers - Session Storage

let getItem = JSON.parse(window.sessionStorage.getItem('randoms')); 
let setItem;

while(getItem !== null && getItem[getItem.length-1] == random) {
    random = Math.floor(Math.random() * wordsArr.length + 0);
        
}


if(getItem === null) {
    setItem = window.sessionStorage.setItem('randoms', JSON.stringify([random]));
    
} else {
    getItem.push(random);
    setItem = window.sessionStorage.setItem('randoms', JSON.stringify(getItem));
}


const pageLoad = function() {

    // Generate word
    hint.textContent = wordsHintArr[random];  
    let letter;

    for(i=0; i < wordsArr[random].length; i++) { 
        letter = document.createElement('span');
        letter.classList.add('game-letter');
        letter.textContent =`${wordsArr[random][i]}`;
        letter.style.color = 'transparent';
        letter.style.marginRight = '1rem';
        letter.style.borderBottom = '2px solid white';
        
        word.appendChild(letter); 
             
    }

    let gameLetters = document.querySelectorAll('.game-letter');
    
    
    // Click & guesses left

    const clickLetter = function(e) {
         
        let gameLettersArr = Array.from(gameLetters);
         
        if(!(gameLettersArr.some((item,index) => e.target.textContent === item.textContent))) {
            guessesCount--;
            guesses.textContent = `${guessesCount} guesses left`;
            imgCount++;
            image.src = `./images/${imgCount}.PNG`; 
            e.target.disabled = true;
              
        }
        
        
        for(let i=0; i < gameLetters.length; i++) {
            if(e.target.textContent === gameLetters[i].textContent) {
                gameLetters[i].style.color = 'white';
                e.target.disabled = true;
                
            } 
   
        }

         
        // Winner

        if ((gameLettersArr.some((item,index) => item.style.color === 'transparent') && guessesCount === 0)) {
             
            letterButtons.forEach((item,index) => item.disabled = true);
            guesses.textContent = "Oops! You died";  
             
        } else if (gameLettersArr.every((item,index) => item.style.color === 'white')) {
            letterButtons.forEach((item,index) => item.disabled = true);  
            guesses.textContent = "Cogratulations! You won!";
            container.style.backgroundImage = "url('./images/background.gif')";
        }
        
         
    }

    letterButtons.forEach((item,index) => item.addEventListener('click', clickLetter));
      
}

window.addEventListener('load', pageLoad);
 


// Reset game
    
const resetGame = function() {
     
    window.location.reload();
     
}

reset.addEventListener('click', resetGame);


 

 
 

 