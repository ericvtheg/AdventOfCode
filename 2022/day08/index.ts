import input from './input';
import test from './test';

type Tree = number;

function parseInput(input: string): [Tree[][], Tree[][]] {
  const rows: Tree[][] = input.split('\n').map((row) => (row.split('').map((tree) => Number(tree))));

  const cols: Tree[][] = Array.from(Array(rows.length), () => []);
  rows.forEach((row) => {
    row.forEach((tree, rowIdx) => {
      cols[rowIdx].push(Number(tree));
    });
  });

  return [rows, cols];
}

const isLargest = (tree: Tree, trees: Tree[]) => {
  const largestTree = Math.max(...trees);
  if (tree > largestTree) {
    return true;
  }
  return false;
};

const isEdge = (row: number, col: number, rowBound: number, colBound: number) => {
  if (row === 0 || col === 0 || row === rowBound || col === colBound) {
    return true;
  }
  return false;
};

function main([rows, cols]: [Tree[][], Tree[][]]) {
  let visibleTrees = 0;

  rows.forEach((row, rowIdx) => {
    row.forEach((tree, colIdx) => {
      // if edge

      if (isEdge(rowIdx, colIdx, rows.length - 1, row.length - 1)) {
        visibleTrees += 1;
        return;
      }

      // check if visible from left
      const treesToTheLeft = row.slice(0, colIdx);
      if (isLargest(tree, treesToTheLeft)) {
        visibleTrees += 1;
        return;
      }

      // check if visible from right
      const treesToTheRight = row.slice(colIdx + 1);
      if (isLargest(tree, treesToTheRight)) {
        visibleTrees += 1;
        return;
      }

      // check if visible from the top
      const treesAbove = cols[colIdx].slice(0, rowIdx);
      if (isLargest(tree, treesAbove)) {
        visibleTrees += 1;
        return;
      }

      // check if visible from the bottom
      const treesBelow = cols[colIdx].slice(rowIdx + 1);
      if (isLargest(tree, treesBelow)) {
        visibleTrees += 1;
      }
    });
  });
  return visibleTrees;
}

const calculateViewingDistance = (tree: Tree, trees: Tree[]) => {
  let viewingDistance = 0;
  for (let i = 0; i < trees.length; i += 1) {
    viewingDistance += 1;
    const viewingTree = trees[i];
    if (tree <= viewingTree) {
      break;
    }
  }
  return viewingDistance;
};

function main2([rows, cols]: [Tree[][], Tree[][]]) {
  let highestScenicScore = -Infinity;

  rows.forEach((row, rowIdx) => {
    row.forEach((tree, colIdx) => {
      // if edge
      if (isEdge(rowIdx, colIdx, rows.length - 1, row.length - 1)) {
        highestScenicScore = Math.max(0, highestScenicScore);
        return;
      }

      // check view towards left
      const treesToTheLeft = row.slice(0, colIdx);
      const leftViewingDistance = calculateViewingDistance(tree, treesToTheLeft.reverse());

      // check view towards right
      const treesToTheRight = row.slice(colIdx + 1);
      const rightViewingDistance = calculateViewingDistance(tree, treesToTheRight);

      // check view towards top
      const treesAbove = cols[colIdx].slice(0, rowIdx);
      const topViewingDistance = calculateViewingDistance(tree, treesAbove.reverse());

      // check view towards bottom
      const treesBelow = cols[colIdx].slice(rowIdx + 1);
      const bottomViewingDistance = calculateViewingDistance(tree, treesBelow);

      const scenicScore = leftViewingDistance * rightViewingDistance * topViewingDistance * bottomViewingDistance;
      highestScenicScore = Math.max(scenicScore, highestScenicScore);
    });
  });
  return highestScenicScore;
}

const part1 = () => main(parseInput(input));
const part2 = () => main2(parseInput(input));

console.log(part1());
console.log(part2());
