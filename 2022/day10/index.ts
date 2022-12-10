import test from './test';
import input from './input';

enum OperationType {
  noop = 'noop',
  addx = 'addx',
}

enum OperationCost {
  noop = 1,
  addx = 2,
}

interface Operation {
  type: OperationType
  amount?: number
}

function parseInput(input: string): Operation[] {
  return input.split('\n').map((row) => {
    const splitRow = row.split(' ');
    return {
      type: splitRow[0] as OperationType,
      amount: Number(splitRow[1]),
    };
  });
}

function main(operations: Operation[]) {
  const relevantCycles = [20, 60, 100, 140, 180, 220];
  let signalStrengthSum = 0;
  let cycleNum = 0;
  let sum = 1;

  operations.forEach(({ type, amount }) => {
    if (type === OperationType.noop) {
      cycleNum += 1;
      if (relevantCycles.includes(cycleNum)) {
        signalStrengthSum += cycleNum * sum;
      }
    }

    if (type === OperationType.addx) {
      cycleNum += 1;
      if (relevantCycles.includes(cycleNum)) {
        signalStrengthSum += cycleNum * sum;
      }
      cycleNum += 1;
      if (relevantCycles.includes(cycleNum)) {
        signalStrengthSum += cycleNum * sum;
      }
      sum += amount || 0;
    }
  });

  return signalStrengthSum;
}

function checkIfOverlap(cycleNum: number, position: number) {
  return position === (cycleNum % 40) || (position + 1) === (cycleNum % 40) || (position + 2) === (cycleNum % 40);
}

function main2(operations: Operation[]) {
  const pixels = Array.from(Array(240), () => '.');

  let cycleNum = 0;
  let position = 1;

  operations.forEach(({ type, amount }) => {
    if (type === OperationType.noop) {
      cycleNum += 1;
      if (checkIfOverlap(cycleNum, position)) {
        pixels[cycleNum - 1] = '#';
      }
    }

    if (type === OperationType.addx) {
      cycleNum += 1;
      if (checkIfOverlap(cycleNum, position)) {
        pixels[cycleNum - 1] = '#';
      }
      cycleNum += 1;
      if (checkIfOverlap(cycleNum, position)) {
        pixels[cycleNum - 1] = '#';
      }
      position += amount || 0;
    }
  });

  let chunks = [];

  const pixelStr = pixels.join('');
  for (let i = 0, charsLength = pixelStr.length; i < charsLength; i += 40) {
    chunks.push(pixelStr.substring(i, i + 40));
  }

  return chunks;
}

const part1 = () => main(parseInput(input));
const part2 = () => main2(parseInput(input));

console.log(part1());
console.log(part2());
