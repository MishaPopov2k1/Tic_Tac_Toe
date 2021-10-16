// import {io} from 'socket.io-client';
// import {io} from 'socket.io-client';
import {socket, sendChoosingSide, sendReadyTwoPlayers} from '../API/sendGameState';
// import {playingField, cell, createPlayingField} from './main';

export const modalELem = document.querySelector('.modal');

const playForCrosses = document.querySelector('.btn-cross');
const playForZeroes = document.querySelector('.btn-zero');

const loaderCross = document.querySelector('.img-cross-loader');

let isWaitingOpponent = false;
let isAgreementGame = false;

const titles = {
  default: 'Выберите сторону',
  waiting: 'Ожидаем второго игрока',
  confirm: 'Подтвердите игру',
};

export const openModal = (isShowAdditional, player) => {
  modalELem.classList.remove('hidden');
  if (isShowAdditional === true) {
    modalELem.classList.add('with-additional');
    changeTitle(titles.confirm);
    const crossText = playForCrosses.firstElementChild;
    const zeroText = playForZeroes.firstElementChild;

    if (player === 'cross') {
      crossText.innerHTML = 'Игрок 1 ';
      zeroText.innerHTML = 'Вы';
    } else if (player === 'zero') {
      crossText.innerHTML = 'Вы';
      zeroText.innerHTML = 'Игрок 1 ';
    }
  }
};
const closeModal = () => {
  modalELem.classList.add('hidden');
  modalELem.classList.remove('with-additional');
  removeActiveButton();
  isWaitingOpponent = false;
  isAgreementGame = false;
  changeTitle(titles.default);
};

function showLoader() {
  loaderCross.classList.remove('hidden');
}

modalELem.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('overlay') ||
        target.classList.contains('modal__close')) {
    closeModal();
  }
});

function changeTitle(title) {
  const modalTitle = document.querySelector('.modal__title');
  modalTitle.innerHTML = title;
}


socket.on('waiting opponent', (data) => {
  console.log('data: ', data);
  if (isWaitingOpponent === true) {
    return;
  }
  // для клиента2
  openModal(true, data);
  showLoader();
  // changeTitle(titles.confirm);
  isAgreementGame = true;
  setActiveButton({lockedSideClass: `btn-${data}`});
  const agreeGame = modalELem.querySelector('.button-accept');
  agreeGame.addEventListener('click', () => {
    if (data === 'cross') {
      sendChoosingSide('zero');
    } else if (data === 'zero') {
      sendChoosingSide('cross');
    }
    sendReadyTwoPlayers('ready');
    // строить поле на данных первого клиента
    /*     socket.on('start game', (data) => {
      const {
        n,
        k,
      } = data;
      createPlayingField(playingField, n, cell, k);
    }); */
  });
});

socket.on('start online', (data) => {
  closeModal();
  // io.emit('ready two players', data);
});

function setActiveButton({sideClass, lockedSideClass}) {
  [playForCrosses, playForZeroes].forEach((btn)=>{
    btn.classList.toggle('locked-btn', sideClass? !btn.classList.contains(sideClass):btn.classList.contains(lockedSideClass));
  });
};

function removeActiveButton() {
  [playForCrosses, playForZeroes].forEach((btn)=>{
    btn.classList.remove('locked-btn');
  });
}

function chooseSides(sideName) {
  if (isAgreementGame === true || isWaitingOpponent === true) {
    return;
  }

  changeTitle(titles.waiting);
  showLoader();
  isWaitingOpponent = true;
  setActiveButton({sideClass: `btn-${sideName}`});
  // отправим состояние ожидание клиента1 на сервер
  sendChoosingSide(sideName);
  //
}

playForCrosses.addEventListener('click', (e) => chooseSides('cross') );

playForZeroes.addEventListener('click', (e) => chooseSides('zero') );
