import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { createCar, createdCar, allCars, findOneCar, editedObj } from '../../mocks/mockCar'
import { Car } from '../../../interfaces/CarInterface';
import { Document } from 'mongoose';

type returnType = Car & Document<any, any, any> & { _id: any; }

describe('Rota /cars', () => {
  let carModel = new CarModel();
  let carService = new CarService(carModel);

  before(() => {
    sinon
      .stub(carModel.model, 'create')
      .resolves(createdCar as returnType);
    sinon
      .stub(carModel.model, 'find')
      .resolves(allCars as returnType[]);
    sinon
      .stub(carModel.model, 'findOne')
      .resolves(findOneCar as returnType);
  });

  after(() => {
    (carModel.model.create as sinon.SinonStub).restore();
    (carModel.model.find as sinon.SinonStub).restore();
    (carModel.model.findOne as sinon.SinonStub).restore();
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
    expect(mockCar[0].model).to.be.equal('Uno da Escada')
    expect(mockCar[1].model).to.be.equal('ferrari')
    expect(mockCar[0].seatsQty).to.be.equal(4)
    expect(mockCar[1].seatsQty).to.be.equal(2)
    expect(mockCar[0].color).to.be.equal('blue')
    expect(mockCar[1].color).to.be.equal('red')
  })

  it('testa se o método findOne do CarModel está implementado da maneira correta', async () => {
    const mockCar = await carModel.readOne('4edd40c86762e0fb12000003');

    expect(mockCar).to.be.an('object');
    expect(mockCar.model).to.be.equal('Fiat Uno');
    expect(mockCar.year).to.be.equal(1963);
    expect(mockCar.color).to.be.equal('blue');
    expect(mockCar.buyValue).to.be.equal(3500);
    expect(mockCar.seatsQty).to.be.equal(4);
    expect(mockCar.doorsQty).to.be.equal(4);
  })

});

describe('Rota /cars', () => {
  let carModel = new CarModel();

  before(() => {
    sinon
      .stub(carModel.model, 'findOne')
      .resolves(editedObj as returnType);
    sinon
      .stub(carModel.model, 'updateOne');
  });

  after(() => {
    (carModel.model.findOne as sinon.SinonStub).restore();
    (carModel.model.updateOne as sinon.SinonStub).restore();
  })

  it('testa se o método update do CarModel está implementado da maneira correta', async () => {
    const mockCar = await carModel.update('4edd40c86762e0fb12000003', editedObj);

    expect(mockCar).to.be.an('object');
    expect(mockCar.model).to.be.equal('honda fit');
    expect(mockCar.year).to.be.equal(2000);
    expect(mockCar.color).to.be.equal('blue');
    expect(mockCar.buyValue).to.be.equal(9500);
    expect(mockCar.seatsQty).to.be.equal(4);
    expect(mockCar.doorsQty).to.be.equal(4);
  })
});

describe('Rota /cars', () => {
  let carModel = new CarModel();

  before(() => {
    sinon
      .stub(carModel.model, 'findOne')
      .resolves(editedObj as returnType);
    sinon
      .stub(carModel.model, 'findOneAndDelete');

  });

  after(() => {
    (carModel.model.findOne as sinon.SinonStub).restore();
    (carModel.model.findOneAndDelete as sinon.SinonStub).restore();
  })

  it('testa se o método delete do CarModel está implementado da maneira correta', async () => {
    const mockCar = await carModel.delete('4edd40c86762e0fb12000003');

    expect(mockCar).to.be.an('object');
    expect(mockCar.model).to.be.equal('honda fit');
    expect(mockCar.year).to.be.equal(2000);
    expect(mockCar.color).to.be.equal('blue');
    expect(mockCar.buyValue).to.be.equal(9500);
    expect(mockCar.seatsQty).to.be.equal(4);
    expect(mockCar.doorsQty).to.be.equal(4);
  })
});