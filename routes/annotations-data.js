const express = require('express');
const router = express.Router();

/* GET about listing. */
router.get('/annotations-data', function(req, res, next) {
        res.render('annotations-data', { title: 'Sunflower Genome Database' });
    });

module.exports = router;
