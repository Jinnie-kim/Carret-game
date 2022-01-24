'use strict';

const backgroundImg = document.querySelector('.background-img');
const playBtn = document.querySelector('.play-btn');
const playBugs = document.querySelectorAll('.play-bug');
const reloadBtn = document.querySelectorAll('.play-reload');
const playCarrots = document.querySelectorAll('.play-carrot');
const playAlert = document.querySelector('.play-alert');
const playAlertLose = document.querySelector('.play-alert-lose');

const fullWidth = backgroundImg.clientWidth;
const fullHeight = backgroundImg.clientHeight;

// 벌레랑 당근 불러오기 (화면 밖으로 빠져나가는 것들은 어케 잡냐?)
playBtn.addEventListener('click', () => {
    playBugs.forEach(div => {
        div.classList.add('played-bug');
    })
    for (let i=0; i< playBugs.length; i++) {
        const playBug = playBugs[i];

        const randomTop = getRandomNumber(0, fullHeight);
        const randomLeft = getRandomNumber(0, fullWidth);
        

        playBug.style.top = `${randomTop}px`;
        playBug.style.left = `${randomLeft}px`;
    }
    playCarrots.forEach(div => {
        div.classList.add('played-carrot');
    })
    for(let a=0; a < playCarrots.length; a++) {
        const playCarrot = playCarrots[a];

        const randomTop = getRandomNumber(0, fullHeight);
        const randomLeft = getRandomNumber(0, fullWidth);
        

        playCarrot.style.top = `${randomTop}px`;
        playCarrot.style.left = `${randomLeft}px`;
    }
})

function getRandomNumber(max, min) {
    return Math.random() * (max - min) + min;
}

playCarrots.forEach(div => {
    div.addEventListener('click', () => {
        div.classList.add('remove');
    })
})

// 재생버튼 누르면 정지버튼으로 변경하기 
playBtn.addEventListener('click', () => {
    playBtn.innerHTML = `
            <button type="button">
                <i class="fas fa-stop"></i>
            </button>
    `
})

// 벌레 잡으면 팝업 창 띄우기 + 타이머도 멈춰야하는데 타이머 어째 작동시키냐 
playBugs.forEach(div => {
    div.addEventListener('click', () => {
        playAlertLose.classList.add('show');
    })
})

// 타이머 시작하기
function popLoseAlert() {
    playAlertLose.classList.add('show');
}

playBtn.addEventListener('click', () => {
    setTimeout(popLoseAlert, 10000);
})

// 당근 다 잡으면 팝업 창 띄우기 
if(playCarrots.forEach(div => {
    div.classList.contains('remove');
})) {
    playAlert.classList.add('show');
};


reloadBtn.forEach(button => {
    button.addEventListener('click', () => {
    window.location.reload();
    })
})