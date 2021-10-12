/* eslint-disable camelcase */
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

  if (n == 0 || k == 0) {
    // alert('Некорректные данные!');
    smallElem.style.color = 'red';
    smallElem.textContent = 'Некорректные данные!';
    return;
  }
};


export function checkCellForFullness(cellСoordinates, cell) {
  if (cell.classList.contains('image-symbol')/* || cell.classList.contains('filled') */) {
    return;
  }
  // cell.classList.add('filled');
  // return false;

  // обработка логики игры
  sendCoordinatesOfMove(cellСoordinates);
  // sendGameState(gameCellState);
};

