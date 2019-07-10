const chai = require("chai");
const chaiHttp = require("chai-http");
const server=require("../app");
const should = chai.should();
const sinon = require("sinon");

chai.use(chaiHttp);

describe("Books", function(){
	let total_books = 0
	let updated_id = 0
	let last_rec = null

	// beforeEach(function() {
	// 	this.request = sinon.stub(http, 'request');
	// });
 
	// afterEach(function() {
	// 	http.request.restore();
	// 	// sinon.restore();
	// });

    describe ("CRUD OPERATIONS", function(){
        var books = {
            "isbn": "isbn-001",
            "title": "World Is Best",
            "author": "Larry",
            "year": 2019,
			"publishedOn": 2019,
			"numberOfPages": 30
        }

        it("Should add Books in DB", (done) => {
            chai.request(server)
				.post("/books/")
				.send(books)
				.end((err, res) => {
					res.should.have.status(200);
					console.log("Response Body:", res.body);                        
				})
            done()
        })
    
        it ("Should Fecth all the Books", (done)=>{
            chai.request(server)
                .get("/books/")
                .end((err, result)=>{
					result.should.have.status(200);
					total_books = result.body.length
					console.log ("Got ", total_books, " result(s)")
					last_rec = result.body[total_books-1]
                    console.log ("last_rec: ", last_rec);            
                    // console.log ("Result Body:", result.body);            
                    done()
                })
        })

        it ("Should Fetch a Single Book", (done)=>{
			x = Math.floor((Math.random() * total_books) + 1);
            chai.request(server)
                .get("/books/"+last_rec.id)
                .end((err, result)=>{                    
                    result.should.have.status(200)
					console.log("Fetched Book id: ", last_rec.id)
					console.log(result.body)
                    done()
                })
        })

        it ("Should Update a Book", (done)=>{
            var updatedBook = {
                "isbn": "isbn-999",
                "title": "Armageddon",
                "author": "John",
                "year": "2017"
            }

            chai.request(server)
                .put("/books/"+last_rec.id)
                .send(updatedBook)
                .end((err, result)=>{                    
                    result.should.have.status(200)
                    console.log("Updated book id", last_rec.id)
                    done()
                })
        })

        it("Should Delete Particular Book", (done)=>{
			// x = Math.floor((Math.random() * total_books) + 1);
            chai.request(server)
                .delete("/books/"+last_rec.id)
                .end((err, result)=>{					
                    result.should.have.status(200)                
                    console.log("Deleted Particlar Book id: ",last_rec.id)    
                    done()
                })
        })

        it("Should confirm delete with number of Docs from DB", (done)=>{
            chai.request(server)
                .get("/books")
                .end((err, result)=>{
                    result.should.have.status(200);
                    result.body.length.should.eq(total_books);
                    console.log ("Got",result.body.length, " docs")
                    //console.log ("Result Body:", result.body);
                    done()
                })
        })
	})
})