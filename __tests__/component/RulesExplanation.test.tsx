/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RulesExplanation } from "../../src/components/RulesExplanation";
import { MathlerEngine } from "../../src/game/MathlerEngine";

describe("<RulesExplanation />", () => {
  it("shows not found message", () => {
    const engine = new MathlerEngine();
    engine.setTarget(73, ["1", "3", "2", "-", "5", "9"]);

    render(<RulesExplanation engine={engine} />);

    expect(screen.getByTestId("rules-explanation-heading")).toHaveTextContent(
      "Try to find the equation that equals: 73"
    );
    expect(screen.getByTestId("rules-explanation-inputs")).toHaveTextContent(
      "You have 6 tries, Valid inputs are 0-9, +, -, *, /"
    );
  });
});
