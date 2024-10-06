describe('User Retrieval Tests', () => {
    it('Get Users', () => {
        cy.request({
            method: 'GET',
            url: "https://reqres.in/api/users/2",
        }).then(Response => {
            expect(Response.status).to.eq(200);
        });
    });
});

describe('Single User Retrieval Tests', () => {
    it('Single User Found', () => {
        cy.request({
            method: 'GET',
            url: "https://reqres.in/api/users/2"
        }).then(Response => {
            expect(Response.status).to.eq(200);
        });
    });

    it('Single User Not Found', () => {
        cy.request({
            method: 'GET',
            url: "https://reqres.in/api/users/23",
            failOnStatusCode: false
        }).then(Response => {
            expect(Response.status).to.eq(404);
            expect(Response.body).to.be.empty;
        });
    });
});

describe('Resource Retrieval Tests', () => {
    it('List Resources', () => {
        cy.request({
            method: 'GET',
            url: "https://reqres.in/api/unknown",
        }).then(Response => {
            expect(Response.status).to.eq(200);
        });
    });

    it('Single Resource', () => {
        cy.request({
            method: 'GET',
            url: "https://reqres.in/api/unknown/2"
        }).then(Response => {
            expect(Response.status).to.eq(200);
        });
    });

    it('Single Resource Not Found', () => {
        cy.request({
            method: 'GET',
            url: "https://reqres.in/api/unknown/23",
            failOnStatusCode: false
        }).then(Response => {
            expect(Response.status).to.eq(404);
            expect(Response.body).to.be.empty;
        });
    });
});

describe('User Creation and Update Tests', () => {
    it('Create User', () => {
        cy.request({
            method: 'POST',
            url: "https://reqres.in/api/users",
            body: {
                "name": "morpheus",
                "job": "leader",
            }
        }).then(Response => {
            expect(Response.status).to.eq(201);
        });
    });

    it('Update User (PUT)', () => {
        cy.request({
            method: 'PUT',
            url: "https://reqres.in/api/users/2",
            body: {
                "name": "morpheus",
                "job": "zion resident"
            }
        }).then(Response => {
            expect(Response.status).to.eq(200);
        });
    });

    it('Update User (PATCH)', () => {
        cy.request({
            method: 'PATCH',
            url: "https://reqres.in/api/users/2",
            body: {
                "name": "morpheus",
                "job": "zion resident"
            }
        }).then(Response => {
            expect(Response.status).to.eq(200);
        });
    });
});

describe('User Deletion Test', () => {
    it('Delete User', () => {
        cy.request({
            method: 'DELETE',
            url: "https://reqres.in/api/users/2"
        }).then(Response => {
            expect(Response.status).to.eq(204);
        });
    });
});

describe('User Registration Tests', () => {
    it('Register Successful', () => {
        cy.request({
            method: 'POST',
            url: "https://reqres.in/api/register",
            body: {
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('token');
            expect(response.body.id).to.eq(4);
            expect(response.body.token).to.eq('QpwL5tke4Pnpja7X4');
        });
    });

    it('Register Unsuccessful', () => {
        cy.request({
            method: 'POST',
            url: "https://reqres.in/api/register",
            body: {
                "email": "sydney@fife"
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.eq('Missing password');
        });
    });
});

describe('User Login Tests', () => {
    it('Login Successful', () => {
        cy.request({
            method: 'POST',
            url: "https://reqres.in/api/login",
            body: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            expect(response.body.token).to.eq('QpwL5tke4Pnpja7X4');
        });
    });

    it('Login Unsuccessful', () => {
        cy.request({
            method: 'POST',
            url: "https://reqres.in/api/login",
            body: {
                "email": "peter@klaven"
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.eq('Missing password');
        });
    });
});

describe('Delayed Response Test', () => {
    it('Delayed Response Verification', () => {
        const startTime = new Date().getTime();

        cy.request({
            method: 'GET',
            url: "https://reqres.in/api/users?delay=3"
        }).then(response => {
            expect(response.status).to.eq(200);
            const elapsedTime = new Date().getTime() - startTime;
            expect(elapsedTime).to.be.greaterThan(3000);
            expect(response.body.data).to.be.an('array');

            response.body.data.forEach(user => {
                expect(user).to.have.property('id');
                expect(user).to.have.property('email');
                expect(user).to.have.property('first_name');
                expect(user).to.have.property('last_name');
                expect(user).to.have.property('avatar');
            });
        });
    });
});
