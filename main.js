'use strict';
const CARROT_SIZE = 80;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

function initGame() {
    // (거의) 생성된 벌레와 당근을 필드에 올린다.
    console.log(fieldRect);
    addItem('carrot', 5, 'assets/img/carrot.png');
    addItem('bug', 5, 'assets/img/bug.png');
}

function addItem(className, count, imgPath) {
    // 인수를 넘겨서 당근, 벌레의 포지션 랜덤 생성
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    // for문의 목적..? i의 최대 개수 까지 반복하면서 각 요소를 만든다..홀리쓋..
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

initGame();