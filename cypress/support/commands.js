// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillAllRequiredFieldsExcept', (excludedSelector) => {
    const fieldsToFill = [
      { selector: '[data-test="super-category-combo-box"]', value: 'Category{enter}' },
      { selector: '[data-test="sub-category-combo-box"]', value: 'Subcategory{enter}' },
      { selector: '#task-name-input', value: 'Test Task' },
      { selector: '[data-test="assignedTo-combo-box"]', value: 'User{enter}' },
      { selector: '[data-test="reviewer-combo-box"]', value: 'Reviewer{enter}' },
      { selector: '[data-test="priority-combo-box"]', value: 'High{enter}' },
      { selector: 'input[placeholder="DD/MM/YYYY"]', value: '31/12/2024' },
      { selector: '.ql-editor', value: 'Test Description' }
    ];
  
    fieldsToFill.forEach((field) => {
      if (field.selector !== excludedSelector) {
        cy.get(field.selector).type(field.value);
      }
    });
  });
  
  Cypress.Commands.add('clearRequiredFields', () => {
    const fieldsToClear = [
      '[data-test="super-category-combo-box"] input',
      '[data-test="sub-category-combo-box"] input',
      '#task-name-input',
      '[data-test="assignedTo-combo-box"] input',
      '[data-test="reviewer-combo-box"] input',
      '[data-test="priority-combo-box"] input',
      'input[placeholder="DD/MM/YYYY"]',
      '.ql-editor'
    ];
  
    fieldsToClear.forEach((selector) => {
      cy.get(selector).clear();
    });
  });