// models/car.model.js

class Car {
  constructor(
    id,
    userId,
    model,
    year,
    plateNumber,
    color = null, // Optional color
    mileage = null, // Optional mileage
    imageUrl = null // Optional image URL
  ) {
    this.id = id;
    this.userId = userId;
    this.model = model;
    this.year = year;
    this.plateNumber = plateNumber;
    this.color = color;
    this.mileage = mileage;
    this.imageUrl = imageUrl;
  }
}

module.exports = Car;
