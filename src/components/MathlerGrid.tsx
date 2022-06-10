import React, { useState } from "react";
import {
  Cell,
  CellStatus,
  MathlerEngine,
  Solution,
} from "../game/MathlerEngine";
import clsx from "clsx";

const RESULT_NUMBER = 73;
const TARGET_SOLUTION: Solution = ["1", "3", "2", "-", "5", "9"];
const MATHLER_ENGINE = new MathlerEngine(RESULT_NUMBER, TARGET_SOLUTION);

export function MathlerGrid() {
  const [engineCells, setEngineCells] = useState<Cell[][]>(
    MATHLER_ENGINE.getGrid
  );
  const [attemptsLeft, setAttemptsLeft] = useState<number>(
    MATHLER_ENGINE.getTriesLeft()
  );
  const [gameWon, setGameWon] = useState<boolean>(false);

  function checkSolution() {
    if (attemptsLeft > 0) {
      const solution: Solution = engineCells[
        MATHLER_ENGINE.getTries() - attemptsLeft
      ].map((cell) => cell.val);

      const { triesLeft, foundSolution } =
        MATHLER_ENGINE.checkSolution(solution);

      console.log(MATHLER_ENGINE.toString());

      setAttemptsLeft(triesLeft);
      setGameWon(foundSolution);
      setEngineCells(
        MATHLER_ENGINE.getGrid().map(function (cells) {
          return cells.slice();
        })
      );
    } else {
      alert("YOU HAVE NO TRIES LEFT AND HAVE LOST!");
    }
  }

  function changeCellColorOnStatus(cell: Cell): string {
    if (cell.status === CellStatus.CORRECT) {
      return "bg-green-500";
    } else if (cell.status === CellStatus.CORRECT_WRONG_POSITION) {
      return "bg-yellow-500";
    } else if (cell.status === CellStatus.INCORRECT) {
      return "bg-red-500";
    }
    return "";
  }

  return (
    <div className={"flex flex-col gap-2"}>
      {engineCells.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={"flex flex-row items-center justify-center gap-2"}
        >
          {row.map((cell, cellIndex) => (
            <input
              className={clsx(
                "border-slate-500s h-12 w-12 rounded border-2 border-slate-400 text-center text-lg font-bold focus:outline-purple-400",
                changeCellColorOnStatus(cell)
              )}
              autoFocus={rowIndex === 0 && cellIndex === 0}
              type={"text"}
              maxLength={1}
              pattern={"[\\d\\(\\)\\+\\-\\*\\/\\.]{1}"}
              key={cellIndex}
              value={cell.val?.toString()}
              onInput={(event: any) => {
                const copy = [...engineCells];
                copy[rowIndex][cellIndex] = {
                  ...cell,
                  val: event.target.value,
                };
                setEngineCells(copy);
              }}
            />
          ))}
        </div>
      ))}

      <button
        className={
          "mt-4 border border-slate-800 bg-blue-400 py-2 font-bold active:bg-blue-500"
        }
        onClick={() => checkSolution()}
      >
        Enter
      </button>
    </div>
  );
}
