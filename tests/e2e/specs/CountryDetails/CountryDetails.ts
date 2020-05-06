import {
  countriesListSelectors,
  visitCountriesList
} from "../../support/countriesList";

describe("CountriesDetails", () => {
  it("Display country details", () => {
    visitCountriesList();
    cy.get(countriesListSelectors.country(1).container).click();
    cy.url().should("include", "Taiwan");
  });
});
