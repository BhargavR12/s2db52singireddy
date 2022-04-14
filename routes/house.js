var express = require('express');
const house_controller = require('../controllers/house');
var router = express.Router();

/* GET home page. */
router.get('/', house_controller.house_view_all_Page);

module.exports = router;
