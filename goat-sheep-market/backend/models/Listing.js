const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  animalType: {
    type: String,
    required: true,
    enum: ['Goat', 'Sheep']
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  ageUnit: {
    type: String,
    required: true,
    enum: ['Months', 'Years'],
    default: 'Months'
  },
  weight: {
    type: Number,
    required: true
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  village: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  offerPrice: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  alternatePhone: {
    type: String,
    trim: true,
    default: ''
  },
  images: {
    type: [String],
    default: []
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  status: {
    type: String,
    enum: ['Available', 'Sold'],
    default: 'Available'
  }
}, { timestamps: true });

ListingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Listing', ListingSchema);
