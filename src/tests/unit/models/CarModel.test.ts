import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { createCar, createdCar } from '../../mocks/mockCar'

describe('Rota /cars', () => {
  let carModel = new CarModel();

  before(() => {
    sinon
      .stub(carModel.model, 'create')
      .resolves(createdCar);
  });

  after(() => {
    (carModel.model.create as sinon.SinonStub).restore();
  })

  it('Testa se é possível fazer o login com dados corretos e que após o acesso será redirecionado para a tela de jogos', async () => {
    const mockCar = await carModel.create(createCar)

    expect(mockCar).to.be.an('object');
    expect(mockCar.model).to.be.equal(createdCar.model);
    expect(mockCar.year).to.be.equal(createdCar.year);
    expect(mockCar.color).to.be.equal(createdCar.color);
    expect(mockCar.buyValue).to.be.equal(createdCar.buyValue);
    expect(mockCar.seatsQty).to.be.equal(createdCar.seatsQty);
    expect(mockCar.doorsQty).to.be.equal(createdCar.doorsQty);
  });

});

