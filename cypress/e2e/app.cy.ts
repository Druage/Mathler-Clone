describe("E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should serve game under the / endpoint, rendering all the elements", () => {
    cy.findByAltText("mathler-logo");
    cy.findByText("Try to find the equation that equals:");
    cy.findByText("You have 6 tries, Valid inputs are 0-9, +, -, *, /");

    cy.findByText("Reset");
    cy.findByText("Check Solution");

    cy.findAllByTestId("input-cell").should((inputCells) => {
      expect(inputCells).to.have.length(36);
      const inputVals = Array.from(inputCells, (el: any) => el.value);

      inputVals.forEach((val) => {
        expect(val).to.eql("");
      });
    });
  });

  it("should show the win action dialog if the user found the correct solution", () => {
    cy.findAllByTestId("input-cell").eq(0).type("1").should("have.value", "1");
    cy.findAllByTestId("input-cell").eq(1).type("3").should("have.value", "3");
    cy.findAllByTestId("input-cell").eq(2).type("2").should("have.value", "2");
    cy.findAllByTestId("input-cell").eq(3).type("-").should("have.value", "-");
    cy.findAllByTestId("input-cell").eq(4).type("5").should("have.value", "5");
    cy.findAllByTestId("input-cell").eq(5).type("9").should("have.value", "9");

    cy.findByTestId("check-solution-button").click();

    cy.findByTestId("action-dialog");
    cy.findByText("😊 You Won!");
    cy.findByText("You found the correct solution! Good Job!");

    cy.findByTestId("close-action-dialog-button").click();
    cy.findByTestId("action-dialog").should("not.exist");
  });

  it("should show the lose action dialog if the user never found the correct solution", () => {
    const solution = ["1", "2", "0", "-", "4", "7"];

    for (let i = 0; i < 36; ++i) {
      const solutionIndex = i % solution.length;
      cy.findAllByTestId("input-cell")
        .eq(i)
        .type(solution[solutionIndex])
        .should("have.value", solution[solutionIndex]);

      if (solutionIndex === solution.length - 1) {
        cy.findByTestId("check-solution-button").click();
      }
    }

    cy.findByTestId("action-dialog");
    cy.findByText("😔 You Lost");
    cy.findByText("You were not able to find the correct solution", {
      exact: false,
    });

    cy.findByTestId("close-action-dialog-button").click();
    cy.findByTestId("action-dialog").should("not.exist");
  });

  it("should show the alert notification if a user inputs an invalid solution", () => {
    const invalidSolution = ["+", "2", "0", "-", "4", "7"];

    for (let i = 0; i < invalidSolution.length; ++i) {
      cy.findAllByTestId("input-cell")
        .eq(i)
        .type(invalidSolution[i])
        .should("have.value", invalidSolution[i]);
    }
    cy.findByTestId("check-solution-button").click();

    cy.findByTestId("alert-bubble");
    cy.findByText("Error");
    cy.findByText(
      "ResultMathError: The solution provided does not equal the target result"
    );

    cy.findByTestId("close-alert-bubble-button").click();
    cy.findByTestId("alert-bubble").should("not.exist");
  });
});
