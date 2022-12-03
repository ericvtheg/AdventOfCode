import input from './input';
import testInput from './test';

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getPriority(char: string): number {
  return alphabet.indexOf(char) + 1;
}

function getDuplicateChar(string1: string, string2: string): string {
  for(let i in string1 as any) {
    const char = string1[i as any];
    if(string2.includes(char)){
      return char;
    }
  }
  throw new Error("failed to find duplicate char");
}

function main(input: string){
  let prioritySum = 0;
  const rucksacks: string[] = input.split('\n');

  rucksacks.forEach(rucksack => {
    const len = rucksack.length
    const middle = len / 2;
    const firstHalf = rucksack.slice(0, middle);
    const secondHalf = rucksack.slice(middle);
    const duplicateChar = getDuplicateChar(firstHalf, secondHalf);
    prioritySum += getPriority(duplicateChar);
  });

  return prioritySum;
}

/* ******** */

function getDuplicateChars(string1: string, string2: string): string {
  let chars = '';
  for(let i in string1 as any) {
    const char = string1[i as any];
    if(string2.includes(char)){
      chars += char;
    }
  }
  return chars;
}

function main2(input: string){
  let prioritySum = 0;
  const rucksacks: string[] = input.split('\n');

  for (let i = 0; i < rucksacks.length; i += 3) { 
    const first = rucksacks[i];
    const second = rucksacks[i+1];
    const third = rucksacks[i+2];
    let potentialBadTypes = getDuplicateChars(first, second);
    const badgeType = getDuplicateChars(potentialBadTypes, third).slice(0,1);
    
    prioritySum += getPriority(badgeType);
  }

  return prioritySum;
}

const test = () => main(testInput);
const part1 = () => main(input);
const test2 = () => main2(testInput);
const part2 = () => main2(input);

console.log('test', test());
console.log('part1', part1());
console.log('test2', test2());
console.log('part2', part2());