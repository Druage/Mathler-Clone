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
      return "bg-green-500";
    } else if (cell.status === CellStatus.CORRECT_WRONG_POSITION) {
      return "bg-yellow-500";
    } else if (cell.status === CellStatus.INCORRECT) {
      return "bg-red-500";
    }
    return "";
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

      <button
        className={
          "mt-4 border border-slate-800 bg-blue-100 py-2 font-bold active:bg-blue-200"
        }
        onClick={() => reset()}
      >
        Reset
      </button>

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
