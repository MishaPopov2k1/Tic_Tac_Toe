export const buttonSettingField = document.querySelector('.img-setting');
export const modalSettingField = document.querySelector('.modal-setting-field');

const openModalForSetting = () => {
  modalSettingField.classList.remove('hidden');
};
export const closeSettingModal = () => {
  modalSettingField.classList.add('hidden');
};

buttonSettingField.addEventListener('click', () => {
  openModalForSetting();
});

modalSettingField.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('overlay') ||
        target.classList.contains('modal__close') ||
        target.classList.contains('.btn-go')) {
    closeSettingModal();
  }
} );

import {conditionForNxN} from './main';
import {sendCoordinatesOfMove} from '../API/sendGameState';

export let n;
export let k;

export const setGameConditionsFor3x3 = () => {
  n = 3;
  k = 3;
};

export const setGameConditionsForNxN = () =>{
  const smallElem = document.createElement('small');
  conditionForNxN.append(smallElem);

  n = + document.querySelector('.input-for-N').value;
  k = + document.querySelector('.input-for-K').value;

  if ((n == 0 && k == 0)||n <= k) {
    // alert('Некорректные данные!');
    smallElem.style.color = 'red';
    smallElem.textContent = 'Некорректные данные!';
    return false;
  }
  return true;
};


export function checkCellForFullness(cellСoordinates, cell) {
  if (cell.classList.contains('image-symbol')/* || cell.classList.contains('filled') */) {
    return;
  }
  // cell.classList.add('filled');
  // return false;

  // обработка логики игры
  sendCoordinatesOfMove(cellСoordinates);
};

