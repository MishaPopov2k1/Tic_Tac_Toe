import {
    win,
    getIndexesOfTheWinningStrategy,
    k,

} from './gameLogic';


export function drawSymbol(symbol) {
    symbol.classList.remove('hidden');
};

export function paintOverWinCells(indexArr, playingField) {

    let rows = playingField.children;

    for (const coord of indexArr) {
        let cell = rows[coord[0]].children[coord[1]];
        cell.classList.add('paint__over-green');
    }


}

export function paintOverAllCells(playingField) {
    // playingField.children[0].children[0].style.backgroundColor = 'yellow';

}


export function isPaintOverAllWinCells(arr, arrTransponse, playingField, k) {

    if (getIndexesOfTheWinningStrategy(arr, arrTransponse, k)) {

        paintOverWinCells(getIndexesOfTheWinningStrategy(arr, arrTransponse, k), playingField);

        return win = true;

    } else {

        return false;

    }
};

