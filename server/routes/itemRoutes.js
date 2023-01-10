const express = require('express');
const router = express.Router();

//import controllers
const itemsController = require('../controllers/itemsController');

/* define routes */
router.get('/', itemsController.getItems);

// define route to catch the items under which brand
router.get('/brand/:brand', itemsController.getItemsByBrand);

router.get('/search', itemsController.search);


module.exports = router;
    

