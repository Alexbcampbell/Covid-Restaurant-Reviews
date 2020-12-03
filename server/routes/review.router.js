const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/details/:id', (req, res) => {
  // GET route code here
  pool
    .query(
      `SELECT "reviews".* FROM "restaurants" 
    LEFT JOIN "restaurants_reviews" ON "restaurants".id = "restaurants_reviews".restaurants_id
    LEFT JOIN "reviews" ON "restaurants_reviews".reviews_id = "reviews".id
    WHERE "restaurants".id = $1
    `,
      [req.params.id]
    )
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  pool
    .query(`SELECT * FROM "reviews" ORDER BY "id" ASC;`)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  const newReview = req.body;
  const queryText = `INSERT INTO "reviews" ("rating", "masks", "tables", "party_size", "sanitizer_offered", "menu", "comments")
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  const queryValues = [
    newReview.rating,
    newReview.masks,
    newReview.tables,
    newReview.party_size,
    newReview.sanitizer_offered,
    newReview.menu,
    newReview.comments,
  ];
  pool
    .query(queryText, queryValues)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('ERROR POSTING REVIEW: ', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const newReview = req.body;
  const queryText = `UPDATE "reviews" 
  SET "rating"=$1, "masks"=$2, "tables"=$3, "party_size"=$4, "sanitizer_offered"=$5, "menu"=$6, "comments"=$7
  WHERE "reviews".id=$8;`;
  const queryArray = [
    newReview.rating,
    newReview.masks,
    newReview.tables,
    newReview.party_size,
    newReview.sanitizer_offered,
    newReview.menu,
    newReview.comments,
    req.params.id,
  ];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const queryArray = [req.params.id];
  const arguments = [
    {
      queryText: 'DELETE FROM "restaurants_reviews" WHERE "reviews_id"=$1',
      queryArray,
    },
    { queryText: 'DELETE FROM "reviews" WHERE id=$1', queryArray },
  ];

  const requests = arguments.map((arg) =>
    deleteReview(arg.queryText, arg.queryArray)
  );
  return Promise.all(requests)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

const deleteReview = (queryText, queryArray) => {
  pool
    .query(queryText, queryArray)
    .then((res) => {
      return;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
};

module.exports = router;
