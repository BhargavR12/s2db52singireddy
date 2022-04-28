var express = require('express');
const house_controller = require('../controllers/house');
var router = express.Router();

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
}

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('houses', { title: 'Search Results' });
});
*/
/* GET detail costume page */ 
router.get('/detail', house_controller.house_view_one_Page); 

/* GET create costume page */ 
router.get('/create', secured, house_controller.house_create_Page); 

/* GET costumes */
router.get('/', house_controller.house_view_all_Page );

/* GET create update page */ 
router.get('/update', secured, house_controller.house_update_Page); 

/* GET delete costume page */ 
router.get('/delete',secured, house_controller.house_delete_Page); 

module.exports = router;
