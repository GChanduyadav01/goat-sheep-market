const Listing = require('../models/Listing');

exports.getListings = async (req, res) => {
  try {
    const { animalType, district, breed, search, sort } = req.query;
    let query = {};

    if (animalType) {
      query.animalType = animalType;
    }
    if (district) {
      query.district = new RegExp(district, 'i');
    }
    if (breed) {
      query.breed = new RegExp(breed, 'i');
    }
    if (search) {
      query.$or = [
        { breed: new RegExp(search, 'i') },
        { village: new RegExp(search, 'i') },
        { district: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'low-price') {
      sortOption = { offerPrice: 1 };
    } else if (sort === 'high-price') {
      sortOption = { offerPrice: -1 };
    }

    const listings = await Listing.find(query).populate('seller', 'name phone').sort(sortOption);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('seller', 'name phone');
    if (!listing) {
      return res.status(404).json({ message: 'Listing target not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createListing = async (req, res) => {
  try {
    const {
      animalType, breed, age, ageUnit, weight, district, village,
      description, originalPrice, discount, phone, alternatePhone,
      latitude, longitude
    } = req.body;

    const op = Number(originalPrice);
    const disc = Number(discount || 0);
    const offerPrice = op - (op * (disc / 100));

    const images = [];
    if (req.files) {
      req.files.forEach(file => {
        images.push(`/uploads/${file.filename}`);
      });
    }

    const lat = Number(latitude || 17.3850);
    const lng = Number(longitude || 78.4867);

    const listing = new Listing({
      seller: req.user._id,
      animalType,
      breed,
      age: Number(age),
      ageUnit,
      weight: Number(weight),
      district,
      village,
      description,
      originalPrice: op,
      discount: disc,
      offerPrice,
      phone,
      alternatePhone,
      images,
      location: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    });

    const savedListing = await listing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing target not found' });
    }

    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized profile ownership validation failed' });
    }

    const {
      breed, age, ageUnit, weight, district, village, description,
      originalPrice, discount, phone, alternatePhone, status, latitude, longitude
    } = req.body;

    if (breed) listing.breed = breed;
    if (age) listing.age = Number(age);
    if (ageUnit) listing.ageUnit = ageUnit;
    if (weight) listing.weight = Number(weight);
    if (district) listing.district = district;
    if (village) listing.village = village;
    if (description !== undefined) listing.description = description;
    if (phone) listing.phone = phone;
    if (alternatePhone !== undefined) listing.alternatePhone = alternatePhone;
    if (status) listing.status = status;

    if (originalPrice || discount !== undefined) {
      const op = Number(originalPrice || listing.originalPrice);
      const disc = Number(discount !== undefined ? discount : listing.discount);
      listing.originalPrice = op;
      listing.discount = disc;
      listing.offerPrice = op - (op * (disc / 100));
    }

    if (latitude && longitude) {
      listing.location = {
        type: 'Point',
        coordinates: [Number(longitude), Number(latitude)]
      };
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      listing.images = newImages;
    }

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing database target not found' });
    }

    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized permission scope' });
    }

    await Listing.deleteOne({ _id: req.params.id });
    res.json({ message: 'Listing wiped successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
