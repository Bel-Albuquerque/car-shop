import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleService from '../../../services/MotorcycleService';
import { createMoto, createdMoto, allMotos, findOneMoto, editedObj, wrongObjectToCreation } from '../../mocks/mockmotorcycle'
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import { Document } from 'mongoose';

type returnType = Motorcycle & Document<any, any, any> & { _id: any; }

describe('testa camada Service motorcycleService', () => {
  let motorcycleService = new MotorcycleService();

  before(() => {
    sinon
      .stub(motorcycleService.model, 'create')
      .resolves(createdMoto as Motorcycle);
  });

  after(() => {
    (motorcycleService.model.create as sinon.SinonStub).restore();
  })

  it('teste se o método create do MotorcycleService está implementado da maneira correta', async () => {
    const returnCreateMoto = await motorcycleService.create(createMoto as Motorcycle);
    const { model, year, color, buyValue } = returnCreateMoto as returnType

    expect(returnCreateMoto).to.be.an('object');
    expect(model).to.be.equal(createdMoto.model);
    expect(year).to.be.equal(createdMoto.year);
    expect(color).to.be.equal(createdMoto.color);
    expect(buyValue).to.be.equal(createdMoto.buyValue);
  });

  it('testa se o método create do MotorcycleService retorna erro quando recebe um objeto que não atende às regras de negócio', async () => {
    const returnErrorCreateMoto = await motorcycleService.create(wrongObjectToCreation as Motorcycle);
    
    expect(returnErrorCreateMoto).to.be.an('object');
    expect(returnErrorCreateMoto).to.have.property('error')
  });
});

describe('testa camada Service motorcycleService', () => {
  let motorcycleService = new MotorcycleService();

  before(() => {
    sinon
      .stub(motorcycleService.model, 'read')
      .resolves(allMotos as returnType[]);
  });

  after(() => {
    (motorcycleService.model.read as sinon.SinonStub).restore();
  })

  it('testa se o método read do MotorcycleService está implementado da maneira correta', async () => {
    const returnReadMoto = await motorcycleService.read();

    expect(returnReadMoto).to.have.lengthOf(2);
    expect(returnReadMoto[0].model).to.be.equal('Honda CG Titan 125')
    expect(returnReadMoto[1].model).to.be.equal('Kawasaki Ninja')
    expect(returnReadMoto[0].color).to.be.equal('red')
    expect(returnReadMoto[1].color).to.be.equal('green')
  })

});


describe('testa camada Service motorcycleService', () => {
  let motorcycleService = new MotorcycleService();

  before(() => {
    sinon
      .stub(motorcycleService.model, 'readOne')
      .resolves(findOneMoto as returnType);
  });

  after(() => {
    (motorcycleService.model.readOne as sinon.SinonStub).restore();
  })

  it('testa se o método findOne do MotorcycleService está implementado da maneira correta', async () => {
    const returnReadOneMoto = await motorcycleService.readOne('4edd40c86762e0fb12000003');
    const { model, year, color, buyValue } = returnReadOneMoto as returnType
  
    expect(returnReadOneMoto).to.be.an('object');
    expect(model).to.be.equal('Honda CG Titan 125');
    expect(year).to.be.equal(1963);
    expect(color).to.be.equal('red');
    expect(buyValue).to.be.equal(3500);
  })
});

describe('testa camada Service motorcycleService', () => {
  let motorcycleService = new MotorcycleService();

  before(() => {
    sinon
      .stub(motorcycleService.model, 'update')
      .resolves(editedObj as returnType);
  });

  after(() => {
    (motorcycleService.model.update as sinon.SinonStub).restore();
  })

  it('testa se o método update do MotorcycleService está implementado da maneira correta', async () => {
    const returnUpdateMoto = await motorcycleService.update('4edd40c86762e0fb12000003', editedObj as Motorcycle);

    expect(returnUpdateMoto).to.be.an('object');
    const { model, year, color, buyValue } = returnUpdateMoto as returnType

    expect(model).to.be.equal('Honda CG Titan 125');
    expect(year).to.be.equal(1963);
    expect(color).to.be.equal('red');
    expect(buyValue).to.be.equal(3500);
  })
});

describe('testa camada Service motorcycleService', () => {
  let motorcycleService = new MotorcycleService();

  before(() => {
    sinon
      .stub(motorcycleService.model, 'delete')
      .resolves(editedObj as returnType);
  });

  after(() => {
    (motorcycleService.model.delete as sinon.SinonStub).restore();
  })

  it('testa se o método delete do MotorcycleService está implementado da maneira correta', async () => {
    const returnDeleteMoto = await motorcycleService.delete('4edd40c86762e0fb12000003');

    expect(returnDeleteMoto).to.be.an('object');
    const { model, year, color, buyValue } = returnDeleteMoto as returnType

    expect(model).to.be.equal('Honda CG Titan 125');
    expect(year).to.be.equal(1963);
    expect(color).to.be.equal('red');
    expect(buyValue).to.be.equal(3500);
  })
});
