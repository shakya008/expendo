var express = require('express');
var router = express.Router();
var admin = require('../controllers/adminCtrl');



/*
*/
router.get('/amanities', admin.getAmenities);
router.post('/amanities', admin.saveAmenities);
router.put('/amanities', admin.updateAmenities);
router.delete('/amanities', admin.removeAmenity);

module.exports = router;
