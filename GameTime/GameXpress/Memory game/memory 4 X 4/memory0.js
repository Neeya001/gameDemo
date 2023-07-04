var errors = 0;
var cardList = [
    "mediumpurple",
     "lime", 
     "aqua",
      "darkgoldenrod",
       "pink",
        "darkcyan",
          "burlywood",
            "red"
        ];
var cardSet;
var board = [];
var rows = 4;
var columns = 4;
var scard1;
var scard2;
window.onload = function(){
    shuffleCards();
    startGame();
}
function shuffleCards(){
    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet);
    //shuffle
    for(let i =0; i<cardSet.length; i++){
        let j = Math.floor(Math.random() * cardSet.length);//get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;

    }
    console.log(cardSet);
}
function startGame(){ 
    //arrange the board
    for(let r =0; r<rows; r++){
        let row = [ ];
        for(let c =0; c<columns; c++){
            let cardColor = cardSet.pop();
            row.push(cardColor);
            //<div id="0-0" class="card" style:"background-color:red;">
            const card = document.createElement("div");
            card.id = r.toString()+"-"+c.toString();
            card.style.backgroundColor = cardColor;
            card.classList.add("card");
            card.addEventListener("click",selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 1000);
}
function hideCards(){
    for(let r = 0; r<rows; r++){
        for(let c = 0; c<columns; c++){
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.style.backgroundColor = "white";
        }
    }
}
function selectCard(){
    if(this.style.backgroundColor.includes("white")){
        if(!scard1){
            scard1 = this;
            let coords = scard1.id.split("-"); //"0-1"-> ["0","1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            scard1.style.backgroundColor = board[r][c] ;
        }
        else if(!scard2 && this != scard1){
            scard2 = this;
            let coords = scard2.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            scard2.style.backgroundColor= board[r][c] ;
            setTimeout(update, 1000);
        }
    }
}
function update(){
    //if cards aren't the same, flip both back
    if(scard1.style.backgroundColor != scard2.style.backgroundColor){
        scard1.style.backgroundColor = "white";
        scard2.style.backgroundColor = "white";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    if(errors >=3){
        document.getElementById("errors").innerText = "Game Over";
        var result = window.alert("Game Over ", "Do you want to play the game again?");
      }
    scard1 = null;
    scard2 = null;
}
//popup
function showPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
  }
  
  function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
  }