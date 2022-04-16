import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

interface MotorcycleDocument extends Motorcycle, Document { }

enum TypeCategory {
  Street = 'Street',
  Custom = 'Custom',
  Trail = 'Trail',
}
// ref: https://github.com/Automattic/mongoose/issues/9535
// ref: solução para a tipagem de category

const motorcycleSchema = new Schema<MotorcycleDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: { type: String, enum: Object.values(TypeCategory) },
  engineCapacity: Number,
}, { 
  versionKey: false });

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motorcycle', motorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;
