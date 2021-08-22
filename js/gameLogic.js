import {
    drawSymbol,
    isPaintOverAllWinCells,
    paintOverWinCells,

} from './draw';

const crossWins = document.querySelector('.game-score-for-cross');
const zerosWins = document.querySelector('.game-score-for-zeros');
const playerMoveNumber = document.querySelector('.player__move-number');

const templateZero = '<img class="image-symbol zero-img" src="images/zero.png" alt="zero">';
const templateCross = '<img class="image-symbol cross-img" src="images/cross.png" alt="cross">';

export let n = 0;
export let k = 0;

let moveNumber = 0,
    winCounterForCross = 0,
    winCounterForZeros = 0,
    drawCondition = 0;

export let win = false;

export const resetWinCounter = () => {
    winCounterForCross = 0;
    winCounterForZeros = 0;
    zerosWins.innerHTML = '0';
    crossWins.innerHTML = '0';
}

export function resetPlayingField(playingField, gameMenu) {
    playingField.innerHTML = '';
    gameMenu.classList.add('hidden');
    win = false;
    moveNumber = 0;
};

export function resetPlayingMatrix(arr) {
    for (let i = 0; i < arr.length; i++) {

        resetRow(arr[i]);
    }
    return arr;
};
function resetRow(row) {
    for (let i = 0; i < row.length; i++) {
        row[i] = 0;
    }
    return row;
};

export function resetGameCells(playingField) {

    win = false;
    for (const row of playingField.children) {
        for (const cell of row.children) {
            cell.lastElementChild.classList.add('hidden');
            cell.firstElementChild.classList.add('hidden');
            cell.classList.remove('paint__over-green');
            cell.classList.remove('paint__over-yellow');
        }
    }
    moveNumber = 0;
    playerMoveNumber.innerHTML = 'Ходят крестики ❌';

}

export function createMatrix(n) {
    var result = [];

    for (var i = 0; i < n; i++) {
        result.push(new Array(n).fill(0));
    }
    return result;

};

function transposeMatrix(m) {
    return m[0].map((x, i) => m.map(x => x[i]));
}

function getIndexWinRightDiagonal(arr) {

    let indexWinCells = [[], [], []];
    let indexForCell = [];

    let j = 0;
    for (let i = 0; i < arr.length; i++) {

        if (arr[i][j] === 1) {

            indexWinCells[i][0] = i;
            indexWinCells[i][1] = j;
            j++;

        } else {
            return indexWinCells = null;
        }
    }
    for (let i = 0; i < arr.length; i++) {
        indexForCell[i] = indexWinCells[i].join('');

    }

    return indexForCell;
}

function getIndexWinLeftDiagonal(arr) {

    let indexWinCells = [[], [], []];
    let indexForCell = [];

    let j = 0;
    for (let i = 2; i < arr.length; i--) {

        if (i === -1) {
            break;
        }

        if (arr[i][j] === 1) {

            indexWinCells[i][0] = i;
            indexWinCells[i][1] = j
            j++;

        } else {
            return indexWinCells = null;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        indexForCell[i] = indexWinCells[i].join('');

    }

    return indexForCell;
}


function сheckIfWinningRow(row, k) {
    console.log('row: ', row, k);

    let indexRowI = [];
    let counter = 0;

    for (let i = 0; i < row.length; i++) {
        console.log('count: ', counter, 'el', row[i], 'i', i);

        if (row[i] === 0) {
            counter = 0;
            indexRowI = [];
            continue;
        }
        if (row[i] === 1) {
            counter++;
            indexRowI.push(i);

        }
        if (counter === k) {

            console.log('indexRowI: ', indexRowI);
            return indexRowI;

        }
        // else {

        //     return indexRowI = null;

        // }
    }

    return null;

}

/**
 * 
 * @param {Array} arr 
 * @returns 
 */
function getIndexWinRow(arr, k) {

    let indexRow = [];
    let indexJ = -1;

    arr.forEach((el, i) => {
        let indArr = сheckIfWinningRow(el, k);
        

        if (indArr) {
            console.log('indArr: ', indArr);
            indexRow = indArr;
            indexJ = i;
        }
    });

    if (indexJ == -1) {
        return indexRow = null;
    }

    arr.forEach((el, i) => {
        indexRow[i] = [indexJ, indexRow[i]];
        //indexRow[i] = indexRow[i].split('').map(Number);
    });
    console.log('indexRow', indexRow);
    return indexRow;
};

/**
 * 
 * @param {Array} arr 
 * @returns 
 */
function getIndexWinColumn(arrTransponse, k) {

    let indexRow = [];
    let indexJ = -1;

    arrTransponse.forEach((el, i) => {
        if (сheckIfWinningRow(el, k)) {
            indexRow = сheckIfWinningRow(el, k);
            indexJ = i;
        }
    });

    if (indexJ == -1) {
        return indexRow = null;
    }

    arrTransponse.forEach((el, i) => {
        indexRow[i] += `${indexJ}`;
        indexRow[i] = indexRow[i].split('').map(Number);
    });

    return indexRow;

};

export function getIndexesOfTheWinningStrategy(arr, arrTransponse, k) {

    let indexArr = [];

    if (getIndexWinLeftDiagonal(arr)) {

        return indexArr = getIndexWinLeftDiagonal(arr);

    } else if (getIndexWinRightDiagonal(arr)) {

        return indexArr = getIndexWinRightDiagonal(arr);

    } else if (getIndexWinRow(arr, k)) {

        return indexArr = getIndexWinRow(arr, k);

    } else if (getIndexWinColumn(arrTransponse, k)) {

        return indexArr = getIndexWinColumn(arrTransponse, k);

    }

}


export function updateСell(event, i, j, fieldOfСrosses, fieldOfZeros, playingField, k) {

    if (win === true) {
        return;
    }

    let target = event.target;

    if (!moveNumber) {
        target.innerHTML = templateCross;
        fieldOfСrosses[i][j] = 1;
        playerMoveNumber.innerHTML = 'Ходят нолики ⭕';

    } else {
        target.innerHTML = templateZero;
        fieldOfZeros[i][j] = 1;
        playerMoveNumber.innerHTML = 'Ходят крестики ❌';

    }

    moveNumber = !moveNumber;


    let fieldOfСrossesTranspone = transposeMatrix(fieldOfСrosses);
    let fieldOfZerosTranspone = transposeMatrix(fieldOfZeros);

    if (isPaintOverAllWinCells(fieldOfСrosses, fieldOfСrossesTranspone, playingField, k) === true) {

        playerMoveNumber.innerHTML = 'Победили крестики!';
        winCounterForCross++;
        crossWins.innerHTML = `${winCounterForCross}`;
        // win = true;


    } else if (isPaintOverAllWinCells(fieldOfZeros, fieldOfZerosTranspone, playingField, k) === true) {

        playerMoveNumber.innerHTML = 'Победили нолики!';
        winCounterForZeros++;
        zerosWins.innerHTML = `${winCounterForZeros}`;
        // win = true;

    } /*else {
        
        drawCondition++;
        
        if (drawCondition === 9) {
            playerMoveNumber.innerHTML = 'Ничья!';
            
            paintOverAllCells(playingField);
        }
    }*/
    console.log(fieldOfСrosses);
    console.log(fieldOfZeros);

}
