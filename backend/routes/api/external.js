const express = require('express');
const router = express.Router();

const { GoogleMapsAPI } = require('../../config');

router.get('/googleMap', (req, res) => {
    return res.status(200).json({'api': GoogleMapsAPI});
});




module.exports = router;
