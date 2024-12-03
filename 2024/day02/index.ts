import test from './test';
import input from './input';
import edgecase from './edgecase';

const MAX_SAFE_CHANGE = 3;
const MIN_SAFE_CHANGE = 1;

function parse(input: string): number[][] {
  return input
    .split('\n')
    .map((row) => row.split(' ').map((str) => parseInt(str)));
}

function part1(input: string): number {
  const data = parse(input);

  let unsafeChanges = 0;

  data.forEach((row) => {
    let num = row[0];
    let isDecreasing = undefined;
    for (let i = 1; i < row.length; i += 1) {
      const diff = Math.abs(num - row[i]);
      if (diff > MAX_SAFE_CHANGE || diff < MIN_SAFE_CHANGE) {
        unsafeChanges += 1;
        break;
      }

      const decreased = num - row[i] > 0;
      if (isDecreasing !== undefined) {
        if (isDecreasing !== decreased) {
          unsafeChanges += 1;
          break;
        }
      } else {
        isDecreasing = decreased;
      }

      num = row[i];
    }
  });

  return data.length - unsafeChanges;
}

function part2(input: string): number {
  const data = parse(input);

  let unsafeChanges = 0;

  data.forEach((row) => {
    let num = row[0];
    let isDecreasing = undefined;

    let skipped = false;
    for (let i = 1; i < row.length; i += 1) {
      const diff = Math.abs(num - row[i]);
      if (diff > MAX_SAFE_CHANGE || diff < MIN_SAFE_CHANGE) {
        if (skipped) {
          console.log('unsafe min/max', i, row[i], row);
          unsafeChanges += 1;
          break;
        }
        console.log('skipping max/min', i, row[i], row);
        skipped = true;
        continue;
      }

      const decreased = num - row[i] > 0;

      if (isDecreasing !== undefined && isDecreasing !== decreased) {
        if (skipped) {
          console.log('unsafe decreasing', i, row[i], row);
          unsafeChanges += 1;
          break;
        }
        console.log('skipping decreasing', i, row[i], row);
        skipped = true;
        continue;
      }
      if (isDecreasing === undefined) {
        isDecreasing = decreased;
      }
      num = row[i];
    }
  });

  return data.length - unsafeChanges;
}

function isSafe(row: number[]): boolean {
  let num = row[0];
  let isDecreasing = undefined;

  for (let i = 1; i < row.length; i += 1) {
    const diff = Math.abs(num - row[i]);
    if (diff > MAX_SAFE_CHANGE || diff < MIN_SAFE_CHANGE) {
      return false;
    }

    const decreased = num - row[i] > 0;
    if (isDecreasing !== undefined && isDecreasing !== decreased) {
      return false;
    }

    if (isDecreasing === undefined) {
      isDecreasing = decreased;
    }

    num = row[i];
  }

  return true;
}

function part2Take2(input: string) {
  const data = parse(input);

  let unsafeChanges = 0;

  for (let i = 0; i < data.length; i += 1) {
    const row = data[i];
    if (isSafe(row)) {
      continue;
    }

    let isSafeRow = false;
    for (let j = 0; j < row.length; j += 1) {
      const tempRow = row.slice();
      tempRow.splice(j, 1);

      isSafeRow = isSafe(tempRow);
      if (isSafeRow) {
        break;
      }
    }

    if (!isSafeRow) {
      unsafeChanges += 1;
    }
  }

  return data.length - unsafeChanges;
}

//console.log(part1(test));
//console.log(part1(input));
console.log('*********************');
console.log(part2Take2(test));
console.log(part2Take2(input));
console.log(part2Take2(edgecase));
