describe('Album Catalog - Interactions', () => {
    beforeEach(() => {
    cy.visit('/');
  });

  it('looks for songs when searching via search bar', () => {
    const q = 'Be My Love';

    cy.get('[data-cy="search-input"]').clear().type(q);

    cy.contains('a', 'Search').click();
    cy.url().should('include', '/search');
  });

  it('navigates to the first album detail', () => {
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-link"]').click();
    });

    cy.url().should('match', /\/album\/\d+$/);
    cy.get('[data-cy="album-detail-title"]').should('be.visible');
  });

  it('navigates to home page after clicking on Spotify logo', () => {
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-link"]').click();
    });
    cy.url().should('match', /\/album\/\d+$/);

    cy.get('[data-cy="title"]').click();
    cy.url().should('match', /\/$/);
    cy.get('[data-cy="album-card"]').should('have.length.at.least', 1);
  });

  it('navigates to author page after clicking on Author in an album card', () => {
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="about-link"]').click();
    });
    cy.url().should('match', /\/author\/\d+$/);
  });

  it('can search from the album detail page (global navbar works everywhere)', () => {
    const q = 'Be My Love';
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-link"]').click();
    });
    cy.get('[data-cy="album-detail-title"]').should('be.visible');

    cy.get('[data-cy="search-input"]').clear().type(q);
    cy.contains('a', 'Search').click();

    cy.url().should('include', '/search');

  });

  it('goes back to the album list with browser back', () => {
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-link"]').click();
    });
    cy.url().should('match', /\/album\/\d+$/);

    cy.go('back');

    cy.url().should('match', /\/$/);
    cy.get('[data-cy="album-grid"]').should('be.visible');
    cy.get('[data-cy="album-card"]').should('have.length.at.least', 1);
  });
  it('navigates to album page after clicking an album in author page', () => {
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="about-link"]').click();
    });
    cy.url().should('match', /\/author\/\d+$/);

    cy.get('[data-cy="author-album-list"]').first().within(() => {
      cy.get('[data-cy="author-album-item"]').click();
    });

    cy.url().should('match', /\/album\/\d+$/);;
  });
  it('shows error message if albom does not exist', () => {
    cy.visit('/album/000');

    cy.contains('div', 'Album not found').should('be.visible');
  });
});
