/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MathlerRenderer } from "../../src/components/MathlerRenderer";
import { Solution } from "../../src/game/MathlerEngine";
import userEvent from "@testing-library/user-event";

describe("<MathlerRenderer />", () => {
  const target = {
    result: 73,
    solution: ["1", "3", "2", "-", "5", "9"] as Solution,
  };

  it("should display a [6x6] rendered grid with default values", () => {
    render(<MathlerRenderer target={target} />);

    const inputCells = screen.getAllByTestId("input-cell");
    expect(inputCells).toHaveLength(36);
    expect(inputCells[0]).toHaveFocus();

    inputCells.forEach((cell) => {
      expect(cell).toHaveAttribute("maxlength", "1");
      expect(cell).toHaveAttribute("type", "text");
      expect(cell).toHaveValue("");
    });
  });

  it("should be able to input values into the grid", async () => {
    const user = userEvent.setup();

    render(<MathlerRenderer target={target} />);

    const inputCells = screen.getAllByTestId("input-cell");

    await user.type(inputCells[0], "1");
    await user.type(inputCells[1], "2");
    await user.type(inputCells[2], "0");
    await user.type(inputCells[3], "-");
    await user.type(inputCells[4], "4");
    await user.type(inputCells[5], "7");

    expect(inputCells[0]).toHaveValue("1");
    expect(inputCells[1]).toHaveValue("2");
    expect(inputCells[2]).toHaveValue("0");
    expect(inputCells[3]).toHaveValue("-");
    expect(inputCells[4]).toHaveValue("4");
    expect(inputCells[5]).toHaveValue("7");
  });

  const validValuesToCheck = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "/",
    "*",
  ];
  it.each(validValuesToCheck)(
    "should be able to insert %s into the input cells",
    async (valueToCheck) => {
      const user = userEvent.setup();

      render(<MathlerRenderer target={target} />);

      const inputCells = screen.getAllByTestId("input-cell");

      await user.type(inputCells[0], valueToCheck);
      expect(inputCells[0]).toHaveValue(valueToCheck);
    }
  );

  const invalidValuesToCheck = [
    "K",
    ":",
    "|",
    "<",
    ">",
    "%",
    "`",
    "&",
    "L",
    "z",
  ];
  it.each(invalidValuesToCheck)(
    "should not be able to insert an invalid value of %s into the input cells",
    async (valueToCheck) => {
      const user = userEvent.setup();

      render(<MathlerRenderer target={target} />);

      const inputCells = screen.getAllByTestId("input-cell");

      await user.type(inputCells[0], valueToCheck);
      expect(inputCells[0]).toHaveValue("");
    }
  );

  it("should be able to click the reset button and clear the grid", async () => {
    const user = userEvent.setup();

    render(<MathlerRenderer target={target} />);

    const inputCells = screen.getAllByTestId("input-cell");

    await user.type(inputCells[0], "1");

    const resetStateButton = screen.getByTestId("reset-state-button");

    await user.click(resetStateButton);

    inputCells.forEach((cell) => {
      expect(cell).toHaveValue("");
    });
  });
});
