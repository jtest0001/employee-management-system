describe("Navigation spec", () => {
  const fakeEmployees = [
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
  ];

  beforeEach(() => {
    cy.intercept("GET", "/api/employees", { body: fakeEmployees }).as(
      "getEmployees",
    );
    cy.intercept("GET", "/api/employee/*", {
      body: {
        id: "15",
        firstName: "Leonardo",
        lastName: "Guzman",
        email: "leonardo.guzman@example.com",
        phoneNumber: "96675432",
        gender: "Male",
        dateOfBirth: "1990-05-07",
        joinedDate: "2018-06-01",
      },
    }).as("getEmployee");
  });

  it("Successfully navigates to home page when app logo is clicked", () => {
    cy.visit("#/add-employee");
    cy.get("[data-testid=app-logo]").click();
    cy.location("pathname").should("eq", "/");
  });

  it("Successfully navigates to add employee page when add employee button is clicked", () => {
    cy.visit("/");
    cy.wait("@getEmployees");
    cy.contains("button", "Add Employee").click();
    cy.location("hash").should("eq", "#/add-employee");
  });

  it("Successfully navigates to edit employee page when add employee button is clicked", () => {
    cy.visit("/");
    cy.wait("@getEmployees");
    cy.get("[data-testid=edit-15]").click();
    cy.location("hash").should("eq", "#/employee/edit/15");
  });

  it("Successfully renders not found page when user navigate to unexpected route", () => {
    cy.visit("#/unexpected-route");
    cy.contains("404");
    cy.contains("Page Not Found");
    cy.contains(
      "The page you’re trying to access may have been removed, renamed, or you may not have the right permissions.",
    );
  });
});
