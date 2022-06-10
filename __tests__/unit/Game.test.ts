import { CellStatus, Game, Solution } from "../../src/game/Game";

describe("Game Logic", () => {
  let game: Game;

  const RESULT = 73;
  const TARGET_SOLUTION: Solution = ["1", "3", "2", "-", "5", "9"];

  beforeEach(() => {
    game = new Game(RESULT, TARGET_SOLUTION);
    expect(game.getResult()).toEqual(RESULT);
    expect(game.getTargetSolution()).toEqual(TARGET_SOLUTION);
  });

  it("should create a Mather [6x6] grid with the initial states being empty", () => {
    expect(game.grid.length).toEqual(6);

    for (let i = 0; i < 6; ++i) {
      const row = game.getSolutionAt(i);
      expect(row.length).toEqual(6);
    }
  });

  it("should load the solution and flag the cells with the correct status", () => {
    const { triesLeft, foundSolution } = game.checkSolution([
      "1",
      "2",
      "0",
      "-",
      "4",
      "7",
    ]);

    expect(triesLeft).toEqual(5);
    expect(foundSolution).toBeFalsy();
    expect(game.getSolutionAt(0)).toEqual([
      { val: "1", status: CellStatus.CORRECT },
      { val: "2", status: CellStatus.CORRECT_WRONG_POSITION },
      { val: "0", status: CellStatus.INCORRECT },
      { val: "-", status: CellStatus.CORRECT },
      { val: "4", status: CellStatus.INCORRECT },
      { val: "7", status: CellStatus.INCORRECT },
    ]);
  });

  it("should throw an error when the solution has a size less than the target", () => {
    expect(() => game.checkSolution(["1", "2", "0", "-", "4"])).toThrow(Error);
  });

  it("should throw an error when the solution has a size greater than the target", () => {
    expect(() =>
      game.checkSolution(["1", "2", "0", "-", "4", "7", "1"])
    ).toThrow(Error);
  });
});
