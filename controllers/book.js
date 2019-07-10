const connections = require('../db/connection');

exports.insertBook = function(req, res){
    let title = req.body.title;
    let author = req.body.author;
    let isbn = req.body.isbn;
    let publishedOn = req.body.publishedOn;
    let numberOfPages = req.body.numberOfPages;
    connections.query(
        "insert into book(title,author,isbn,publishedOn,numberOfPages) values(?, ?, ?, ?, ?)",
        [title, author, isbn, publishedOn, numberOfPages],
        function(err, result){
            if (err) throw err
            rs = result.insertId
            res.json({"book_id": rs});
        }
    )
}

exports.getBooks = function(req, res){
    connections.query(
		"select id,title,author,isbn,publishedOn,numberOfPages from book",
		function(err, result){
			if (err) throw err
			res.json(result);
		}
	)
}

exports.getBookById = function(req, res){
    connections.query(
		"select title,author,isbn,publishedOn,numberOfPages from book where id = ?",
		[req.params.bookId],
		function(err, result){
			if (err) throw err
			res.json(result[0]);
		}
	)
}

exports.updateBookById = function(req, res){
    let title = req.body.title;
	let author = req.body.author;
	let isbn = req.body.isbn;
	let publishedOn = req.body.publishedOn;
	let numberOfPages = req.body.numberOfPages;
	console.log("req.body: ", req.body);

	qry_str = "update book set ";
	qry_str_arr = [];
	params = [];

	if (typeof title != 'undefined' || title != null){
		qry_str_arr.push("title = ? ");
		params.push(title);
	}
	if(typeof author != 'undefined' || author != null){
		qry_str_arr.push("author = ? ");
		params.push(author);
	}
	if(typeof isbn != 'undefined' || isbn != null){
		qry_str_arr.push("isbn = ? ");
		params.push(isbn);
	}
	if(typeof publishedOn != 'undefined' || publishedOn != null){
		qry_str_arr.push("publishedOn = ? ");
		params.push(publishedOn);
	}
	if(typeof numberOfPages != 'undefined' || numberOfPages != null){
		qry_str_arr.push("numberOfPages = ? ");
		params.push(numberOfPages);
	}
	qry_str += qry_str_arr.join(",");
	qry_str += "where id = ?";
	params.push(req.params.bookId);
	console.log("qry_str: ", qry_str)
	connections.query(qry_str, params,
		function(err, result){
			if (err) throw err
			// res.json({"result": result.affectedRows});
			res.end()
		}
	)
}

exports.discardBookById = function(req, res){
    connections.query(
		"delete from book where id = ?",
		[req.params.bookId],
		function(err, result){
			if (err) throw err;
			res.end();
		}
	)
}