/**
 * Database Seeder Script
 * Run using: node seed.js
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../backend/models/User');
const Listing = require('../backend/models/Listing');

require('dotenv').config({ path: '../backend/.env' });

const MONGO_URI ='mongodb+srv://Chandu:Chandu1234567@cluster0.j9vfols.mongodb.net/goat_sheep_market?retryWrites=true&w=majority';

const sampleUsers = [
  {
    name: "Ramu Kuruma",
    phone: "9876543210",
    password: "password123",
    role: "seller"
  },
  {
    name: "Mallesham Yadav",
    phone: "8765432109",
    password: "password123",
    role: "seller"
  }
];

const sampleListings = [
  {
    animalType: "Goat",
    breed: "Kanchi",
    age: 18,
    ageUnit: "Months",
    weight: 45,
    district: "Mahbubnagar",
    village: "Jadcherla",
    description: "Healthy active breeding goat. Good genetics, immunized.",
    originalPrice: 15000,
    discount: 10,
    offerPrice: 13500,
    phone: "9876543210",
    alternatePhone: "9000112233",
    images: [
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=600&q=80"
    ],
    location: {
      type: "Point",
      coordinates: [78.1501, 16.7431] // Jadcherla coordinates
    },
    status: "Available"
  },
  {
    animalType: "Sheep",
    breed: "Nellore Brown",
    age: 12,
    ageUnit: "Months",
    weight: 38,
    district: "Nellore",
    village: "Gudur",
    description: "High quality premium Nellore Brown sheep, perfect for meat processing.",
    originalPrice: 18000,
    discount: 15,
    offerPrice: 15300,
    phone: "8765432109",
    alternatePhone: "",
    images: [
      "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=600&q=80"
    ],
    location: {
      type: "Point",
      coordinates: [79.8501, 14.1501] // Gudur coordinates
    },
    status: "Available"
  }
];

async function seedDatabase() {
  try {
    console.log("Connecting to database at:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("Connected successfully!");

    // Clean current structures
    await User.deleteMany({});
    await Listing.deleteMany({});
    console.log("Cleared existing users and listings.");

    // Insert Users with encrypted passwords
    const usersCreated = [];
    for (let u of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      u.password = await bcrypt.hash(u.password, salt);
      const savedUser = await User.create(u);
      usersCreated.push(savedUser);
    }
    console.log(`Inserted ${usersCreated.length} users successfully!`);

    // Assign listings to corresponding users
    const seller1 = usersCreated.find(u => u.phone === "9876543210");
    const seller2 = usersCreated.find(u => u.phone === "8765432109");

    sampleListings[0].seller = seller1._id;
    sampleListings[1].seller = seller2._id;

    await Listing.create(sampleListings);
    console.log("Inserted mock listings successfully.");

    console.log("Database seeding finished.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding operation crashed:", error);
    process.exit(1);
  }
}

seedDatabase();
