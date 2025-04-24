 describe('Login API Tests', () => {
    const apiUrl = 'https://easecommerce.in/api/v2/login';

    it('Positive Test - Valid Credentials', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                username: 'demouser@easecommerce.in',
                password: 'cE7iQPP^',
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('token');
            Cypress.env('authToken', response.body.token);
        });
    });
    //Negative Test Cases
    it('Negative Test - Invalid Password', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            failOnStatusCode: false, 
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                username: 'demouser@easecommerce.in',
                password: 'wrongPassword',
            },
        }).then((response) => {
            expect(response.status).to.be.oneOf([401, 400]);
            expect(response.body).to.have.property('message');
        });
    });

    it('Negative Test - Invalid Username', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                username: 'invalid@easecommerce.in',
                password: 'cE7iQPP^',
            },
        }).then((response) => {
            expect(response.status).to.be.oneOf([401, 400]);
            expect(response.body).to.have.property('message');
        });
    });

    it('Negative Test - Missing Fields', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {},
        }).then((response) => {
            expect([500]).to.include(response.status);
            expect(response.body).to.have.property('message');
        });
    });


});


//warehouse API Tests
describe('Warehouse List API Tests', () => {
    let token;
  
    before(() => {
      cy.request({
        method: 'POST',
        url: 'https://easecommerce.in/api/v2/login',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          username: 'demouser@easecommerce.in',
          password: 'cE7iQPP^',
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('token');
        token = response.body.token;
      });
    });
  
    it('Positive Test - Get Warehouse List with Valid Token', () => {
      cy.request({
        method: 'GET',
        url: 'https://easecommerce.in/api/v2/manage/warehouse/master/list?group=default',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
    
    //Negative Test Cases
    it('Negative Test - Get Warehouse List with Invalid Token', () => {
      cy.request({
        method: 'GET',
        url: 'https://easecommerce.in/api/v2/manage/warehouse/master/list?group=default',
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer invalidtoken12345`,
        },
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message');
      });
    });
  
    it('Negative Test - Get Warehouse List without Token', () => {
      cy.request({
        method: 'GET',
        url: 'https://easecommerce.in/api/v2/manage/warehouse/master/list?group=default',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([401, 403]);
        expect(response.body).to.have.property('message');
      });
    });
  });