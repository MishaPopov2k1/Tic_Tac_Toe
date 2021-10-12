import {handleGameUpdate, savePlayersId} from '../game-logic/index';
import {resetGameCells} from '../js/draw';
import {playingField} from '../js/main';

export const socket = io('http://127.0.0.1:3000');


/* export function sendGameState(gameCellState) {
  socket.emit('game cell state', gameCellState);
} */
export function sendCoordinatesOfMove(cellCoordinates) {
  socket.emit('game cell state', cellCoordinates);
}

export function sendFieldSizesForStart({n, k}) {
  socket.emit('start game', {n, k});
}

export function resetPlayingMatrix() {
  socket.emit('reset matrix');
}

export function sendChoosingSide(sideName) {
  socket.emit('player choosed of side', sideName);
}

export function sendReadyTwoPlayers(data) {
  socket.emit('ready two players', data);
}

socket.on('game cell state', (data) => {
  handleGameUpdate(data);
});

socket.on('reset matrix', () => {
  resetGameCells(playingField);
});

socket.on('players id', (data) => {
  savePlayersId(data);
});
