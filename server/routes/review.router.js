const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

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
  const queryText = `INSERT INTO "reviews" ("masks", "tables", "party_size", "sanitizer_offered", "menu", "comments")
    VALUES ($1, $2, $3, $4, $5, $6)`;
  const queryValues = [
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
      console.log('ERROR POSTING PLANT: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
