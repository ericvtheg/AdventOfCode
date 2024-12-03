import input from './input';
import test from './test';

function parse(input: string): [number[], number[]] {
  const list1: number[] = [];
  const list2: number[] = [];
  input.split('\n').forEach((entry) => {
    const [left, right] = entry.split('   ');
    list1.push(parseInt(left));
    list2.push(parseInt(right));
  });
  return [list1, list2];
}

function part1(input: string) {
  const [list1, list2] = parse(input);

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  let distance = 0;
  for (let i = 0; i < list1.length; i++) {
    distance += Math.abs(list1[i] - list2[i]);
  }

  return distance;
}

function part2(input: string) {
  const [list1, list2] = parse(input);

  let sum = 0;
  list1.forEach((num) => {
    const occurrences = list2.filter((num2) => num2 === num).length;
    sum += occurrences * num;
  });

  return sum;
}

console.log(part1(test));
console.log(part1(input));
console.log('*********');

console.log(part2(test));
console.log(part2(input));
