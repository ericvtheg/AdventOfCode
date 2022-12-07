import testInput from './test';
import input from './input';

function main(input: string): number {
  let i = 0;

  while (i < input.length) {
    const chars = input.slice(i, i + 4);
    if (new Set(chars).size === 4) {
      return i + 4;
    }
    i += 1;
  }

  i += 1;
  throw new Error('');
}

function main2(input: string): number {
  let i = 0;

  while (i < input.length) {
    const chars = input.slice(i, i + 14);
    if (new Set(chars).size === 14) {
      return i + 14;
    }
    i += 1;
  }

  i += 1;
  throw new Error('');
}

const part1 = () => main(input);
const part2 = () => main2(input);

console.log(part1());
console.log(part2());
