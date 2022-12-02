import input from './input';
import testInput from './test';

function main(input: string): number[] {
  const foodItemsCalories: string[] = input.split('\n');
  const caloriesPerElf: number[] = [0];

  foodItemsCalories.forEach((foodItemCalories) => {
    if (foodItemCalories !== '') {
      caloriesPerElf[caloriesPerElf.length - 1] += Number.parseInt(foodItemCalories, 10);
    } else {
      caloriesPerElf.push(0);
    }
  });

  return caloriesPerElf;
}

const test = () => main(testInput);
const partOne = () => Math.max(...main(input));
const partTwo = (topN: number) => {
  const caloriesPerElf = main(input);
  const sortedCaloriesPerElf = caloriesPerElf.sort((a, b) => b - a);
  const topNSum = sortedCaloriesPerElf.slice(0, topN).reduce((prev, curr) => curr + prev, 0);
  return topNSum;
};

console.log('test', test());
console.log('partOne', partOne());
console.log('partTwo', partTwo(3));
