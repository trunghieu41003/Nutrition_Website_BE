const express = require('express');
const router = express.Router();
const {getHomepage, getABC} = require('../controllers/homeController')

// router.Method('/route', handler)
// Route mặc định cho URL /
router.get('/123', (req, res) => {

    res.send('Hello World');

});
router.get('/', getHomepage);
router.get('/abc', getABC);

module.exports = router;