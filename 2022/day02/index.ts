import testInput from './test';
import input from './input';

enum HandShape {
  ROCK = 'ROCK',
  PAPER = 'PAPER',
  SCISSORS = 'SCISSORS',
}

const handShapeScores: Record<HandShape, number> = {
  [HandShape.ROCK]: 1,
  [HandShape.PAPER]: 2,
  [HandShape.SCISSORS]: 3,
};

enum RoundResult {
  LOSS = 'LOSS',
  DRAW = 'DRAW',
  WIN = 'WIN',
}

const roundResultScores: Record<RoundResult, number> = {
  [RoundResult.LOSS]: 0,
  [RoundResult.DRAW]: 3,
  [RoundResult.WIN]: 6,
};

enum EncryptedLetter {
  A = 'A',
  B = 'B',
  C = 'C',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

function compareHandShapes(self: HandShape, opponent: HandShape): RoundResult {
  if (self === opponent) {
    return RoundResult.DRAW;
  }

  if (self === HandShape.ROCK) {
    if (opponent === HandShape.SCISSORS) {
      return RoundResult.WIN;
    }
  }

  if (self === HandShape.PAPER) {
    if (opponent === HandShape.ROCK) {
      return RoundResult.WIN;
    }
  }

  if (self === HandShape.SCISSORS) {
    if (opponent === HandShape.PAPER) {
      return RoundResult.WIN;
    }
  }

  return RoundResult.LOSS;
}

function main(input: string, encryptionMapping: Record<EncryptedLetter, HandShape>) {
  const rounds = input.split('\n');

  let totalPoints = 0;
  rounds.forEach((round) => {
    const [encryptedOpponentHandShape, encryptedSelfHandShape] = round.split(' ');
    const opponentHandShape = encryptionMapping[encryptedOpponentHandShape as keyof typeof EncryptedLetter];
    const selfHandSHape = encryptionMapping[encryptedSelfHandShape as keyof typeof EncryptedLetter];

    const roundResult = compareHandShapes(selfHandSHape, opponentHandShape);
    const roundPoints = handShapeScores[selfHandSHape] + roundResultScores[roundResult];

    totalPoints += roundPoints;
  });
  return totalPoints;
}

function main2(
  input: string,
  encryptionHandMapping: {[K in EncryptedLetter]?: HandShape},
  encryptionRoundResultMapping: {[K in EncryptedLetter]?: RoundResult},
) {
  const rounds = input.split('\n');

  let totalPoints = 0;
  rounds.forEach((round) => {
    const [encryptedOpponentHandShape, encryptedNeededRoundResult] = round.split(' ');
    const opponentHandShape = encryptionHandMapping[encryptedOpponentHandShape as keyof typeof EncryptedLetter]!;
    const neededRoundResult = encryptionRoundResultMapping[encryptedNeededRoundResult as keyof typeof EncryptedLetter]!;

    let roundPoints = 0;
    // Find handShape that would result in needed round result
    Object.keys(HandShape).forEach((handShape) => {
      const enumHandShape = HandShape[handShape as keyof typeof HandShape];
      const wouldBeRoundResult = compareHandShapes(enumHandShape, opponentHandShape);

      if (wouldBeRoundResult === neededRoundResult) {
        roundPoints = handShapeScores[enumHandShape] + roundResultScores[neededRoundResult];
      }
    });

    totalPoints += roundPoints;
  });

  return totalPoints;
}

const encryptionMapping = {
  [EncryptedLetter.A]: HandShape.ROCK,
  [EncryptedLetter.B]: HandShape.PAPER,
  [EncryptedLetter.C]: HandShape.SCISSORS,
  [EncryptedLetter.X]: HandShape.ROCK,
  [EncryptedLetter.Y]: HandShape.PAPER,
  [EncryptedLetter.Z]: HandShape.SCISSORS,
};

const encryptionHandMapping = {
  [EncryptedLetter.A]: HandShape.ROCK,
  [EncryptedLetter.B]: HandShape.PAPER,
  [EncryptedLetter.C]: HandShape.SCISSORS,
};

const encryptionRoundResultMapping = {
  [EncryptedLetter.X]: RoundResult.LOSS,
  [EncryptedLetter.Y]: RoundResult.DRAW,
  [EncryptedLetter.Z]: RoundResult.WIN,
};

const testPart1 = () => main(testInput, encryptionMapping);
const part1 = () => main(input, encryptionMapping);
const testPart2 = () => main2(testInput, encryptionHandMapping, encryptionRoundResultMapping);
const part2 = () => main2(input, encryptionHandMapping, encryptionRoundResultMapping);

console.log('test part1', testPart1());
console.log('part1', part1());
console.log('test part2', testPart2());
console.log('part2', part2());
