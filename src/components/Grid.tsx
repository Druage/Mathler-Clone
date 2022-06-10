import React from "react";
import { MathlerEngine, Solution } from "../game/MathlerEngine";

export function Grid() {
  const resultNumber = 73;
  const targetSolution: Solution = ["1", "3", "2", "-", "5", "9"];
  const game = new MathlerEngine(resultNumber, targetSolution);

  return (
    <div className={"flex flex-col gap-2"}>
      {game.getGrid().map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={"flex flex-row items-center justify-center gap-2"}
        >
          {row.map((cell, cellIndex) => (
            <input
              className={
                "border-slate-500s h-12 w-12 rounded border-2 border-slate-400 text-center text-lg font-bold focus:outline-purple-400"
              }
              autoFocus={rowIndex === 0 && cellIndex === 0}
              type={"text"}
              maxLength={1}
              key={cellIndex}
              value={cell.val?.toString()}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
