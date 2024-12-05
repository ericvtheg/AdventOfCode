import input from './input';
import test from './test';

function parse(input: string): string[][] {
  return input.split('\n').map((e) => e.split(''));
}

function checkWord(word: string): boolean {
  return word === 'XMAS' || word === 'SAMX';
}

function part1(input: string) {
  const data = parse(input);
  const found = new Set<string>();
  let occ = 0;

  const addFound = (
    startY: number,
    startX: number,
    endY: number,
    endX: number,
  ) => {
    const key = `${startY},${startX}-${endY},${endX}`;
    if (!found.has(key)) {
      found.add(key);
      occ++;
    }
  };

  // Horizontal
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x <= data[0].length - 4; x++) {
      const word = data[y].slice(x, x + 4).join('');
      if (checkWord(word)) {
        addFound(y, x, y, x + 3);
      }
    }
  }

  // Vertical
  for (let x = 0; x < data[0].length; x++) {
    for (let y = 0; y <= data.length - 4; y++) {
      const word = data
        .slice(y, y + 4)
        .map((row) => row[x])
        .join('');
      if (checkWord(word)) {
        addFound(y, x, y + 3, x);
      }
    }
  }

  // Diagonal (top-left to bottom-right)
  for (let y = 0; y <= data.length - 4; y++) {
    for (let x = 0; x <= data[0].length - 4; x++) {
      const word = Array.from({ length: 4 }, (_, i) => data[y + i][x + i]).join(
        '',
      );
      if (checkWord(word)) {
        addFound(y, x, y + 3, x + 3);
      }
    }
  }

  // Diagonal (top-right to bottom-left)
  for (let y = 0; y <= data.length - 4; y++) {
    for (let x = 3; x < data[0].length; x++) {
      const word = Array.from({ length: 4 }, (_, i) => data[y + i][x - i]).join(
        '',
      );
      if (checkWord(word)) {
        addFound(y, x, y + 3, x - 3);
      }
    }
  }

  return occ;
}

function checkWord2(word: string): boolean {
  return word === 'MAS' || word === 'SAM';
}

function part2(input: string) {
  const data = parse(input);
  let occ = 0;

  for (let y = 1; y < data.length - 1; y += 1) {
    for (let x = 1; x < data[0].length - 1; x += 1) {
      const char = data[y][x];
      if (char === 'A') {
        const diag1 = data[y - 1][x - 1] + char + data[y + 1][x + 1];
        const diag2 = data[y - 1][x + 1] + char + data[y + 1][x - 1];

        if (checkWord2(diag1) && checkWord2(diag2)) {
          occ += 1;
        }
      }
    }
  }
  return occ;
}

console.log(part1(test));
console.log(part1(input));
console.log(part2(test));
console.log(part2(input));
