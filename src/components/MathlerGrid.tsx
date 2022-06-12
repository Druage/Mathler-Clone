import React, { useState } from "react";
import {
  Cell,
  CellStatus,
  MathlerEngine,
  Solution,
} from "../game/MathlerEngine";
import clsx from "clsx";

export function MathlerGrid() {
  const [engine] = useState<MathlerEngine>(() => {
    const engine = new MathlerEngine();
    engine.setTarget(73, ["1", "3", "2", "-", "5", "9"]);
    engine.onUpdate(onEngineUpdate);
    return engine;
  });

  const [engineCells, setEngineCells] = useState<Cell[][]>(engine.getGrid);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(
    engine.getTriesLeft()
  );

  const [gameWon, setGameWon] = useState<boolean>(false);

  function onEngineUpdate(
    triesLeft: number,
    foundSolution: boolean,
    updatedGridCells: Cell[][]
  ) {
    console.log(engine.toString());

    setAttemptsLeft(triesLeft);
    setGameWon(foundSolution);
    setEngineCells(updatedGridCells);
  }

  function checkSolution() {
    if (attemptsLeft > 0) {
      const solution: Solution = engineCells[engine.getTriesUsed()].map(
        (cell) => cell.val
      );

      try {
        engine.checkSolution(solution);
      } catch (error: any) {
        console.log(error.message);
        console.log(engine.toString());
      }
    } else {
      alert("YOU HAVE NO TRIES LEFT AND HAVE LOST!");
    }
  }

  function changeCellColorOnStatus(cell: Cell): string {
    if (cell.status === CellStatus.CORRECT) {
      return "bg-emerald";
    } else if (cell.status === CellStatus.CORRECT_WRONG_POSITION) {
      return "bg-sun-flower";
    } else if (cell.status === CellStatus.INCORRECT) {
      return "bg-alizarin";
    }
    return "bg-gray-100";
  }

  function reset() {
    engine.reset();
  }

  function updateEngineCell(
    event: any,
    rowIndex: number,
    cellIndex: number,
    cell: Cell
  ) {
    if (new RegExp("[\\d\\+\\-\\*\\/]").test(event.target.value)) {
      const copy = [...engineCells];
      copy[rowIndex][cellIndex] = {
        ...cell,
        val: event.target.value,
      };
      setEngineCells(copy);
    } else {
      event.preventDefault();
    }
  }

  return (
    <div>
      <div className={"mb-6 mt-3 text-center text-xl text-white"}>
        <div>
          Try to find the equation that equals: <b>{engine.getResult()}</b>
        </div>
        <em className={"text-sm"}>
          You have {engine.getTries()} tries, Valid inputs are 0-9, +, -, *, /
        </em>
      </div>

      <div className={"flex flex-col gap-2 rounded bg-midnight p-4"}>
        {engineCells.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={"flex flex-row items-center justify-center gap-2"}
          >
            {row.map((cell, cellIndex) => (
              <input
                className={clsx(
                  "h-11 w-11 rounded text-center text-lg font-bold focus:outline focus:outline-4 focus:outline-amnethyst",
                  changeCellColorOnStatus(cell)
                )}
                autoFocus={rowIndex === 0 && cellIndex === 0}
                type={"text"}
                maxLength={1}
                key={cellIndex}
                value={cell.val === null ? "" : cell.val.toString()}
                onInput={(event) =>
                  updateEngineCell(event, rowIndex, cellIndex, cell)
                }
                readOnly={cell.status !== CellStatus.UNKNOWN}
                onFocus={(event) => event.target.select()}
              />
            ))}
          </div>
        ))}
      </div>

      <div className={"flex w-full gap-1"}>
        <button
          className={
            "mt-4 w-1/3 border border-slate-800 bg-blue-100 py-2 font-bold active:bg-blue-200"
          }
          onClick={() => reset()}
        >
          Reset
        </button>

        <button
          className={
            "mt-4 flex-1 rounded border-4 border-soft-amnethyst bg-amnethyst py-2 font-bold text-white shadow-xl active:bg-dark-amnethyst"
          }
          onClick={() => checkSolution()}
        >
          Check Solution
        </button>
      </div>
    </div>
  );
}
