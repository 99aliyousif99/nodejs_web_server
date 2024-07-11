const express = require('express'); 
const router = express.Router();
const resgisterController = require('../controllers/registercontroller');

router.post('/', resgisterController.handleNewUser);


module.exports = router;