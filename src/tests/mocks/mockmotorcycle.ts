import { Types } from 'mongoose';

export const createMoto = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const createdMoto = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const allMotos = [
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "red",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 125
  },
  {
    _id: "4edd40c86762e0fb12065891",
    model: "Kawasaki Ninja",
    year: 2012,
    color: "green",
    buyValue: 20000,
    category: "Street",
    engineCapacity: 125
  }
]

export const findOneMoto = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

export const editedObj = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

export const wrongObjectToCreation = {
  _id: "4edd40c86762e0fb12000003",
  model: "k",
  year: 2030,
  color: "red",
  buyValue: 3500,
  category: "Xablau",
  engineCapacity: 125
}