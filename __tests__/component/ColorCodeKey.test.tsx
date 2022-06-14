/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ColorCodeKey } from "../../src/components/ColorCodeKey";

describe("<ColorCodeKey />", () => {
  it("should display to color codes and descriptions", () => {
    render(<ColorCodeKey />);

    screen.getByText("Correct");

    screen.getByText("Wrong Position");

    screen.getByText("Incorrect");
  });
});
