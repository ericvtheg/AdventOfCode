import testInput from './test';
import input from './input';

interface Movement {
  amount: number;
  from: number;
  to: number;
}

function parseInput(input: string) {
  const splitInput = input.replaceAll('    ', ' ').replaceAll('[', '').replaceAll(']', '').split('\n');
  const dividerOfInputsIndex = splitInput.indexOf('');
  const numberLine = splitInput.slice(dividerOfInputsIndex - 1, dividerOfInputsIndex);
  const numStacks = numberLine.join('').replaceAll(' ', '').length;

  // stack
  const stacks: string[][] = Array.from(new Array(numStacks), () => []);
  const stackInput = splitInput.slice(0, dividerOfInputsIndex - 1); // do not need the stack number label line
  stackInput.reverse().forEach((line, row) => {
    const crates = line.split(' ');
    crates.forEach((crate, col) => {
      if (crate) {
        stacks[col].push(crate);
      }
    });
  });

  // movements
  const movementsInput = splitInput.slice(dividerOfInputsIndex + 1);
  const movements: Movement[] = movementsInput.map((line) => {
    const parsedLine = line.replace('move ', '').replace(' from ', ' ').replace(' to ', ' ').split(' ');
    return {
      amount: Number.parseInt(parsedLine[0], 10),
      from: Number.parseInt(parsedLine[1], 10) - 1,
      to: Number.parseInt(parsedLine[2], 10) - 1,
    };
  });
  return { stacks, movements };
}

function main(input: { stacks: string[][], movements: Movement[]}) {
  const { stacks, movements } = input;

  movements.forEach(({ amount, from, to }) => {
    let num = amount;
    while (num > 0) {
      const toMoveCrate = stacks[from].pop();
      if (toMoveCrate) {
        stacks[to].push(toMoveCrate);
      }
      num -= 1;
    }
  });
  return stacks.map((stack) => stack.pop()).join('');
}

function main2(input: { stacks: string[][], movements: Movement[]}) {
  const { stacks, movements } = input;
  console.log(stacks);

  movements.forEach(({ amount, from, to }) => {
    const num = amount;
    const toMoveCrates = stacks[from].splice(stacks[from].length - num);
    stacks[to].push(...toMoveCrates);
  });
  return stacks.map((stack) => stack.pop()).join('');
}

const part1 = () => main(parseInput(input));
const part2 = () => main2(parseInput(input));

console.log(part1());
console.log(part2());
