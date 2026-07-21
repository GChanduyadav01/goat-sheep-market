# API Documentation

All base requests are rooted at `/api`.

## 🔑 Authentication Routes

### Register a User
* **URL**: `/api/auth/register`
* **Method**: `POST`
* **Headers**: `Content-Type: application/json`
* **Body**:
  ```json
  {
    "name": "Ramu Kuruma",
    "phone": "9876543210",
    "password": "securepassword",
    "role": "seller"
  }
  ```
* **Response (201)**:
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": { "id": "USER_ID", "name": "Ramu Kuruma", "phone": "9876543210", "role": "seller" }
  }
  ```

### Login
* **URL**: `/api/auth/login`
* **Method**: `POST`
* **Headers**: `Content-Type: application/json`
* **Body**:
  ```json
  {
    "phone": "9876543210",
    "password": "securepassword"
  }
  ```
* **Response (200)**:
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": { "id": "USER_ID", "name": "Ramu Kuruma", "phone": "9876543210", "role": "seller" }
  }
  ```

---

## 🐐 Listing Routes

### Get All Listings
* **URL**: `/api/listings`
* **Method**: `GET`
* **Query Parameters** (Optional):
  * `animalType`: `Goat` | `Sheep`
  * `district`: string
  * `breed`: string
  * `search`: string
  * `sort`: `latest` | `low-price` | `high-price`
* **Response (200)**:
  ```json
  [
    {
      "_id": "LISTING_ID",
      "animalType": "Goat",
      "breed": "Nellore",
      "age": 14,
      "ageUnit": "Months",
      "weight": 35,
      "district": "Nellore",
      "village": "Podalakur",
      "originalPrice": 12000,
      "discount": 10,
      "offerPrice": 10800,
      "phone": "9876543210",
      "images": ["/uploads/img1.jpg"],
      "status": "Available",
      "location": { "coordinates": [79.85, 14.45] }
    }
  ]
  ```

### Create Listing
* **URL**: `/api/listings`
* **Method**: `POST`
* **Headers**: `Authorization: Bearer <JWT_TOKEN>`
* **Content-Type**: `multipart/form-data`
* **Body Form Fields**:
  * `animalType`, `breed`, `age`, `ageUnit`, `weight`, `district`, `village`, `description`, `originalPrice`, `discount`, `phone`, `alternatePhone`, `latitude`, `longitude`
  * `images`: up to 4 file fields

### Update/Edit Listing
* **URL**: `/api/listings/:id`
* **Method**: `PUT`
* **Headers**: `Authorization: Bearer <JWT_TOKEN>`

### Delete Listing
* **URL**: `/api/listings/:id`
* **Method**: `DELETE`
* **Headers**: `Authorization: Bearer <JWT_TOKEN>`
