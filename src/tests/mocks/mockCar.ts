import { Types } from 'mongoose';

export const createCar = {
  "model": "Feretertrrari Maranello",
  "year": 1993,
  "color": "green",
  "buyValue": 35000,
  "seatsQty": 2,
  "doorsQty": 2
}

export const createdCar = {
  "model": "Feretertrrari Maranello",
  "year": 1993,
  "color": "green",
  "buyValue": 35000,
  "doorsQty": 2,
  "seatsQty": 2,
  "_id": "6254f09f1549daf7cec1035f",
}

export const allCars = [
  {
    _id: new Types.ObjectId(),
    model: 'Uno da Escada',
    year: 1963,
    color: 'blue',
    buyValue: 3500,
    seatsQty: 4,
    doorsQty: 4,  },
  {
    _id: new Types.ObjectId(),
    model: 'ferrari',
    year: 1999,
    color: 'red',
    buyValue: 300500,
    seatsQty: 2,
    doorsQty: 2
  }
]

export const findOneCar = {
  _id: "4edd40c86762e0fb12000003",
  model: "Fiat Uno",
  year: 1963,
  color: "blue",
  buyValue: 3500,
  seatsQty: 4,
  doorsQty: 4
};

export const editedObj = {
  _id: "4edd40c86762e0fb12000003",
  model: "honda fit",
  year: 2000,
  color: "blue",
  buyValue: 9500,
  seatsQty: 4,
  doorsQty: 4
};