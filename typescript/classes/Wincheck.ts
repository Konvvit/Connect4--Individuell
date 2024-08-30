export default function winCheck(matrix: Array<Array<string>>): string | false {

  let m = matrix;

  let offsets = [
    [[0, 0], [0, 1], [0, 2], [0, 3]],  // horizontal win
    [[0, 0], [1, 0], [2, 0], [3, 0]],  // vertical win
    [[0, 0], [1, 1], [2, 2], [3, 3]],  // diagonal 1 win
    [[0, 0], [1, -1], [2, -2], [3, -3]] // diagonal 2 win
  ];
  
  for (let color of 'XO') {
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[0].length; c++) {
        for (let winType of offsets) {
          let colorsInCombo = '';
          for (let [ro, co] of winType) {
            colorsInCombo += (m[r + ro] || [])[c + co];
          }
          if (colorsInCombo === color.repeat(4)) {
            return color;
          }
        }
      }
    }
  }
  return false;
}