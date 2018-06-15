var express = require('express');
var router = express.Router();
var expense = require('../controllers/expenseCtrl');
var sessionMdl = require('../controllers/session-middleware');

/* GET home page. */
router.post('/save', sessionMdl.sessionCheck, expense.saveExpense);

router.get('/get', sessionMdl.sessionCheck, expense.getExpenses);

router.put('/update', expense.updateExpense);

router.delete('/delete', expense.removeExpense);

router.post('/type/create', expense.createType);
router.get('/type/get', expense.getType);


/*
*/
/*router.get('/amanities', admin.getAmenities);
router.post('/amanities', admin.saveAmenities);
router.put('/amanities', admin.updateAmenities);
router.delete('/amanities', admin.removeAmenity);*/

module.exports = router;
