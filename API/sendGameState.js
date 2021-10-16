import {handleGameUpdate, savePlayersId} from '../game-logic/index';
import {resetGameCells} from '../js/draw';
import {playingField} from '../js/main';
import {urlHeroku, urlLocal} from './getData';

// export const socket = io(urlLocal);

 export const socket = io(urlHeroku);


export function sendCoordinatesOfMove(cellCoordinates) {
  socket.emit('game cell state', cellCoordinates);
}

export function sendFieldSizesForStart(data) {
/*   const {
    sizeOfField,
    numberSymbolsToWin,
  } = data; */
  socket.emit('start game', data);
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
