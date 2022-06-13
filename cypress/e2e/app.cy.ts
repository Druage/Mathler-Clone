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
});
