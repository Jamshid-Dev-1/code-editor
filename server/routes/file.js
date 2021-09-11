const controller = require('../controllers/file');
const express = require('express');
const router = express.Router();


router.get('/codes/newCache',controller.createRoom)
router.get('/codes/:nanoCode',controller.fetchCodes);
router.patch('/codes/update/:nanoCode',controller.updateCodes);

module.exports = router;
