import testInput from './test';
import input from './input';

type Range = [number, number];

function parseInput(input: string): Range[][] {
  return input.split('\n').map((pair) => pair.split(',').map((data) => data.split('-')
    .map((strRange) => Number.parseInt(strRange, 10)))) as Range[][];
}

function isContaining(r1: Range, r2: Range): boolean {
  const [x1, x2] = r1;
  const [y1, y2] = r2;

  if (x1 <= y1 && x2 >= y2) {
    return true;
  }
  if (y1 <= x1 && y2 >= x2) {
    return true;
  }

  return false;
}

function main(input: Range[][]): number {
  return input.reduce((sum, ranges) => {
    if (isContaining(ranges[0], ranges[1])) {
      return sum + 1;
    }
    return sum;
  }, 0);
}

function isOverlapping(r1: Range, r2: Range): boolean {
  const [x1, x2] = r1;
  const [y1, y2] = r2;

  return Math.max(x1, y1) <= Math.min(x2, y2);
}

function main2(input: Range[][]): number {
  return input.reduce((sum, ranges) => {
    if (isOverlapping(ranges[0], ranges[1])) {
      return sum + 1;
    }
    return sum;
  }, 0);
}

const part1 = () => main(parseInput(input));
const part2 = () => main2(parseInput(input));

console.log(part1());
console.log(part2());
