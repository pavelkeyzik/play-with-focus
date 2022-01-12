const wrapper = document.getElementById('wrapper');

const buttons = wrapper.querySelectorAll('div[role=button]');
const buttonsArray = [];

buttons.forEach(button => {
  buttonsArray.push(button)
})

const sortedButtons = buttonsArray.sort((a, b) => a.offsetTop - b.offsetTop);

const arrayOfRows = [...new Set([...sortedButtons.map(button => button.offsetTop)])];
const arrayOfColumns = [...new Set([...sortedButtons.map(button => button.offsetLeft)])];

const matrix = Array.from(Array(arrayOfRows.length), () => new Array(arrayOfColumns.length).fill(null))

sortedButtons.forEach(button => {
  const indexInRow = arrayOfRows.indexOf(button.offsetTop);
  const indexInColumn = arrayOfColumns.indexOf(button.offsetLeft);

  matrix[indexInRow][indexInColumn] = button;
})

function getNextElementInRow(matrix, currentRowIndex, currentColumnIndex) {
  let indexOfRow = currentRowIndex + 1;

  while(indexOfRow < matrix.length) {
    const element = matrix[indexOfRow] ? matrix[indexOfRow][currentColumnIndex] : null;
    
    if (element) {
      return {
        indexOfRow,
        indexOfColumn: currentColumnIndex,
        element,
      };
    }

    const elementIndex = matrix[indexOfRow].findIndex(item => item !== null);

    if (elementIndex >= 0) {
      return {
        element: matrix[indexOfRow][elementIndex],
      }
    }

    indexOfRow++;
  }

  
  return { element: null };
}

function getPrevElementInRow(matrix, currentRowIndex, currentColumnIndex) {
  
  let indexOfRow = currentRowIndex - 1;

  while(indexOfRow >= 0) {
    const element = matrix[indexOfRow] ? matrix[indexOfRow][currentColumnIndex] : null;
    
    if (element) {
      return {
        indexOfRow,
        indexOfColumn: currentColumnIndex,
        element,
      };
    }

    const elementIndex = matrix[indexOfRow].findIndex(item => item !== null);

    if (elementIndex >= 0) {
      return {
        element: matrix[indexOfRow][elementIndex],
      }
    }

    indexOfRow--;
  }

  
  return { element: null };
}

function getNextElementInColumns(matrix, currentRowIndex, currentColumnIndex) {
  const element = matrix[currentRowIndex] ? matrix[currentRowIndex][currentColumnIndex + 1] : null;

  return { element };
}

function getPrevElementInColumns(matrix, currentRowIndex, currentColumnIndex) {
  const element = matrix[currentRowIndex] ? matrix[currentRowIndex][currentColumnIndex - 1] : null;

  if (!element) {
    let rowIndex = currentRowIndex;
    
    while(rowIndex >= 0) {
      const elementIndex = matrix[rowIndex].slice(0, currentColumnIndex - 1).findLastIndex((item) => item !== null);

      if (elementIndex >= 0) {
        return matrix[rowIndex][elementIndex];
      }

      rowIndex--;
    }
  }

  return { element };
}

wrapper.addEventListener('keyup', event => {
  /**
   * @type HTMLElement
   */
  const focusedElement = event.currentTarget;

  /**
   * @type HTMLElement
   */
  const activeElement = document.activeElement;

  const top = activeElement.offsetTop;
  const left = activeElement.offsetLeft;

  const indexInRow = arrayOfRows.indexOf(top);
  const indexInColumn = arrayOfColumns.indexOf(left);

  if (event.key === 'ArrowRight') {
    const { element } = getNextElementInColumns(matrix, indexInRow, indexInColumn);

    if (element) {
      element.focus();
    }
  }

  if (event.key === 'ArrowLeft') {
    const { element } = getPrevElementInColumns(matrix, indexInRow, indexInColumn)
    
    if (element) {
      element.focus();
    }
  }

  if (event.key === 'ArrowUp') {
    const { element } = getPrevElementInRow(matrix, indexInRow, indexInColumn);
    
    if (element) {
      element.focus();
    }
  }

  if (event.key === 'ArrowDown') {
    const { element } = getNextElementInRow(matrix, indexInRow, indexInColumn);

    if (element) {
      element.focus();
    }
  }

});