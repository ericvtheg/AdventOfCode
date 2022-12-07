import input from './input';
import testInput from './test';

type File = any;
interface Dir { '..': Dir | null, [k: string]: File | Dir }
type FileSystem = Dir;

const newDir = (parent: Dir): Dir => ({
  '..': parent,
});

const newFile = (size: number): number => size;

function parseInput(input: string): FileSystem {
  const fileSystem: FileSystem = {
    '..': null,
  };
  let cursor: Dir;

  const splitInput = input.split('\n');
  splitInput.forEach((line) => {
    const lineSplit = line.split(' ');

    // if system command
    if (lineSplit[0] === '$') {
      if (lineSplit[1] === 'cd') {
        const dest = lineSplit[2];
        if (dest === '/') {
          cursor = fileSystem;
        } else {
          cursor = cursor[dest];
        }
      }
    } else if (lineSplit[0] === 'dir') {
      const dirName = lineSplit[1];
      cursor[dirName] = newDir(cursor);
    } else {
      // else is file
      const fileSize = Number(lineSplit[0]);
      const fileName = lineSplit[1];
      cursor[fileName] = newFile(fileSize);
    }
  });

  return fileSystem;
}

const calculateTotalSize = (dir: Dir): number => {
  let totalSize = 0;
  const queue = [dir];

  while (queue.length !== 0) {
    const curDir = queue.pop();
    Object.entries(curDir ?? {}).forEach(([key, value]) => {
      if (key !== '..') {
        if (typeof value === 'number') {
          totalSize += value;
        } else {
          queue.push(value);
        }
      }
    });
  }

  return totalSize;
};

function main(fileSystem: FileSystem) {
  let sum = 0;
  const queue = [fileSystem];

  while (queue.length !== 0) {
    const curDir = queue.pop()!;

    const size = calculateTotalSize(curDir);
    if (size <= 100000) {
      sum += size;
    }

    Object.entries(curDir ?? {}).forEach(([key, value]) => {
      if (key !== '..') {
        if (typeof value !== 'number') {
          queue.push(value as Dir);
        }
      }
    });
  }
  return sum;
}

function main2(fileSystem: FileSystem) {
  const spaceToFree = 8381165;
  let dirToDeleteSize = Infinity;
  const queue = [fileSystem];

  while (queue.length !== 0) {
    const curDir = queue.pop()!;

    const size = calculateTotalSize(curDir);
    if (size >= spaceToFree) {
      dirToDeleteSize = Math.min(dirToDeleteSize, size);
    }

    Object.entries(curDir ?? {}).forEach(([key, value]) => {
      if (key !== '..') {
        if (typeof value !== 'number') {
          queue.push(value as Dir);
        }
      }
    });
  }
  return dirToDeleteSize;
}

const part1 = () => main(parseInput(input));
const part2 = () => main2(parseInput(input));

// console.log(part1());
console.log(part2());
