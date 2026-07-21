# Database Architecture

## Core Schemas
Database tables are modeled within MongoDB using Mongoose schemas.

### 👥 User Schema
* `name`: string, required
* `phone`: string, unique index, required
* `password`: bcrypt hashed string
* `role`: 'buyer' | 'seller' (defaults to 'seller')

### 🐐 Listing Schema
* `seller`: Reference -> User id
* `animalType`: 'Goat' | 'Sheep'
* `breed`: string
* `age`: number
* `ageUnit`: 'Months' | 'Years'
* `weight`: number (KG)
* `district`: string
* `village`: string
* `description`: string
* `originalPrice`: number
* `discount`: number (percentage value)
* `offerPrice`: number (computed internally)
* `phone`: string
* `alternatePhone`: string
* `images`: array of strings
* `location`: GeoJSON point syntax `{ type: "Point", coordinates: [lng, lat] }`
* `status`: 'Available' | 'Sold'
* `createdAt`: timestamp
