const express = require('express');
const router = express.Router();
const { getListings, getListingById, createListing, updateListing, deleteListing } = require('../controllers/listingController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getListings);
router.get('/:id', getListingById);
router.post('/', protect, upload.array('images', 4), createListing);
router.put('/:id', protect, upload.array('images', 4), updateListing);
router.delete('/:id', protect, deleteListing);

module.exports = router;
