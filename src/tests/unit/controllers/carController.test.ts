import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { createCar, createdCar, wrongObjectToCreation, allCars, findOneCar, editedObj } from '../../mocks/mockCar'
import CarController from '../../../controllers/CarController';
import { Car } from '../../../interfaces/CarInterface';
import { RequestWithBody } from '../../../controllers';

chai.use(chaiHttp);

const { expect } = chai;


describe('testa camada Controller CarController', () => {
  const carController = new CarController()
  const request = {} as RequestWithBody<Car>;
  const response = {} as any;
  
  before(async () => {
    request.body = createCar;
  
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(carController.service, 'create')
      .resolves(createdCar)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se a rota está correta /cars', () => {    
    expect(carController.route).to.be.equal('/cars')
  })

  it('teste se o método create do CarController está implementado da maneira correta', async () => {
   await carController.create(request, response);

    expect((response.status).calledWith(201)).to.be.equal(true);
    expect((response.json).calledWith(createdCar)).to.be.equal(true);
  });

});


describe('testa camada Controller CarController', () => {

  const carController = new CarController()
  const request = {} as RequestWithBody<Car>;
  const response = {} as any;

  before(async () => {

    request.body = wrongObjectToCreation;

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
    sinon.stub(carController.service, 'create').resolves()
  });

  it('testa se o método create do CarController retorna erro quando recebe um objeto que não atende às regras de negócio', async () => {
   await carController.create(request, response);

    expect(response.status.calledWith(400)).to.be.equal(true);
    expect((response.json).getCall(0).args[0]).to.have.property('error');
  });

});

describe('testa camada Controller CarController', () => {
  const carController = new CarController()
  const request = {} as RequestWithBody<Car>;
  const response = {} as any;
  
  before(async () => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(carController.service, 'read')
      .resolves(allCars)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método read do CarController está implementado da maneira correta', async () => {
   await carController.read(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
    expect((response.json).calledWith(allCars)).to.be.equal(true);
  });

});

describe('testa camada Controller CarController', () => {
  const carController = new CarController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.params = "4edd40c86762e0fb12000003"
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(carController.service, 'readOne')
      .resolves(findOneCar)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método readOne do CarController está implementado da maneira correta', async () => {
   await carController.readOne(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
    expect((response.json).calledWith(findOneCar)).to.be.equal(true);
  });

});

describe('testa camada Controller CarController', () => {
  const carController = new CarController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.params = ["12000003"]
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método readOne do CarController retorna erro quando não recebe o id valido no params', async () => {
   await carController.readOne(request, response);

    expect(response.status.calledWith(500)).to.be.equal(true);
    expect((response.json).getCall(0).args[0]).to.have.property('error');
  });
});

describe('testa camada Controller CarController', () => {
  const carController = new CarController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.body = editedObj;
    
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(carController.service, 'update')
      .resolves(editedObj)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método update do CarController está implementado da maneira correta', async () => {
   await carController.update(request, response);

   expect((response.status).calledWith(201)).to.be.equal(true);
   expect((response.json).calledWith(editedObj)).to.be.equal(true);
  });
});


describe('testa camada Controller CarController', () => {
  const carController = new CarController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.body = wrongObjectToCreation;
    
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método update do CarController retorna erro, caso o body seja invalido', async () => {
   await carController.update(request, response);

   expect((response.status).calledWith(500)).to.be.equal(true);
   expect((response.json).getCall(0).args[0]).to.have.property('error');
  });
});


describe('testa camada Controller CarController', () => {
  const carController = new CarController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.body = editedObj;

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
    .stub(carController.service, 'update')
    .resolves(null)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método update do CarController retorna erro, caso o body seja invalido', async () => {
   await carController.update(request, response);

   expect((response.status).calledWith(404)).to.be.equal(true);
   expect((response.json).getCall(0).args[0]).to.have.property('error');
  });
});

describe('testa camada Controller CarController', () => {
  const carController = new CarController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.params = "4edd40c86762e0fb12000003"
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(carController.service, 'delete')
      .resolves(findOneCar)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método delete do CarController está implementado da maneira correta', async () => {
   await carController.delete(request, response);

    expect(response.status.calledWith(201)).to.be.equal(true);
    expect((response.json).calledWith(findOneCar)).to.be.equal(true);
  });
});

describe('testa camada Controller CarController', () => {
  const carController = new CarController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.params = [12000003]
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método delete do CarController retorna erro caso o id seja passado de maneira incorreta', async () => {
   await carController.delete(request, response);

   expect((response.status).calledWith(500)).to.be.equal(true);
   expect((response.json).getCall(0).args[0]).to.have.property('error');
  });

});

