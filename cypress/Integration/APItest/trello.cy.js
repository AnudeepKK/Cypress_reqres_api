describe('Trello', () => {

    const base = "https://api.trello.com";
    const apikey = Cypress.env('TRELLO_API_KEY') || process.env.TRELLO_API_KEY; //in .env file
    const token = Cypress.env('TRELLO_TOKEN') || process.env.TRELLO_TOKEN; //in .env file
    const board="Test Board";
    let id;

    it('Creating a board', () => {
        cy.request({

            method:"POST",
            url:base+"/1/boards/",
            qs:{
                name:board,
                key:apikey,
                token:token,
            }
        }).then(response=>{
            const res = JSON.parse(JSON.stringify(response.body))
            id=res.id
            expect(response.status).to.eql(200)
        })
    });
    it('get a board', () => {
        cy.request({

            method:"GET",
            url:base+"/1/boards/"+id,
            qs:{
                name:"Update",
                key:apikey,
                token:token,
            }
        }).then(response=>{
            const res = JSON.parse(JSON.stringify(response.body))
            expect(response.status).to.eql(200)
        })
    });
    it('Update a board', () => {
        cy.request({

            method:"PUT",
            url:base+"/1/boards/"+id,
            qs:{
                name:"Update",
                key:apikey,
                token:token,
            }
        }).then(response=>{
            const res = JSON.parse(JSON.stringify(response.body))
            expect(response.status).to.eql(200)
        })
    });
    it('delete a board', () => {
        cy.request({

            method:"DELETE",
            url:base+"/1/boards/"+id,
            qs:{
                key:apikey,
                token:token,
            }
        }).then(response=>{
            const res = JSON.parse(JSON.stringify(response.body))
            expect(response.status).to.eql(200)
        })
    });
});

