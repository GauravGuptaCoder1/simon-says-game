let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');
let highestScore = 0;

document.addEventListener('keypress',function(){
    if(started == false){
        console.log("Game started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        highestScore = Math.max(highestScore, level);
        h2.innerHTML = `Game Over! Your Highest Score was : <b>${highestScore}</b>. <br>Press any key to start.`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'wheat';
        }, 150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    btnFlash(btn);
    
    let color = btn.getAttribute('id');
    // console.log(color);
    userSeq.push(color);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('button');
for (let btn of allBtns){
    btn.addEventListener('click', btnPress);
}

function reset(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}