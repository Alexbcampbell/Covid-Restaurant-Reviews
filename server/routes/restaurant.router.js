const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

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

router.post('/', (req, res) => {
  // POST route code here
  const newRestaurant = req.body;
  const queryText = `INSERT INTO "restaurants" ("name", "street", "city", "state", "longitude", "latitude")
    VALUES ($1, $2, $3, $4, $5, $6)`;
  const queryValues = [
    newRestaurant.name,
    newRestaurant.street,
    newRestaurant.city,
    newRestaurant.state,
    newRestaurant.longitude,
    newRestaurant.latitude,
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
