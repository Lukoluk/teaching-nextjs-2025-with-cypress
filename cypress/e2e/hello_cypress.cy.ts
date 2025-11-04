describe('Album Catalog - Basic Checks', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('opens the homepage', () => {
    cy.visit('/');

    // make this test pass by adding the correct attribute data-cy into your page
    cy.get('[data-cy="title"]').should('be.visible');
    cy.get('[data-cy="title"]').should('contain.text', 'Spotify');
  });

  it('displays the site title in the header', () => {

    cy.get('[data-cy="header-title"]').should('be.visible');
    cy.get('[data-cy="header-title"]').should('contain.text', 'Spotify');
  });

  it('shows at least one album card', () => {
    cy.get('[data-cy="album-grid"]').should('be.visible');
    cy.get('[data-cy="album-card"]').should('have.length.at.least', 1);
  });

  it('album card has a title and Date', () => {
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-title"]').should('be.visible');
      cy.get('[data-cy="album-date"]').should('be.visible');
    });
  });

  it('has a visible search input on the top', () => {
    cy.get('[data-cy="search-input"]').should('be.visible');
  });

  // add at least 3 more tests here

  it('shows a table of songs on the album detail page', () => {
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-link"]').click();
    });

    cy.get('[data-cy="song-table"]').should('be.visible');
  });

  it('shows an author bio on the author page', () => {
  cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="about-link"]').click();
    });
  cy.url().should('match', /\/author\/\d+$/);

  cy.get('[data-cy="author-bio"]').should('be.visible');

  });

  it('shows an album list on the author page', () => {
  cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="about-link"]').click();
    });
  cy.url().should('match', /\/author\/\d+$/);

  cy.get('[data-cy="author-album-list"]').should('be.visible');

  });
});
