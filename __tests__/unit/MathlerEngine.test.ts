import { MathlerEngine, Solution } from "../../src/game/MathlerEngine";
import { playerSimulationTests } from "./contracts/playerSimulationTests";

describe("Engine Logic", () => {
  let game: MathlerEngine;

  const RESULT = 73;
  const TARGET_SOLUTION: Solution = ["1", "3", "2", "-", "5", "9"];

  beforeAll(() => {
    game = new MathlerEngine();
    game.setTarget(RESULT, TARGET_SOLUTION);
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

  describe("[Player Simulation Tests]", () => {
    it("should throw an error when the solution has a size less than the target", () => {
      expect(() => game.checkSolution(["1", "2", "0", "-", "4"])).toThrow(
        "LengthError: The solution provided must be the same length as solution you are trying to find"
      );
    });

    it("should throw an error when the solution has a size greater than the target", () => {
      expect(() =>
        game.checkSolution(["1", "2", "0", "-", "4", "7", "1"])
      ).toThrow(
        "LengthError: The solution provided must be the same length as solution you are trying to find"
      );
    });

    it("should throw an error when the solution does not add up to the result", () => {
      expect(() => game.checkSolution(["1", "2", "0", "-", "4", "2"])).toThrow(
        "ResultError: The solution provided does not equal the target result"
      );
    });

    playerSimulationTests.forEach((test) => {
      it(`should check for a solution using ${test.solution.join("")}`, () => {
        const { solution, expected } = test;
        game.onUpdate((triesLeft, foundSolution, updatedGridCells) => {
          expect(triesLeft).toEqual(expected.triesLeft);
          expect(foundSolution).toEqual(expected.foundSolution);
          expect(
            game.getSolutionAt(game.getTries() - game.getTriesLeft() - 1)
          ).toEqual(expected.solution);
        });
        game.checkSolution(solution);
      });
    });
  });
});
