import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { createCar, createdCar, allCars, findOneCar, editedObj } from '../../mocks/mockCar'
import { Car } from '../../../interfaces/CarInterface';
import { Document } from 'mongoose';
import CarService from '../../../services/CarService';

type returnType = Car & Document<any, any, any> & { _id: any; }

describe('testa camada Service carService', () => {
  let carModel = new CarModel();
  let carService = new CarService(carModel);

  before(() => {
    sinon
      .stub(carService.model, 'create')
      .resolves(createdCar as Car);
    sinon
      .stub(carService.model, 'read')
      .resolves(allCars as returnType[]);
  });

  after(() => {
    (carService.model.create as sinon.SinonStub).restore();
    (carService.model.read as sinon.SinonStub).restore();
  })

  it('teste se o método create do CarService está implementado da maneira correta', async () => {
    const mockCar = await carService.create(createCar as Car);

    expect(mockCar).to.be.an('object');

  });

  it('testa se o método read do CarService está implementado da maneira correta', async () => {
    const mockCar = await carService.read();

    expect(mockCar).to.have.lengthOf(2);
    expect(mockCar[0].model).to.be.equal('Uno da Escada')
    expect(mockCar[1].model).to.be.equal('ferrari')
    expect(mockCar[0].seatsQty).to.be.equal(4)
    expect(mockCar[1].seatsQty).to.be.equal(2)
    expect(mockCar[0].color).to.be.equal('blue')
    expect(mockCar[1].color).to.be.equal('red')
  })

});


describe('testa camada Service carService', () => {
  let carModel = new CarModel();
  let carService = new CarService(carModel);

  before(() => {
    sinon
      .stub(carService.model, 'readOne')
      .resolves(findOneCar as returnType);
  });

  after(() => {
    (carService.model.readOne as sinon.SinonStub).restore();
  })

  it('testa se o método findOne do CarModel está implementado da maneira correta', async () => {
    const mockCar = await carModel.readOne('4edd40c86762e0fb12000003');

    expect(mockCar).to.be.an('object');
    // expect(mockCar.model).to.be.equal('Fiat Uno');
    // expect(mockCar.year).to.be.equal(1963);
    // expect(mockCar.color).to.be.equal('blue');
    // expect(mockCar.buyValue).to.be.equal(3500);
    // expect(mockCar.seatsQty).to.be.equal(4);
    // expect(mockCar.doorsQty).to.be.equal(4);
  })
});

describe('testa camada Service carService', () => {
  let carModel = new CarModel();
  let carService = new CarService(carModel);

  before(() => {
    sinon
      .stub(carService.model, 'update')
      .resolves(editedObj as returnType);
  });

  after(() => {

    (carService.model.update as sinon.SinonStub).restore();
  })

  it('testa se o método update do CarService está implementado da maneira correta', async () => {
    const mockCar = await carService.update('4edd40c86762e0fb12000003', editedObj);

    expect(mockCar).to.be.an('object');
    // expect(mockCar.model).to.be.equal('honda fit');
    // expect(mockCar.year).to.be.equal(2000);
    // expect(mockCar.color).to.be.equal('blue');
    // expect(mockCar.buyValue).to.be.equal(9500);
    // expect(mockCar.seatsQty).to.be.equal(4);
    // expect(mockCar.doorsQty).to.be.equal(4);
  })
});

describe('testa camada Service carService', () => {
  let carModel = new CarModel();
  let carService = new CarService(carModel);

  before(() => {
    sinon
      .stub(carService.model, 'delete')
      .resolves(editedObj as returnType);
  });

  after(() => {
    (carService.model.delete as sinon.SinonStub).restore();
  })

  it('testa se o método delete do CarService está implementado da maneira correta', async () => {
    const mockCar = await carService.delete('4edd40c86762e0fb12000003');

    expect(mockCar).to.be.an('object');
    // expect(mockCar.model).to.be.equal('honda fit');
    // expect(mockCar.year).to.be.equal(2000);
    // expect(mockCar.color).to.be.equal('blue');
    // expect(mockCar.buyValue).to.be.equal(9500);
    // expect(mockCar.seatsQty).to.be.equal(4);
    // expect(mockCar.doorsQty).to.be.equal(4);
  })
});