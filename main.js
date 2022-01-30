'use strict';
const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const gamePopup = document.querySelector('.pop-up');
const gamePopupText = document.querySelector('.pop-up__message');
const gamePopupRefresh = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('./assets/sound/carrot_pull.mp3');
const bgSound = new Audio('./assets/sound/bg.mp3');
const bugSound = new Audio('./assets/sound/bug_pull.mp3');
const alertSound = new Audio('./assets/sound/alert.wav');
const winSound = new Audio('./assets/sound/game_win.mp3');

// 게임의 상태를 기억하고 있는 변수가 필요 (전역변수)
let started = false;
let score = 0; 
let timer = undefined;

field.addEventListener('click', onFeildClick);

gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
    // started = !started; // 버튼 클릭할때마다 게임의 상태를 바꿔주는 것 개별 함수안에 넣어줌 
})

gamePopupRefresh.addEventListener('click', () => {
    startGame();
    showStopButton();
    hidePopup();
})

function startGame() {
    started = true;
    playSound(bgSound);
    initGame();
    showStopButton();
    showTimerandScore();
    startGameTimer();  
}

// 단순 스탑게임. 내가 스탑버튼 눌렀을 때 일어나는 일인거시야.
function stopGame() {
    started = false;
    stopSound(bgSound);
    playSound(alertSound);
    stopGameTimer();
    hideGameStopButton();
    showPopupWithText('REPLAY❓');
}

function finishGame(win) {
    started = false;
    stopSound(bgSound);
    playSound(win? winSound : bugSound);
    hideGameStopButton();
    stopGameTimer();
    showPopupWithText(win? 'YOU WON🎉' : 'YOU LOSE💩')
}

function showStopButton() {
    gameBtn.style.visibility = 'visible';
    const icon = document.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameStopButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerandScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT == score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function showPopupWithText(text) {
    gamePopupText.innerText = text;
    gamePopup.classList.remove('pop-up--hide');
}

function hidePopup() {
    gamePopup.classList.add('pop-up--hide');
}

function initGame() {
    field.innerHTML = '';
    score = 0;
    gameScore.innerText = CARROT_COUNT; 
    // (거의) 생성된 벌레와 당근을 필드에 올린다.
    addItem('carrot', CARROT_COUNT, 'assets/img/carrot.png');
    addItem('bug', BUG_COUNT, 'assets/img/bug.png');
}

function onFeildClick(event) {
    // 함수 안에서 조건이 맞지 않을 때, 빨리 함수를 리턴하는 것이 중요하다. 
    // 게임이 시작된 상태에서만 밑의 기능들을 실행할 수 있도록 하는 것.
    if(!started) {
        return;
    }
    const target = event.target;
    if(target.className == 'carrot') {
        target.remove();
        score++;
        playSound(carrotSound);
        updateGameScore();
        if(score == CARROT_COUNT) {
            finishGame(true);
        }
    } else if(target.className == 'bug') {
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}


function updateGameScore() {
    gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
    // 버튼을 눌러서 게임을 재시작할때마다 필드 비워주기 
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

