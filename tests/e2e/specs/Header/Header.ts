const headerSelectors = {
  title: '[data-selector="header-title"]',
  switchTheme: '[data-selector="header-switch"]'
};
describe("Header", () => {
  it("Should display title", () => {
    cy.visit("/");
    cy.contains(headerSelectors.title, "Where in the world?");
  });
});
