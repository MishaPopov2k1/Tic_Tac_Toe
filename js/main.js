import {
  checkCellForFullness,
  setGameConditionsFor3x3,
  n,
  k,
  setGameConditionsForNxN,
  closeSettingModal,
  buttonSettingField,
} from './settingField';

import {sendFieldSizesForStart as sendConditionForStart, resetPlayingMatrix} from '../API/sendGameState';
import {getTitle} from '../API/getData.js';
import {openModal} from './modal';

// import {getName} from './chat';

import {resetGameCells, resetWinCounter, resetPlayingField} from './draw';

export const playingField = document.querySelector('.playing__field');

const gameMenu = document.querySelector('.playing__field-wrapper');
const whoseMove = document.querySelector('.whose-move-text');
export const cell = document.querySelector('#cell');

const playButton = document.querySelector('.button-play');
// const playButtonNxN = document.querySelector('.button-play-NxN');
const playAgainButton = document.querySelector('.button-play-again');
const restartButton = document.querySelector('.img-restart');
const playOnlineButton = document.querySelector('.img-play-online');

export const conditionForNxN = document.querySelector('.condition-for-NxN');
const goButton = document.querySelector('.btn-go');


const titleElement = document.querySelector('.title__tic-tac-toe');


// const additionalBtns = document.querySelector('.additional-btn');

getTitle().then((title) => (
  titleElement.innerHTML = title
));

/**
 * Функция для работы с табами
 * s
 * @param {HTMLElement} btn
 */
function makeTabActive(btn) {
  const menu = document.querySelector('.menu-list');
  const activeBtn = menu.querySelector('.active');

  if (btn.classList.contains('active-game')) {
    btn.classList.toggle('active-game');
    return;
  }

  if (activeBtn) {
    if (btn === activeBtn) {
      activeBtn.classList.remove('active');
      resetPlayingField(playingField, gameMenu, whoseMove);
      return;
    } else {
      activeBtn.classList.remove('active');
      btn.classList.add('active');
    }
  } else {
    btn.classList.add('active');
  }
};

export function createPlayingField(playingField, n, cell, k) {
  for (let i = 0; i < n; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < n; j++) {
      const td = cell.content.cloneNode(true).firstElementChild;

      td.dataset.index = `${i}${j}`;

      const cellСoordinates = {
        coordinates: {
          line: i,
          column: j,
        },
      };


      tr.appendChild(td);

      td.addEventListener('click', (event) => {
        const cell = event.target;
        /* if ( */checkCellForFullness(cellСoordinates, cell); /* != true) {
          sendCoordinatesOfMove(cellСoordinates);
        } */
      });
      playingField.appendChild(tr);
    };

    gameMenu.classList.remove('hidden');
    whoseMove.classList.remove('hidden');
  };
}


playButton.addEventListener('click', (e) => {
  if (e.target.classList.contains('active')) {
    resetPlayingField();
    gameMenu.classList.add('hidden');
    whoseMove.classList.add('hidden');
    e.target.classList.remove('active');
  } else {
    setGameConditionsFor3x3();
    createPlayingField(playingField, n, cell, k);
    sendConditionForStart({n, k});
    makeTabActive(e.target);
  }
  // getName();
});


/* playButtonNxN.addEventListener('click', (e) => {
  resetPlayingField(playingField, gameMenu);
  makeTabActive(e.target);
  conditionForNxN.classList.toggle('hidden');
}); */

goButton.addEventListener('click', () => {
  if (setGameConditionsForNxN() === true) {
    resetPlayingField();
    createPlayingField(playingField, n, cell, k);
    closeSettingModal();
    sendConditionForStart({n, k});
  }

  // conditionForNxN.classList.add('hidden');
  // playButtonNxN.classList.add('active-game');
});

restartButton.addEventListener('click', () => {
  restartButton.classList.toggle('rotate');
  sendConditionForStart({n, k});
  resetWinCounter();
});

playAgainButton.addEventListener('click', () => {
  resetPlayingMatrix();
  resetGameCells(playingField);
});

playOnlineButton.addEventListener('click', (e) => {
  openModal();
});


document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.querySelector('input[type="checkbox"]');
  const logoImagine = document.querySelector('.logo-img');


  checkbox.addEventListener('click', function(e) {
    if (checkbox.checked) {
      document.body.classList.add('dark-theme');

      setTimeout( () => {
        logoImagine.classList.add('dark-theme-for-img');
        restartButton.classList.add('dark-theme-for-img');
        playOnlineButton.classList.add('dark-theme-for-img');
        buttonSettingField.classList.add('dark-theme-for-img');
      }, 220);
    } else {
      document.body.classList.remove('dark-theme');
      logoImagine.classList.remove('dark-theme-for-img');
      restartButton.classList.remove('dark-theme-for-img');
      playOnlineButton.classList.remove('dark-theme-for-img');
      buttonSettingField.classList.remove('dark-theme-for-img');
    }
  });
});
