// Selecting all rquired elments 

const selectBox = document.querySelector('.select-box'),
selectXBtn = selectBox.querySelector('.player_x'),
selectOBtn = selectBox.querySelector('.player_o'),
playBoard = document.querySelector('.play-board'),
allBox = document.querySelectorAll('section span'),
players = document.querySelector('.players'),
resultBox = document.querySelector('.result-box');
wonText = resultBox.querySelector('.won-text'),
replayBtn = resultBox.querySelector("button");

window.onload = ()=>{ //once window loaded

   for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute('onclick', 'clickedBox(this)');

    }
    selectXBtn.onclick = ()=>{
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
    }

    selectOBtn.onclick = ()=>{
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
        players.setAttribute("class", "players active player");
    }

}

let playerXIcon = 'fas fa-times';
let playerOIcon = 'far fa-circle';
let playerSign = "X";
let runBot = true;

function clickedBox(element){
    
    console.log(element);
    if(players.classList.contains("player")){
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add('active');
        playerSign = "O";
        element.setAttribute("id",playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id",playerSign)
        players.classList.add('active');
        ;
    }
    selectWinner();
    element.style.ponterEvents = "none";
    //playBoard.style.pointerEvents = "none";
    let randomDelaTime = ((Math.random() *100)+ 200).toFixed();

    setTimeout(()=>{
        bot(runBot);
    }, randomDelaTime);
    
}

// bot click fuction
function bot(runBot){
    if(runBot){
        playerSign = "O";
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
           if (allBox[i].childElementCount == 0){
               array.push(i);
               //console.log(i + " " + "has no children");
           } 
        }
    
        let randomBox = array[Math.floor(Math.random() * array.length)];
        //console.log(array);
    
        //console.log(randomBox);
    
        if(array.length > 0 ){
            if(players.classList.contains("player")){
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.remove('active');
    
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
                
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove('active');
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();      
        }
        
        allBox[randomBox].style.pointerEvents = "none";    
        playBoard.style.ponterEvents = "auto";
        playerSign = "X";
    }
}

function getClass(idname){
    return document.querySelector(".box" + idname).id;
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if(checkClass(1,2,3, playerSign)|| checkClass(4,5,6, playerSign) || checkClass(7,8,9, playerSign) || checkClass(1,4,7, playerSign) || checkClass(2,5,8, playerSign) || checkClass(3,6,9, playerSign) || checkClass(1,5,9, playerSign) || checkClass(3,5,7, playerSign)){
        console.log(playerSign+ " " + " is the winner");
        runBot = false;
        bot(runBot);

        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        },700);

            wonText.innerHTML = `El jugador <p>${playerSign}</p> gana el juego!`;
    }else{
        if(getClass(1) != "" &&  getClass(2) != "" &&  getClass(3) != "" &&  getClass(4) != "" &&  getClass(5) != "" &&  getClass(6) != "" &&  getClass(7) != "" &&  getClass(8) != "" &&  getClass(9) != "") {
            runBot = false;
            bot(runBot);

            setTimeout(()=>{
               playBoard.classList.remove("show");
               resultBox.classList.add("show");
            },700);

            wonText.textContent = `Empate!`;
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}

const themeBtn = document.querySelector('.theme-btn');
var ch = false;
//const imagen = document.querySelectorAll('body');

themeBtn.addEventListener('click', () => {

    if (ch == false){
        document.body.classList.toggle('dark-theme');
        document.body.style.backgroundImage = "url('img/Wil_Develope_MarcaP_Fondo-02.png')";

        themeBtn.querySelector('span:first-child').classList.toggle('active');
        themeBtn.querySelector('span:last-child').classList.toggle('active');
        ch = true;

    }else{
        document.body.classList.toggle('dark-theme');
        document.body.style.backgroundImage = "url('img/Wil_Develope_MarcaP_Fondo-01.png')";

        themeBtn.querySelector('span:first-child').classList.toggle('active');
        themeBtn.querySelector('span:last-child').classList.toggle('active');
        ch = false;

    }


})