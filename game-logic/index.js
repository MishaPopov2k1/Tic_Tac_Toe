import {playingField} from '../js/main';
import {paintOverWinCells, renderSymbol, showWinner, writeWhoseMove} from '../js/draw';

/**
 *
 * @param {object} data
 * @param {string} data.state
 * @param {object} data.coordinates
 *
 */
export function handleGameUpdate(data) {
  console.log('data: ', data);
  const {
    state,
    winningCoordinates,
  } = data;

  renderSymbol(data, playingField);
  writeWhoseMove(state);

  if (winningCoordinates) {
    paintOverWinCells(winningCoordinates, playingField, state);
    showWinner(data);
  }
}

export function savePlayersId(data) {
  const {
    crossId,
    zeroId,
  } = data;

  localStorage.setItem('crossId', crossId);
  localStorage.setItem('zeroId', zeroId);
};
