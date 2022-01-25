'use strict';
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

// 게임의 상태를 기억하고 있는 변수가 필요

let started = false;
let score = 0; 
let timer = undefined;

gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started; // 버튼 클릭할때마다 게임의 상태를 바꿔주는 것
})


function startGame() {
    initGame();
    showStopButton();
    showTimerandScore();
    startGameTimer();
}

function stopGame() {

}

function showStopButton() {
    const icon = document.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showTimerandScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}






function initGame() {
    // (거의) 생성된 벌레와 당근을 필드에 올린다.
    addItem('carrot', 5, 'assets/img/carrot.png');
    addItem('bug', 5, 'assets/img/bug.png');
}

function addItem(className, count, imgPath) {
    // 인수를 넘겨서 당근, 벌레의 포지션 랜덤 생성
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    // for문의 목적..? i의 최대 개수 까지 반복하면서 각 요소를 만들고 동시에 랜덤좌표 할당..홀리쓋..
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;        
}

