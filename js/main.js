import {
    resetWinCounter,
    resetPlayingField,
    createMatrix,
    updateСell,
    resetPlayingMatrix,
    resetGameCells,
    n,
    k,
} from './gameLogic';


export const playingField = document.querySelector('.playing__field');

const gameMenu = document.querySelector('.menu-section');

const cell = document.querySelector('#cell');

const playButton3x3 = document.querySelector('.button-play-3x3');
const playButtonNxN = document.querySelector('.button-play-NxN');
const buttonPlayAgain = document.querySelector('.button-play-again');
const restartButton = document.querySelector('.img-restart');

const conditionForNxN = document.querySelector('.condition-for-NxN');
const goButton = document.querySelector('.btn-go')


let fieldOfСrosses = [];
let fieldOfZeros = [];

/**
 * Функция для работы с табами
 * @param {*} btn 
 * @returns 
 */
function makeTabActive(btn) {
    const menu = document.querySelector('.menu-list');
    const activeBtn = menu.querySelector('.active');
    
    if (btn.classList.contains('active-game')) {
        btn.classList.toggle('active-game');
        return;
    }

    if (activeBtn) {
        resetPlayingField(playingField, gameMenu);

        if (btn === activeBtn) {
            activeBtn.classList.remove('active');
            return;
        }
        else {
            activeBtn.classList.remove('active');
            btn.classList.add('active')
            //makeButtonActive(btn);
        }

    } else {
        btn.classList.add('active')
        //makeButtonActive(btn);
    }
}

function createPlayingField(playingField, n, cell, k, btn) {
    fieldOfСrosses = createMatrix(n);
    fieldOfZeros = createMatrix(n);


    for (let i = 0; i < n; i++) {

        let tr = document.createElement('tr');

        for (let j = 0; j < n; j++) {

            let td = cell.content.cloneNode(true).firstElementChild;

            td.dataset.index = `${i}${j}`;

            tr.appendChild(td)


            td.addEventListener('click', (event) => updateСell(event, i, j, fieldOfСrosses, fieldOfZeros, playingField, k));

        }
        playingField.appendChild(tr);


    };

    gameMenu.classList.remove('hidden');

};

playButton3x3.addEventListener('click', (e) => {
    //  controlActiveBtn(e.target);
    k = 3;
    createPlayingField(playingField, 3, cell, k, e.target);
    makeTabActive(e.target);
    conditionForNxN.classList.add('hidden');
});


playButtonNxN.addEventListener('click', (e) => {

    resetPlayingField(playingField, gameMenu);
    makeTabActive(e.target);
    conditionForNxN.classList.toggle('hidden');

});

goButton.addEventListener('click', () => {

    n = + document.querySelector('.input-for-N').value;
    k = + document.querySelector('.input-for-K').value;

    if (n == 0 || k == 0) {
        alert('Некорректные данные!')
        return;
    }

    conditionForNxN.classList.add('hidden');
    playButtonNxN.classList.add('active-game');

    createPlayingField(playingField, n, cell, k, playButtonNxN);
})

restartButton.addEventListener('click', () => {

    restartButton.classList.toggle('rotate');
    resetWinCounter();

});

buttonPlayAgain.addEventListener('click', () => {

    fieldOfСrosses = resetPlayingMatrix(fieldOfСrosses);
    fieldOfZeros = resetPlayingMatrix(fieldOfZeros);

    resetGameCells(playingField);

});