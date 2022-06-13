import React from "react";
import { MathlerEngine } from "../game/MathlerEngine";

interface Props {
  engine: MathlerEngine;
}

export function RulesExplanation({ engine }: Props) {
  return (
    <div className={"mb-6 mt-3 text-center text-xl text-white"}>
      <div data-testid={"rules-explanation-heading"}>
        Try to find the equation that equals: <b>{engine.getResult()}</b>
      </div>
      <em className={"text-sm"} data-testid={"rules-explanation-inputs"}>
        You have {engine.getTries()} tries, Valid inputs are 0-9, +, -, *, /
      </em>
    </div>
  );
}
