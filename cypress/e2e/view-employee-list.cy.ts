describe("View employee list spec", () => {
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
  });

  it("Successfully list all employees in the home page", () => {
    cy.visit("/");
    cy.wait("@getEmployees");
    cy.get("[data-testid=15]").should("exist");
    cy.get("[data-testid=16]").should("exist");
    cy.get("[data-testid=17]").should("exist");
  });

  it("Shows error toast when fetch employee api fails", () => {
    cy.intercept("GET", "/api/employees", {
      statusCode: 500, // HTTP error
      body: { message: "Internal Server Error" }, // optional body
    }).as("getEmployeesFail");

    cy.visit("/");
    cy.wait("@getEmployeesFail");
    cy.contains("Failed to fetch employees", { timeout: 10000 }).should(
      "be.visible",
    );
  });
});
