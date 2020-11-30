const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/details/:id', (req, res) => {
  // GET route code here
  console.log(req.body);
  pool
    .query(
      `SELECT * FROM "restaurants"
  JOIN "restaurants_reviews" ON "restaurants".id = "restaurants_reviews".restaurants_id
  JOIN "reviews" ON "restaurants_reviews".reviews_id = "reviews".id
  WHERE "restaurants".id = $1
  `,
      [req.params.id]
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in getting details', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
