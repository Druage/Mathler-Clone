import { Cell, CellStatus, Solution } from "../../../src/game/Game";

export interface PlayerSimulationTestContract {
  solution: Solution;
  expected: {
    triesLeft: number;
    foundSolution: boolean;
    solution: Cell[];
  };
}

export const playerSimulationTests: PlayerSimulationTestContract[] = [
  {
    solution: ["1", "2", "0", "-", "4", "7"],
    expected: {
      triesLeft: 5,
      foundSolution: false,
      solution: [
        { val: "1", status: CellStatus.CORRECT },
        { val: "2", status: CellStatus.CORRECT_WRONG_POSITION },
        { val: "0", status: CellStatus.INCORRECT },
        { val: "-", status: CellStatus.CORRECT },
        { val: "4", status: CellStatus.INCORRECT },
        { val: "7", status: CellStatus.INCORRECT },
      ],
    },
  },
  {
    solution: ["1", "0", "*", "7", "+", "3"],
    expected: {
      triesLeft: 4,
      foundSolution: false,
      solution: [
        { val: "1", status: CellStatus.CORRECT },
        { val: "0", status: CellStatus.INCORRECT },
        { val: "*", status: CellStatus.INCORRECT },
        { val: "7", status: CellStatus.INCORRECT },
        { val: "+", status: CellStatus.INCORRECT },
        { val: "3", status: CellStatus.CORRECT_WRONG_POSITION },
      ],
    },
  },
  {
    solution: ["1", "0", "*", "8", "-", "7"],
    expected: {
      triesLeft: 3,
      foundSolution: false,
      solution: [
        { val: "1", status: CellStatus.CORRECT },
        { val: "0", status: CellStatus.INCORRECT },
        { val: "*", status: CellStatus.INCORRECT },
        { val: "8", status: CellStatus.INCORRECT },
        { val: "-", status: CellStatus.CORRECT_WRONG_POSITION },
        { val: "7", status: CellStatus.INCORRECT },
      ],
    },
  },
  {
    solution: ["1", "6", "5", "-", "9", "2"],
    expected: {
      triesLeft: 2,
      foundSolution: false,
      solution: [
        { val: "1", status: CellStatus.CORRECT },
        { val: "6", status: CellStatus.INCORRECT },
        { val: "5", status: CellStatus.CORRECT_WRONG_POSITION },
        { val: "-", status: CellStatus.CORRECT },
        { val: "9", status: CellStatus.CORRECT_WRONG_POSITION },
        { val: "2", status: CellStatus.CORRECT_WRONG_POSITION },
      ],
    },
  },
  {
    solution: ["1", "3", "2", "-", "5", "9"],
    expected: {
      triesLeft: 1,
      foundSolution: true,
      solution: [
        { val: "1", status: CellStatus.CORRECT },
        { val: "3", status: CellStatus.CORRECT },
        { val: "2", status: CellStatus.CORRECT },
        { val: "-", status: CellStatus.CORRECT },
        { val: "5", status: CellStatus.CORRECT },
        { val: "9", status: CellStatus.CORRECT },
      ],
    },
  },
];
