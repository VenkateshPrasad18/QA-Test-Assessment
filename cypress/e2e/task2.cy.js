describe('UI Automation', () => {
  beforeEach(() => {
    cy.visit('https://easecommerce.in/app/login');
  });

  it('Login Test', () => {
    // 1. Login to the application
    cy.get('#login-form-username').type('demouser@easecommerce.in');
    cy.get('#login-form-password').type('cE7iQPP^');
    cy.get('button[data-test="login-submit-button"]').click();
    cy.get('.MuiAvatar-img.css-1hy9t21').should('be.visible');

    // 2. Switch to Employee View
    cy.get("button[aria-label='Open Settings']").click();
    cy.get("li:nth-child(1) p:nth-child(1)").click();
    cy.get(".MuiTypography-root.MuiTypography-body1.css-1t0s23d").should('be.visible');

    // 3. Task Creation with some  missing fields and check submit button is disabled 
    cy.contains('Add Task').should('exist').click();
    cy.get('[data-test="super-category-combo-box"]').click()
    cy.get('li[role="option"]').first().click()
    cy.get('[data-test="sub-category-combo-box"]').click()
    cy.get('li[role="option"]').first().click()
    cy.get('[data-test="portals-combo-box"]').click()
    cy.get('li[role="option"]').first().click()
    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains('Field is required').should('exist');


    // 4. Task Creation with all required fields filled 
    cy.get('[data-test="super-category-combo-box"]').click()
    cy.get('li[role="option"]').first().click()
    cy.get('[data-test="sub-category-combo-box"]').click()
    cy.get('li[role="option"]').eq(2).click()
    cy.get('[data-test="portals-combo-box"]').click()
    cy.get('li[role="option"]').first().click()
    cy.get('[data-test="products-combo-box"]').click()
    cy.get('li[role="option"]').last().click()
    cy.get('#task-name-input').type('Test Task Name')
    cy.get('[data-test="assignedTo-combo-box"]').click()
    cy.get('li[role="option"]').first().click()
    cy.get('[data-test="reviewer-combo-box"]').click()
    cy.get('li[role="option"]').first().click()
    cy.get('[data-test="priority-combo-box"]').click()
    cy.get('li[role="option"]').first().click()
    cy.get('input[placeholder="DD/MM/YYYY"]').type('25/12/2023')
    cy.get('.ql-editor').type('Test task description')
    cy.get('input[type="file"]').selectFile('C:/Users/chara/Desktop/Assessment/cypress/fixtures/sample.csv', { force: true })
    cy.get('button[type="submit"]').should('not.be.disabled')
    cy.get('button[type="submit"]').click();
    cy.get("div[role='presentation'] button:nth-child(2)").click();
    cy.url().should('include', '/task-management/tasks')
    cy.contains('Task created successfully').should('be.visible')

  });

});