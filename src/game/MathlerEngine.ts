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
type UpdateCallback = (
  triesLeft: number,
  foundSolution: boolean,
  updatedGridCells: Cell[][]
) => void;

export class MathlerEngine {
  grid: Cell[][];

  result: number | undefined;
  targetSolution: Solution | undefined;

  tries: number;
  triesLeft: number;

  updateCallback: UpdateCallback | undefined;

  constructor() {
    this.grid = [];

    this.tries = 6;
    this.triesLeft = 6;

    this.reset();
  }

  setTarget(result: number, solution: Solution) {
    this.result = result;
    this.targetSolution = solution;
  }

  // return triesLeft, and the result of the index states, CORRECT, CORRECT_WRONG_POSITION, INCORRECT
  checkSolution(solution: Solution) {
    if (solution.length === this.targetSolution?.length) {
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

      if (this.updateCallback) {
        this.updateCallback(
          foundSolution ? 0 : this.triesLeft,
          foundSolution,
          this.grid.map((cells) => cells.slice())
        );
      }
    } else {
      throw new Error(
        "LengthError: The solution provided must be the same length as solution you are trying to find"
      );
    }
  }

  toString(): string {
    let str = "";
    this.grid.forEach((row) => {
      str += row.map((cell) => (cell.val ? cell.val : "_")).join(" ");
      str += "\n";
    });

    return str;
  }

  onUpdate(cb: UpdateCallback) {
    this.updateCallback = cb;
  }

  reset() {
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

    this.triesLeft = this.tries;

    if (this.updateCallback) {
      this.updateCallback(this.triesLeft, false, this.grid);
    }
  }

  getSolutionAt(index: number): Cell[] {
    return this.grid[index];
  }

  getResult = () => this.result;
  getTargetSolution = () => this.targetSolution;
  getTries = () => this.tries;
  getTriesLeft = () => this.triesLeft;
  getTriesUsed = () => this.tries - this.triesLeft;

  getGrid = () => this.grid;
}
