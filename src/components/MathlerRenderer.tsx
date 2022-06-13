import React, { useState } from "react";
import {
  Cell,
  CellStatus,
  MathlerEngine,
  Solution,
} from "../game/MathlerEngine";
import clsx from "clsx";
import { useStore } from "../store/store";
import { RulesExplanation } from "./RulesExplanation";

interface Props {
  target?: { result: number; solution: Solution };
}

export function MathlerRenderer({
  target = { result: 73, solution: ["1", "3", "2", "-", "5", "9"] },
}: Props) {
  const [engine] = useState<MathlerEngine>(() => {
    const engine = new MathlerEngine();
    engine.setTarget(target.result, target.solution);
    engine.onUpdate(onEngineUpdate);
    return engine;
  });

  const [engineCells, setEngineCells] = useState<Cell[][]>(engine.getGrid());
  const [attemptsLeft, setAttemptsLeft] = useState<number>(
    engine.getTriesLeft()
  );

  const [gameWon, setGameWon] = useState<boolean>(false);

  const [openActionDialog, openAlert] = useStore((state) => [
    state.openActionDialog,
    state.openAlert,
  ]);

  function onEngineUpdate(
    triesLeft: number,
    foundSolution: boolean,
    updatedGridCells: Cell[][]
  ) {
    setAttemptsLeft(triesLeft);
    setGameWon(foundSolution);
    setEngineCells(updatedGridCells);

    if (!foundSolution && triesLeft === 0) {
      openActionDialog("loss");
    } else if (foundSolution) {
      openActionDialog("win");
    }
  }

  function checkSolution() {
    if (attemptsLeft > 0) {
      const solution: Solution = engineCells[engine.getTriesUsed()].map(
        (cell) => cell.val
      );

      try {
        engine.checkSolution(solution);
      } catch (error: any) {
        openAlert(error.message);
      }
    } else {
      openActionDialog("loss");
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
    setGameWon(false);
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
      <RulesExplanation engine={engine} />

      <div className={"flex flex-col gap-2 rounded bg-midnight p-4"}>
        {engineCells.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={"flex flex-row items-center justify-center gap-2"}
          >
            {row.map((cell, cellIndex) => (
              <input
                data-testid={"input-cell"}
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
                readOnly={cell.status !== CellStatus.UNKNOWN || gameWon}
                onFocus={(event) => event.target.select()}
              />
            ))}
          </div>
        ))}
      </div>

      <div className={"flex w-full gap-1"}>
        <button
          data-testid={"reset-state-button"}
          className={
            "mt-4 w-1/3 rounded border-4 border-white bg-gray-200 py-2 font-bold active:bg-gray-300"
          }
          onClick={() => reset()}
        >
          Reset
        </button>

        <button
          data-testid={"check-solution-button"}
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
