import fs from 'fs/promises';

async function readInput(path: string) {
  try {
    const content = await fs.readFile(path, 'utf8');
    return content;
  } catch (err) {
    console.error('Error reading file:', err);
    throw err;
  }
}

async function part1() {
  const mulRe = /mul\(\d+\,\d+\)|do\(\)|don't\(\)/g;
  const input = await readInput('./input.txt');
  const matches = input.match(mulRe);

  let sum = 0;
  let skip = false;
  matches?.forEach((m) => {
    if (m === "don't()") {
      skip = true;
    } else if (m === 'do()') {
      skip = false;
    } else {
      if (!skip) {
        const [left, right] = m.split(',');
        const leftNum = parseInt(left.substring(4));
        const rightNum = parseInt(right.substring(0, right.length - 1));

        sum += leftNum * rightNum;
      }
    }
  });

  return sum;
}

part1().then(console.log);
