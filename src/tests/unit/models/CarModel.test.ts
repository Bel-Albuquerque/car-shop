import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { createCar, createdCar, allCars } from '../../mocks/mockCar'
import { Car } from '../../../interfaces/CarInterface';
import { Document } from 'mongoose';

type returnType = Car & Document<any, any, any> & { _id: any; }

describe('Rota /cars', () => {
  let carModel = new CarModel();

  before(() => {
    sinon.stub(carModel.model, 'create').resolves(createdCar as returnType);
    sinon.stub(carModel.model, 'find').resolves(allCars as returnType[]);
      sinon
      .stub(carModel.model, 'findOne')
      .resolves(allCars as never);
      sinon
      .stub(carModel.model, 'updateOne')
      .resolves(allCars as never);
      sinon
      .stub(carModel.model, 'findOneAndDelete')
      .resolves(allCars as never);
  });

  after(() => {
    (carModel.model.create as sinon.SinonStub).restore();
    (carModel.model.find as sinon.SinonStub).restore();
    (carModel.model.findOne as sinon.SinonStub).restore();
    (carModel.model.updateOne as sinon.SinonStub).restore();
    (carModel.model.findOneAndDelete as sinon.SinonStub).restore();
  })

  it('teste se o método create do CarModel está implementado da maneira correta', async () => {
    const mockCar = await carModel.create(createCar);

    expect(mockCar).to.be.an('object');
    expect(mockCar.model).to.be.equal(createdCar.model);
    expect(mockCar.year).to.be.equal(createdCar.year);
    expect(mockCar.color).to.be.equal(createdCar.color);
    expect(mockCar.buyValue).to.be.equal(createdCar.buyValue);
    expect(mockCar.seatsQty).to.be.equal(createdCar.seatsQty);
    expect(mockCar.doorsQty).to.be.equal(createdCar.doorsQty);
  });

  it('testa se o método read do CarModel está implementado da maneira correta', async () => {
    const mockCar = await carModel.read();

    expect(mockCar).to.have.lengthOf(2);
  })

});
