import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { createMoto, createdMoto, allMotos, findOneMoto, editedObj } from '../../mocks/mockmotorcycle'
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import { Document } from 'mongoose';

type returnType = Motorcycle & Document<any, any, any> & { _id: any; }

describe('testa camada Model MotorcycleModel', () => {
  let motorcycleModel = new MotorcycleModel();

  before(() => {
    sinon
      .stub(motorcycleModel.model, 'create')
      .resolves(createdMoto as returnType);
    sinon
      .stub(motorcycleModel.model, 'find')
      .resolves(allMotos as returnType[]);
    sinon
      .stub(motorcycleModel.model, 'findOne')
      .resolves(findOneMoto as returnType);
  });

  after(() => {
    (motorcycleModel.model.create as sinon.SinonStub).restore();
    (motorcycleModel.model.find as sinon.SinonStub).restore();
    (motorcycleModel.model.findOne as sinon.SinonStub).restore();
  })

  it('teste se o método create do MotorcycleModel está implementado da maneira correta', async () => {
    const returnCreateMoto = await motorcycleModel.create(createMoto as Motorcycle);

    expect(returnCreateMoto).to.be.an('object');
    expect(returnCreateMoto.model).to.be.equal(createdMoto.model);
    expect(returnCreateMoto.year).to.be.equal(createdMoto.year);
    expect(returnCreateMoto.color).to.be.equal(createdMoto.color);
    expect(returnCreateMoto.buyValue).to.be.equal(createdMoto.buyValue);
  });

  it('testa se o método read do MotorcycleModel está implementado da maneira correta', async () => {
    const returnReadMoto = await motorcycleModel.read();

    expect(returnReadMoto).to.have.lengthOf(2);
    expect(returnReadMoto[0].model).to.be.equal('Honda CG Titan 125')
    expect(returnReadMoto[1].model).to.be.equal('Kawasaki Ninja')
    expect(returnReadMoto[0].color).to.be.equal('red')
    expect(returnReadMoto[1].color).to.be.equal('green')
  })

  it('testa se o método findOne do MotorcycleModel está implementado da maneira correta', async () => {
    const returnReadeOneMoto = await motorcycleModel.readOne('4edd40c86762e0fb12000003');
    const { model, year, color, buyValue } = returnReadeOneMoto as returnType

    expect(returnReadeOneMoto).to.be.an('object');
    expect(model).to.be.equal('Honda CG Titan 125');
    expect(year).to.be.equal(1963);
    expect(color).to.be.equal('red');
    expect(buyValue).to.be.equal(3500);
  })

});

describe('testa camada Model MotorcycleModel', () => {
  let motorcycleModel = new MotorcycleModel();

  before(() => {
    sinon
      .stub(motorcycleModel.model, 'findOne')
      .resolves(editedObj as returnType);
    sinon
      .stub(motorcycleModel.model, 'updateOne');
  });

  after(() => {
    (motorcycleModel.model.findOne as sinon.SinonStub).restore();
    (motorcycleModel.model.updateOne as sinon.SinonStub).restore();
  })

  it('testa se o método update do MotorcycleModel está implementado da maneira correta', async () => {
    const returnUpdateMoto = await motorcycleModel.update('4edd40c86762e0fb12000003', editedObj as Motorcycle);
    const { model, year, color, buyValue } = returnUpdateMoto as returnType

    expect(returnUpdateMoto).to.be.an('object');
    expect(model).to.be.equal('Honda CG Titan 125');
    expect(year).to.be.equal(1963);
    expect(color).to.be.equal('red');
    expect(buyValue).to.be.equal(3500);
  })
});

describe('testa camada Model MotorcycleModel', () => {
  let motorcycleModel = new MotorcycleModel();

  before(() => {
    sinon
      .stub(motorcycleModel.model, 'findOne')
      .resolves(editedObj as returnType);
    sinon
      .stub(motorcycleModel.model, 'findOneAndDelete');

  });

  after(() => {
    (motorcycleModel.model.findOne as sinon.SinonStub).restore();
    (motorcycleModel.model.findOneAndDelete as sinon.SinonStub).restore();
  })

  it('testa se o método delete do MotorcycleModel está implementado da maneira correta', async () => {
    const mockCar = await motorcycleModel.delete('4edd40c86762e0fb12000003');
    const { model, year, color, buyValue } = mockCar as returnType

    expect(mockCar).to.be.an('object');
    expect(model).to.be.equal('Honda CG Titan 125');
    expect(year).to.be.equal(1963);
    expect(color).to.be.equal('red');
    expect(buyValue).to.be.equal(3500);
  })
});
