var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var house_controller = require('../controllers/house');

// A little function to check if we have an authorized user and continue on

// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
req.session.returnTo = req.originalUrl;
res.redirect("/login");
}
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// house ROUTES ///
// POST request for creating a house.
router.post('/houses', house_controller.house_create_post);
// DELETE request to delete house.
router.delete('/houses/:id', house_controller.house_delete);
// PUT request to update house.
router.put('/houses/:id', house_controller.house_update_put);
// GET request for one house.
router.get('/houses/:id', house_controller.house_detail);
// GET request for list of all house items.
router.get('/houses', house_controller.house_list);
/* GET detail house page */
router.get('/detail', house_controller.house_view_one_Page);
/* GET create house page */
router.get('/create', secured, house_controller.house_create_Page);

/* GET create update page */
router.get('/update',secured,  house_controller.house_update_Page);

/* GET delete house page */
router.get('/delete', secured,  house_controller.house_delete_Page);
module.exports = router;
