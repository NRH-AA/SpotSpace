const express = require('express');
const router = express.Router();

const { GoogleMapsAPI } = require('../../config');
const { requireAuth } = require('../../utils/auth');

router.get('/googleMap', requireAuth, (req, res) => {
    return res.status(200).json({'api': GoogleMapsAPI});
});




module.exports = router;
