const express = require("express");

// database access using knex
const db = require("../data/dbConfig.js");

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    db.select('*') 
    .from('accounts') //returns a promise
    .then(accountsArray => {
        res.status(200).json({ data: accountsArray});
    })
      .catch(error => {
        res.status(500).json({message: "Sorry, Error "});
      });      
    });


	router.get('/:id', (req, res) => {
		const { id } = req.params;
		//SELECT * FROM posts WHERE id = id;/
		 db('accounts')
		 //.where("id", "=", id)/
		 //.where({id: id})
		 .where("id", id)
		 .first()
		.then((account) =>res.status(200).json({data: accountsArray}))
		 .catch( (err) => console.log(accounts));
		});
//Can add  if statement so the client knows that what they are searching for is not available if(post){
//     res.status(200).json({data: rows});
// } else{
//     res.status(404).json({message:"Post Not found"})
// }



router.post('/', (req, res) => {
	db('accounts')
	.insert(req.body, "id")
	.then(ids => {
		res.status(201).json({results: ids});
	})
	.catch(error => {
		res.status(500).json({message: "Sorry, Error "});
});
});



router.put('/:id', (req, res) => {
	const { id } =req.params;
	const changes = req.body;
	//UPDATE posts SET field = "new value" WHERE id = id;
	db('accounts')
	.where('id', id)
	.update(changes)
	.then((count) => {
		if (count > 0) {
			res.status(200).json({data: count});
		} else {
			res.status(404).json({message: 'there was no record to update'})
		}
	  })
	  .catch();
	});
	

	router.delete('/:id', (req, res) => {
		const { id } =req.params;
		
		//DELETE posts SET field = "new value" WHERE id = id;
		db('accounts')
		.where('id', id)
		.del()
		.then((count) => {
			if (count > 0) {
				res.status(200).json({data: count});
			} else {
				res.status(404).json({message: 'there was no record to update'})
			}
		  })
		  .catch();
	});
	
	
	

module.exports = router;
