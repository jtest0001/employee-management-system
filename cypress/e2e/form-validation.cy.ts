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

describe("Form validation spec", () => {
  it("Blocks form submission if form is empty", () => {
    cy.visit("/add-employee");
    cy.contains("button", "Submit").should("be.disabled");
  });

  it("Shows validation logic for first name", () => {
    cy.visit("/add-employee");

    fillUpForm();
    cy.contains("label", "First Name")
      .parent()
      .find("input")
      .clear()
      .type("test");

    cy.contains("button", "Submit").click();
    cy.contains("Minimum 6 characters required for this field");

    cy.contains("label", "First Name")
      .parent()
      .find("input")
      .clear()
      .type("testtesttest");

    cy.contains("button", "Submit").click();
    cy.contains("Maximum 10 characters allowed for this field");
  });

  it("Shows validation logic for last name", () => {
    cy.visit("/add-employee");

    fillUpForm();
    cy.contains("label", "Last Name")
      .parent()
      .find("input")
      .clear()
      .type("test");

    cy.contains("button", "Submit").click();
    cy.contains("Minimum 6 characters required for this field");

    cy.contains("label", "Last Name")
      .parent()
      .find("input")
      .clear()
      .type("testtesttest");

    cy.contains("button", "Submit").click();
    cy.contains("Maximum 10 characters allowed for this field");
  });

  it("Shows validation logic for email", () => {
    cy.visit("/add-employee");

    fillUpForm();
    cy.contains("label", "Email").parent().find("input").clear();

    cy.contains("button", "Submit").click();
    cy.contains("Invalid email address");
  });

  it("Shows validation logic for Phone Number", () => {
    cy.visit("/add-employee");

    fillUpForm();
    cy.contains("label", "Phone Number")
      .parent()
      .find("input")
      .clear()
      .type("12345678");

    cy.contains("button", "Submit").click();
    cy.contains("Phone number must be a valid Singapore number");
  });

  it("Shows validation logic for Gender", () => {
    cy.visit("/add-employee");

    cy.contains("label", "First Name").parent().find("input").type("Anthony");

    cy.contains("button", "Submit").click();
    cy.contains("Invalid gender");
  });

  it("Shows validation logic for date pickers", () => {
    cy.visit("/add-employee");

    cy.contains("label", "First Name").parent().find("input").type("Anthony");

    cy.contains("button", "Submit").click();
    cy.contains("Invalid date");
  });
});
