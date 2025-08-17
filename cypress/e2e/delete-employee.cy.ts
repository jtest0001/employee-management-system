describe("Delete employee spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/employees", {
      body: [
        {
          id: "15",
          firstName: "Leonardo",
          lastName: "Guzman",
          email: "leonardo.guzman@example.com",
          phoneNumber: "96675432",
          gender: "Male",
          dateOfBirth: "1990-05-07",
          joinedDate: "2018-06-01",
        },
        {
          id: "16",
          firstName: "Frances",
          lastName: "Dominguez",
          email: "frances.dominguez@example.com",
          phoneNumber: "93451267",
          gender: "Female",
          dateOfBirth: "1996-12-20",
          joinedDate: "2022-02-11",
        },
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

    cy.intercept("DELETE", "/api/employees/*", {
      statusCode: 200,
    }).as("deleteEmployee");
  });

  it("Successfully delete an employee", () => {
    // Visit home page
    cy.visit("/");
    cy.wait("@getEmployees");

    // Mock api after deletion
    cy.intercept("GET", "/api/employees", {
      body: [
        {
          id: "16",
          firstName: "Frances",
          lastName: "Dominguez",
          email: "frances.dominguez@example.com",
          phoneNumber: "93451267",
          gender: "Female",
          dateOfBirth: "1996-12-20",
          joinedDate: "2022-02-11",
        },
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
    }).as("getEmployeesAfterDeletion");

    // Click delete button of employee 15
    cy.get("[data-testid=delete-15]").click();
    cy.contains("Are you sure you want to delete this employee?");

    // Confirm deletion
    cy.contains("button", "Yes").click();

    // Popup after confirmation
    cy.contains("Are you sure you want to delete this employee?").should(
      "not.exist",
    );

    cy.wait("@deleteEmployee");

    cy.contains("Successfully deleted employee");
    cy.get("[data-testid=delete-15]").should("not.exist");
  });

  it("Cancels deletion of employee in confirmation dialog", () => {
    // Visit home page
    cy.visit("/");
    cy.wait("@getEmployees");

    // Click delete button of employee 15
    cy.get("[data-testid=delete-15]").click();
    cy.contains("Are you sure you want to delete this employee?");

    // Cancel deletion
    cy.contains("button", "No").click();

    // Popup after confirmation
    cy.contains("Are you sure you want to delete this employee?").should(
      "not.exist",
    );

    cy.get("[data-testid=delete-15]").should("exist");
  });

  it("Shows error toast when delete employee api fails", () => {
    cy.intercept("DELETE", "/api/employees/*", {
      statusCode: 500,
    }).as("deleteEmployee");

    cy.visit("/");
    cy.wait("@getEmployees");

    // Click delete button of employee 15
    cy.get("[data-testid=delete-15]").click();
    cy.contains("Are you sure you want to delete this employee?");

    // Confirm deletion
    cy.contains("button", "Yes").should("be.visible").click();

    // Error toast
    cy.contains("Failed to delete employee", { timeout: 10000 }).should(
      "be.visible",
    );
  });
});
