import { evaluate } from "mathjs";

type ArithmeticOps = "+" | "-" | "*" | "/";
type NumberOps = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type GridOps = NumberOps | ArithmeticOps | null;

export type Solution = GridOps[];

export enum CellStatus {
  CORRECT,
  CORRECT_WRONG_POSITION,
  INCORRECT,
  UNKNOWN,
}

export type Cell = { val: GridOps; status: CellStatus };

export class Game {
  grid: Cell[][];

  result: number | undefined;
  targetSolution: Solution;

  tries: number;
  triesLeft: number;

  constructor(result: number, targetSolution: Solution) {
    this.grid = [];

    for (let i = 0; i < 6; ++i) {
      this.grid.push([
        { val: null, status: CellStatus.UNKNOWN },
        { val: null, status: CellStatus.UNKNOWN },
        { val: null, status: CellStatus.UNKNOWN },
        { val: null, status: CellStatus.UNKNOWN },
        { val: null, status: CellStatus.UNKNOWN },
        { val: null, status: CellStatus.UNKNOWN },
      ]);
    }

    this.result = result;
    this.targetSolution = targetSolution;
    this.tries = 6;
    this.triesLeft = 6;
  }

  // return triesLeft, and the result of the index states, CORRECT, CORRECT_WRONG_POSITION, INCORRECT
  checkSolution(solution: Solution): {
    triesLeft: number;
    foundSolution: boolean;
  } {
    if (solution.length === this.targetSolution.length) {
      if (evaluate(solution.join("")) !== this.result) {
        throw new Error(
          "ResultError: The solution provided does not equal the target result"
        );
      }

      const index = this.tries - this.triesLeft;
      const row = this.grid[index];

      let foundSolution = true;
      for (let i = 0; i < row.length; ++i) {
        row[i].val = solution[i];

        const solutionCell = row[i].val;

        const indexCheck = this.targetSolution.indexOf(solutionCell);
        if (indexCheck === i) {
          row[i].status = CellStatus.CORRECT;
        } else if (indexCheck > -1) {
          row[i].status = CellStatus.CORRECT_WRONG_POSITION;
          foundSolution = false;
        } else {
          row[i].status = CellStatus.INCORRECT;
          foundSolution = false;
        }
      }

      this.triesLeft -= 1;

      return {
        triesLeft: this.triesLeft,
        foundSolution,
      };
    }

    throw new Error(
      "LengthError: The solution provided must be the same length as solution you are trying to find"
    );
  }

  getSolutionAt(index: number): Cell[] {
    return this.grid[index];
  }

  getResult = () => this.result;
  getTargetSolution = () => this.targetSolution;
  getTries = () => this.tries;
  getTriesLeft = () => this.triesLeft;
}
