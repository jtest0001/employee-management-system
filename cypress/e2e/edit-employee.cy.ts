describe("Edit employee spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/employees", {
      body: [
        {
          id: "17",
          firstName: "Anthony",
          lastName: "Valencia",
          email: "anthony.valencia@example.com",
          phoneNumber: "84562345",
          gender: "Male",
          dateOfBirth: "1991-07-18",
          joinedDate: "2020-09-09",
        },
      ],
    }).as("getEmployees");

    cy.intercept("GET", "/api/employees/*", {
      id: "17",
      firstName: "Anthony",
      lastName: "Valencia",
      email: "anthony.valencia@example.com",
      phoneNumber: "84562345",
      gender: "Male",
      dateOfBirth: "1991-07-18",
      joinedDate: "2020-09-09",
    }).as("getEmployee");

    cy.intercept("PUT", "/api/employees/*", {
      id: "17",
      firstName: "Updated",
      lastName: "Valencia",
      email: "anthony.valencia@example.com",
      phoneNumber: "84562345",
      gender: "Male",
      dateOfBirth: "1991-07-18",
      joinedDate: "2020-09-09",
    }).as("updateEmployee");

    cy.visit("/");
    cy.wait("@getEmployees");

    cy.get("[data-testid=edit-17]").click();
  });

  it("Successfully edit an employee", () => {
    cy.wait("@getEmployee");
    cy.contains("label", "First Name")
      .parent()
      .find("input")
      .clear()
      .type("Updated");

    cy.contains("button", "Submit").click();

    cy.wait("@updateEmployee");
    cy.contains("Successfully updated employee");
  });

  it("Navigates to other route when user confirms unsaved changes dialog", () => {
    cy.contains("label", "First Name")
      .parent()
      .find("input")
      .clear()
      .type("Updated");
    cy.contains("button", "Cancel").click();
    cy.contains("Unsaved Changes");
    cy.contains(
      "Form has been modified. You will lose your unsaved changes. Are you sure you want to close this form?",
    );
    cy.contains("button", "Yes").click();
    cy.location("pathname").should("eq", "/"); // just the path
  });

  it("Stays in edit employee form when user rejects unsaved changes dialog", () => {
    cy.contains("label", "First Name")
      .parent()
      .find("input")
      .clear()
      .type("Updated");
    cy.contains("button", "Cancel").click();
    cy.contains("Unsaved Changes");
    cy.contains(
      "Form has been modified. You will lose your unsaved changes. Are you sure you want to close this form?",
    );
    cy.contains("button", "No").click();
    cy.location("pathname").should("eq", "/employee/edit/17"); // just the path
  });

  it("Failed to update employee", () => {
    cy.intercept("PUT", "/api/employees/*", {
      statusCode: 500,
    }).as("updateEmployee");

    cy.contains("label", "First Name")
      .parent()
      .find("input")
      .clear()
      .type("Updated");

    cy.contains("button", "Submit").click();
    cy.contains("Failed to update employee");
  });
});
