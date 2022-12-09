import input from './input';
import test from './test';
import test2 from './test2';

enum Direction {
  R = 'Right',
  L = 'Left',
  U = 'Up',
  D = 'Down',
}

interface Movement {
  direction: Direction;
  steps: number;
}

interface Position {
  y: number;
  x: number;
}

function parseInput(input: string): Movement[] {
  const movements: Movement[] = [];
  input.split('\n').forEach((y) => {
    const [direction, steps] = y.split(' ');
    movements.push({
      direction: Direction[direction as keyof typeof Direction],
      steps: Number(steps),
    });
  });
  return movements;
}

function markAsVisited(y: number, x: number, coords: Record<string, boolean>): number {
  const pos = `${x},${y}`;
  if (!coords[pos]) {
    coords[pos] = true;
    return 1;
  }
  return 0;
}

function getHorizontalDistance(head: Position, tail: Position): number {
  return head.x - tail.x;
}

function getVerticalDistance(head: Position, tail: Position): number {
  return head.y - tail.y;
}

function moveRope(rope: Position, direction: Direction): Position {
  if (direction === Direction.D) {
    rope.y -= 1;
  }
  if (direction === Direction.U) {
    rope.y += 1;
  }
  if (direction === Direction.L) {
    rope.x -= 1;
  }
  if (direction === Direction.R) {
    rope.x += 1;
  }
  return { ...rope };
}

function isNegative(number: number) {
  if (number < 0) {
    return -1;
  }
  return 1;
}

function main(movements: Movement[]): number {
  const coordsVisited = {};
  let numUniqueCoordsVisited = 0;

  let head: Position = { y: 0, x: 0 };
  let tail: Position = { y: 0, x: 0 };

  numUniqueCoordsVisited += markAsVisited(tail.y, tail.x, coordsVisited);

  movements.forEach(({ direction, steps }) => {
    for (let i = 1; i <= steps; i += 1) {
      head = moveRope(head, direction);

      const horizontalDistance = getHorizontalDistance(head, tail);
      const verticalDistance = getVerticalDistance(head, tail);

      if (Math.abs(horizontalDistance) > 1) {
        tail.x += (1 * isNegative(horizontalDistance));
        if (Math.abs(verticalDistance) > 0) {
          tail.y += (1 * isNegative(verticalDistance));
        }
      } else if (Math.abs(verticalDistance) > 1) {
        tail.y += (1 * isNegative(verticalDistance));
        if (Math.abs(horizontalDistance) > 0) {
          tail.x += (1 * isNegative(horizontalDistance));
        }
      }

      numUniqueCoordsVisited += markAsVisited(tail.y, tail.x, coordsVisited);
    }
  });

  return numUniqueCoordsVisited;
}

function main2(movements: Movement[]): number {
  const coordsVisited = {};
  let numUniqueCoordsVisited = 0;

  let head: Position = { y: 0, x: 0 };
  let tail: Position[] = Array.from(Array(9), () => ({ y: 0, x: 0 }));

  numUniqueCoordsVisited += markAsVisited(0, 0, coordsVisited);

  movements.forEach(({ direction, steps }) => {
    for (let i = 1; i <= steps; i += 1) {
      head = moveRope(head, direction);
      let prevTail = head;
      tail.forEach((curTail, idx) => {
        const horizontalDistance = getHorizontalDistance(prevTail, curTail);
        const verticalDistance = getVerticalDistance(prevTail, curTail);

        if (Math.abs(horizontalDistance) > 1) {
          curTail.x += (1 * isNegative(horizontalDistance));
          if (Math.abs(verticalDistance) > 0) {
            curTail.y += (1 * isNegative(verticalDistance));
          }
        } else if (Math.abs(verticalDistance) > 1) {
          curTail.y += (1 * isNegative(verticalDistance));
          if (Math.abs(horizontalDistance) > 0) {
            curTail.x += (1 * isNegative(horizontalDistance));
          }
        }

        prevTail = curTail;

        if (idx === tail.length - 1) {
          numUniqueCoordsVisited += markAsVisited(curTail.y, curTail.x, coordsVisited);
        }
      });
    }
  });

  return numUniqueCoordsVisited;
}

const part1 = () => main(parseInput(input));
const part2 = () => main2(parseInput(input));

console.log(part1());
console.log(part2());
