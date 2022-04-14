import { expect } from 'chai';
import sinon from 'sinon';
import CarService from '../../../services/CarService';
import { createCar, createdCar, allCars, findOneCar, editedObj, wrongObjectToCreation } from '../../mocks/mockCar'
import { Car } from '../../../interfaces/CarInterface';
import { Document } from 'mongoose';
import { ServiceError } from '../../../services';

type returnType = Car & Document<any, any, any> & { _id: any; }

describe('testa camada Service carService', () => {
  let carService = new CarService();

  before(() => {
    sinon
      .stub(carService.model, 'create')
      .resolves(createdCar as Car);
  });

  after(() => {
    (carService.model.create as sinon.SinonStub).restore();
  })

  it('teste se o método create do CarService está implementado da maneira correta', async () => {
    const mockCar = await carService.create(createCar as Car);
    const { model, year, color, buyValue, seatsQty, doorsQty } = mockCar as returnType

    expect(mockCar).to.be.an('object');
    expect(model).to.be.equal(createdCar.model);
    expect(year).to.be.equal(createdCar.year);
    expect(color).to.be.equal(createdCar.color);
    expect(buyValue).to.be.equal(createdCar.buyValue);
    expect(seatsQty).to.be.equal(createdCar.seatsQty);
    expect(doorsQty).to.be.equal(createdCar.doorsQty);
  });

  it('testa se o método create do CarService retorna erro quando recebe um objeto que não atende às regras de negócio', async () => {
    const mockCar = await carService.create(wrongObjectToCreation);
    
    expect(mockCar).to.be.an('object');
    expect(mockCar).to.have.property('error')
  });
});

describe('testa camada Service carService', () => {
  let carService = new CarService();

  before(() => {
    sinon
      .stub(carService.model, 'read')
      .resolves(allCars as returnType[]);
  });

  after(() => {
    (carService.model.read as sinon.SinonStub).restore();
  })

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
  let carService = new CarService();

  before(() => {
    sinon
      .stub(carService.model, 'readOne')
      .resolves(findOneCar as returnType);
  });

  after(() => {
    (carService.model.readOne as sinon.SinonStub).restore();
  })

  it('testa se o método findOne do CarService está implementado da maneira correta', async () => {
    const mockCar = await carService.readOne('4edd40c86762e0fb12000003');
    const { model, year, color, buyValue, seatsQty, doorsQty } = mockCar as returnType
  
    expect(mockCar).to.be.an('object');
    expect(model).to.be.equal('Fiat Uno');
    expect(year).to.be.equal(1963);
    expect(color).to.be.equal('blue');
    expect(buyValue).to.be.equal(3500);
    expect(seatsQty).to.be.equal(4);
    expect(doorsQty).to.be.equal(4);
  })
});

describe('testa camada Service carService', () => {
  let carService = new CarService();

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
    const { model, year, color, buyValue, seatsQty, doorsQty } = mockCar as returnType

    expect(model).to.be.equal('honda fit');
    expect(year).to.be.equal(2000);
    expect(color).to.be.equal('blue');
    expect(buyValue).to.be.equal(9500);
    expect(seatsQty).to.be.equal(4);
    expect(doorsQty).to.be.equal(4);
  })
});

describe('testa camada Service carService', () => {
  let carService = new CarService();

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
    const { model, year, color, buyValue, seatsQty, doorsQty } = mockCar as returnType

    expect(model).to.be.equal('honda fit');
    expect(year).to.be.equal(2000);
    expect(color).to.be.equal('blue');
    expect(buyValue).to.be.equal(9500);
    expect(seatsQty).to.be.equal(4);
    expect(doorsQty).to.be.equal(4);
  })
});