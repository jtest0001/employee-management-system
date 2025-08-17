const fillUpForm = () => {
  cy.contains("label", "First Name").parent().find("input").type("Anthony");
  cy.contains("label", "Last Name").parent().find("input").type("Valencia");
  cy.contains("label", "Email")
    .parent()
    .find("input")
    .type("anthony.valencia@example.com");
  cy.contains("label", "Phone Number").parent().find("input").type("84562345");

  cy.contains("label", "Gender").click();
  cy.get('[role="option"]').contains("Female").click();

  cy.contains("label", "Date of Birth").click();
  cy.get("td[role='gridcell']")
    .not("[aria-disabled='true']")
    .contains(/^1$/)
    .click();

  cy.contains("label", "Joined Date").click();
  cy.get("td[role='gridcell']")
    .not("[aria-disabled='true']")
    .contains(/^2$/)
    .click();
};

describe("Add employee spec", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/employees", {
      id: "17",
      firstName: "Anthony",
      lastName: "Valencia",
      email: "anthony.valencia@example.com",
      phoneNumber: "84562345",
      gender: "Male",
      dateOfBirth: "1991-07-18",
      joinedDate: "2020-09-09",
    }).as("addEmployee");
  });

  it("Successfully added employee", () => {
    cy.visit("#/add-employee");

    fillUpForm();

    cy.contains("button", "Submit").click();
    cy.wait("@addEmployee");

    cy.contains("Successfully added employee");
  });

  it("Navigates to other route when user confirms unsaved changes dialog", () => {
    cy.visit("#/add-employee");

    fillUpForm();

    cy.contains("button", "Cancel").click();
    cy.contains("Unsaved Changes");
    cy.contains(
      "Form has been modified. You will lose your unsaved changes. Are you sure you want to close this form?",
    );
    cy.contains("button", "Yes").click();
    cy.location("pathname").should("eq", "/");
  });

  it("Stays in add employee form when user rejects unsaved changes dialog", () => {
    cy.visit("#/add-employee");

    fillUpForm();

    cy.contains("button", "Cancel").click();
    cy.contains("Unsaved Changes");
    cy.contains(
      "Form has been modified. You will lose your unsaved changes. Are you sure you want to close this form?",
    );
    cy.contains("button", "No").click();
    cy.location("hash").should("eq", "#/add-employee");
  });

  it("Failed to add employee", () => {
    cy.intercept("POST", "/api/employees", {
      statusCode: 500,
    }).as("addEmployee");

    cy.visit("#/add-employee");

    fillUpForm();

    cy.contains("button", "Submit").click();
  });
});
