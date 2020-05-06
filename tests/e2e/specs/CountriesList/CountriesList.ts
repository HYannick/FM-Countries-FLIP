import {
  countriesListSelectors,
  visitCountriesList
} from "../../support/countriesList";

describe("CountriesList", () => {
  it("Display all countries", () => {
    visitCountriesList();
    cy.get(countriesListSelectors.cardContainer).should("have.length", 3);
  });

  it("Should have the right country information", () => {
    visitCountriesList();
    cy.get(countriesListSelectors.country(1).picture)
      .should("have.attr", "alt")
      .should("include", "Taiwan-flag");
    cy.contains(countriesListSelectors.country(1).name, "Taiwan");
    cy.contains(countriesListSelectors.country(1).population, "23503349");
    cy.contains(countriesListSelectors.country(1).capital, "Taipei");
    cy.contains(countriesListSelectors.country(1).region, "Asia");
  });
});
