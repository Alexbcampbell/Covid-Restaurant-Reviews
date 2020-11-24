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
    .query(`SELECT * FROM "restaurants" ORDER BY "id" ASC;`)
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
  const newRestaurant = req.body;
  const queryText = `INSERT INTO "restaurants" ("name", "street", "city", "state")
    VALUES ($1, $2, $3, $4)`;
  const queryValues = [
    newRestaurant.name,
    newRestaurant.street,
    newRestaurant.city,
    newRestaurant.state,
  ];
  pool
    .query(queryText, queryValues)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('ERROR POSTING RESTAURANT: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
