import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { createMoto, createdMoto, allMotos, findOneMoto, editedObj, wrongObjectToCreation } from '../../mocks/mockmotorcycle'
import MotorcycleController from '../../../controllers/MotorcycleController';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import { RequestWithBody } from '../../../controllers';
import StatusCode from '../../..//interfaces/StatusCode';

chai.use(chaiHttp);

const { expect } = chai;
const {
OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCode;



describe('testa camada Controller MotorcycleController', () => {
  const motorcycleController = new MotorcycleController()
  const request = {} as RequestWithBody<Motorcycle>;
  const response = {} as any;
  
  before(async () => {
    request.body = createMoto as Motorcycle;
  
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(motorcycleController.service, 'create')
      .resolves(createdMoto as Motorcycle)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se a rota está correta /motorcycles', () => {    
    expect(motorcycleController.route).to.be.equal('/motorcycles')
  })

  it('teste se o método create do MotorcycleController está implementado da maneira correta', async () => {
   await motorcycleController.create(request, response);

    expect((response.status).calledWith(CREATED)).to.be.equal(true);
    expect((response.json).calledWith(createdMoto)).to.be.equal(true);
  });

});


describe('testa camada Controller MotorcycleController', () => {

  const motorcycleController = new MotorcycleController()
  const request = {} as RequestWithBody<Motorcycle>;
  const response = {} as any;

  before(async () => {

    request.body = wrongObjectToCreation as Motorcycle;

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
    sinon.stub(motorcycleController.service, 'create').resolves()
  });

  it('testa se o método create do MotorcycleController retorna erro quando recebe um objeto que não atende às regras de negócio', async () => {
   await motorcycleController.create(request, response);

    expect(response.status.calledWith(BAD_REQUEST)).to.be.equal(true);
    expect((response.json).getCall(0).args[0]).to.have.property('error');
  });

});

describe('testa camada Controller MotorcycleController', () => {
  const motorcycleController = new MotorcycleController()
  const request = {} as RequestWithBody<Motorcycle>;
  const response = {} as any;
  
  before(async () => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(motorcycleController.service, 'read')
      .resolves(allMotos as Motorcycle[])
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método read do MotorcycleController está implementado da maneira correta', async () => {
   await motorcycleController.read(request, response);

    expect(response.status.calledWith(OK)).to.be.equal(true);
    expect((response.json).calledWith(allMotos)).to.be.equal(true);
  });

});

describe('testa camada Controller MotorcycleController', () => {
  const motorcycleController = new MotorcycleController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.params = "4edd40c86762e0fb12000003"
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(motorcycleController.service, 'readOne')
      .resolves(findOneMoto as Motorcycle)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método readOne do MotorcycleController está implementado da maneira correta', async () => {
   await motorcycleController.readOne(request, response);

    expect(response.status.calledWith(OK)).to.be.equal(true);
    expect((response.json).calledWith(findOneMoto)).to.be.equal(true);
  });

});

// describe('testa camada Controller MotorcycleController', () => {
//   const motorcycleController = new MotorcycleController()
//   const request = {} as any;
//   const response = {} as any;
  
//   before(async () => {
//     request.params = ["12000003"]
//     response.status = sinon.stub().returns(response);
//     response.json = sinon.stub();
//   });

//   after(()=>{
//     sinon.restore();
//   })

//   it('testa se o método readOne do MotorcycleController retorna erro quando não recebe o id valido no params', async () => {
//    await motorcycleController.readOne(request, response);

//     expect(response.status.calledWith(BAD_REQUEST)).to.be.equal(true);
//     expect((response.json).getCall(0).args[0]).to.have.property('error');
//   });
// });

describe('testa camada Controller MotorcycleController', () => {
  const motorcycleController = new MotorcycleController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.body = editedObj as Motorcycle;
    request.params = "4edd40c86762e0fb12000003"
    
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(motorcycleController.service, 'update')
      .resolves(editedObj as Motorcycle)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método update do MotorcycleController está implementado da maneira correta', async () => {
   await motorcycleController.update(request, response);

   expect((response.status).calledWith(OK)).to.be.equal(true);
   expect((response.json).calledWith(editedObj)).to.be.equal(true);
  });
});


// describe('testa camada Controller MotorcycleController', () => {
//   const motorcycleController = new MotorcycleController()
//   const request = {} as any;
//   const response = {} as any;
  
//   before(async () => {
//     request.body = wrongObjectToCreation as Motorcycle;
//     request.params = "4edd40c86762e0fb12000003"
    
//     response.status = sinon.stub().returns(response);
//     response.json = sinon.stub();
//   });

//   after(()=>{
//     sinon.restore();
//   })

//   it('testa se o método update do MotorcycleController retorna erro, caso o body seja invalido', async () => {
//    await motorcycleController.update(request, response);

//    expect((response.status).calledWith(BAD_REQUEST)).to.be.equal(true);
//    expect((response.json).getCall(0).args[0]).to.have.property('error');
//   });
// });


describe('testa camada Controller MotorcycleController', () => {
  const motorcycleController = new MotorcycleController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.body = {};
    request.params = "4edd40c86762e0fb12000003"

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
    .stub(motorcycleController.service, 'update')
    .resolves(null)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método update do MotorcycleController retorna erro, caso o body seja invalido', async () => {
   await motorcycleController.update(request, response);

   expect((response.status).calledWith(NOT_FOUND)).to.be.equal(true);
   expect((response.json).getCall(0).args[0]).to.have.property('error');
  });
});

describe('testa camada Controller MotorcycleController', () => {
  const motorcycleController = new MotorcycleController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.params = "4edd40c86762e0fb12000003"
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(motorcycleController.service, 'delete')
      .resolves(findOneMoto as Motorcycle)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método delete do MotorcycleController está implementado da maneira correta', async () => {
   await motorcycleController.delete(request, response);

    expect(response.status.calledWith(NO_CONTENT)).to.be.equal(true);
    expect((response.json).calledWith(findOneMoto)).to.be.equal(true);
  });
});

// describe('testa camada Controller MotorcycleController', () => {
//   const motorcycleController = new MotorcycleController()
//   const request = {} as any;
//   const response = {} as any;
  
//   before(async () => {
//     request.params = [12000003]
//     response.status = sinon.stub().returns(response);
//     response.json = sinon.stub();
//   });

//   after(()=>{
//     sinon.restore();
//   })

//   it('testa se o método delete do MotorcycleController retorna erro caso o id seja passado de maneira incorreta', async () => {
//    await motorcycleController.delete(request, response);

//    expect((response.status).calledWith(INTERNAL_SERVER_ERROR)).to.be.equal(true);
//    expect((response.json).getCall(0).args[0]).to.have.property('error');
//   });

// });

