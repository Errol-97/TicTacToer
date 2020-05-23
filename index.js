let tds = document.querySelectorAll("td");
let txt = document.getElementById("winnerText");
let reset = document.getElementById("rst");
let gameWon = false;
let counter = 0;

function sameCol(lis){
    for(let i =0; i<lis.length -1; i= i+2){
        let j = i +1;
        x= lis[i];
        y =lis[j];
        z= lis[lis.length-1];
        if(tds[x].classList.length !== 0 && tds[x].classList.item(0) === tds[y].classList.item(0) && tds[z].classList.item(0) === tds[y].classList.item(0)){
            console.log('Winning case found at squares ' + x + ' and ' +y);
            console.log('x: ' + tds[x].classList.item(0));
            console.log('y: ' + tds[y].classList.item(0));
            return true;
        } else {
            console.log('No winning cases found at squares ' + z + ', ' + x + ' and ' +y);
        }
        

    }
    console.log('-------------------');
    
    return false;
}

let currentPlayer = 'x';

for(let i = 0; i< tds.length; i++){
    tds[i].addEventListener("mouseover", function(){
        if(currentPlayer === 'x' && !(this.classList.contains('xplayerclick') || this.classList.contains('oplayerclick'))){
            this.classList.add("xplayer");
        } else if(currentPlayer === 'o' && !(this.classList.contains('xplayerclick') || this.classList.contains('oplayerclick'))){
            this.classList.add("oplayer");
        }
    });

    tds[i].addEventListener("mouseout", function(){
        if(currentPlayer === 'x' && !(this.classList.contains('xplayerclick') || this.classList.contains('oplayerclick'))){
            this.classList.remove("xplayer");
        } else if(currentPlayer === 'o' && !(this.classList.contains('xplayerclick') || this.classList.contains('oplayerclick'))){
            this.classList.remove("oplayer");
        }
    });

    tds[i].addEventListener("click", function(){
        if(counter === 8  && !gameWon){
            txt.innerHTML = 'It\'s a draw';
            console.log('It\'s a draw');
            txt.classList.add("draw");
        }else if(currentPlayer === 'x' && !gameWon && !( this.classList.contains("xplayerclick") || this.classList.contains("oplayerclick"))){
            this.classList.add("xplayerclick");
            counter++
            if(checkWinner(i, currentPlayer)===true) return;
            currentPlayer = 'o' ;
        } else if(currentPlayer === 'o' &&  !gameWon && !( this.classList.contains("xplayerclick") || this.classList.contains("oplayerclick"))){
            this.classList.add("oplayerclick");
            counter++
            if(checkWinner(i, currentPlayer)===true) return;
            currentPlayer = 'x';
        }
        
    
        
    });


}//end of board listeners



function resetGame(){
    counter = 0;
    gameWon = false;
    txt.innerHTML = 'Let\'s play Tic Tac Toe!';
    txt.classList.remove('draw');
    txt.classList.remove('xplayer');
    txt.classList.remove('oplayer');
    for(let i = 0; i< tds.length; i++){
        tds[i].classList.remove('xplayerclick');
        tds[i].classList.remove('oplayerclick');
        tds[i].classList.remove('xplayer');//idk why it is adding these
        tds[i].classList.remove('oplayer');//idk why it is adding these
        // console.log(tds[i].classList.length);
    }
}

//reset button
reset.addEventListener("click", function(){
    resetGame();
    // console.log('reset button clicked');
});

function checkWinner(place,  player){
    let win;
    switch(place){
        case 0: 
            win = sameCol([1,2,4,8,3,6,0]);
            break;
        case 1: 
            win = sameCol([0,2,4,7,1]);
            break;
        case 2: 
            win = sameCol([0,1,5,8,4,6,2]);
            break; 
        case 3: 
            win = sameCol([0,6,4,5,3]);
            break; 
        case 4: 
            win = sameCol([3,5,1,7,4]);
            break;
        case 5: 
            win = sameCol([2,8,3,4,5]);
            break;
        case 6: 
            win = sameCol([2,4,0,3,7,8,6]);
            break;
        case 7: 
            win = sameCol([1,4,6,8,7]);
            break;
        case 8: 
            win = sameCol([0,4,6,7,2,5,8]);
            break;
    }
    if(win === true){
        gameWon = true;
        txt.innerHTML = "Winner is "+ player.toUpperCase();
        if(player === 'x'){
            txt.classList.add("xplayer")
        } else {
            txt.classList.add("oplayer")
        }
        
    }
    return false;
}