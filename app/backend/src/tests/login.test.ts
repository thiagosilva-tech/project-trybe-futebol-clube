import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { users, user, invalidEmailLoginBody, invalidPasswordLoginBody,
    validLoginBody, wrongPassUser, userRegistered, userWithoutPassword } from './mocks/login.mock';  
import JWT from '../../src/utils/JWT';
import Validations from '../../src/middlewares/Validations';
import SequelizeUser from '../../src/database/models/SequelizeUser';

chai.use(chaiHttp);

const { expect } = chai;


describe('POST /login', function() {
    afterEach(sinon.restore);
    it('Não deve fazer login com um body vazio', async function() {
      const { status, body } = await chai.request(app).post('/login')
        .send({});
  
      expect(status).to.equal(400);
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('Não deve fazer login com um email invalido', async function() {
      const { status, body } = await chai.request(app).post('/login')
        .send(invalidEmailLoginBody);
  
      expect(status).to.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email' });
    });
  
    it('Não deve fazer login com uma senha invalida', async function() {
      const { status, body } = await chai.request(app).post('/login')
        .send(invalidPasswordLoginBody);
  
      expect(status).to.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
  
    it('Não deve fazer login quando o usuario não é encontrado', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
  
      const { status, body } = await chai.request(app)
        .post('/login')
        .send(validLoginBody);
      expect(status).to.equal(404);
      expect(body).to.be.deep.equal({ message: 'User not found' });
    });
  
    it('Deve retornar um token, quando login estiver pronto', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
      sinon.stub(JWT, 'sign').returns('validToken');
      sinon.stub(Validations, 'validateUser').returns();
  
      const { status, body } = await chai.request(app)
        .post('/login')
        .send(validLoginBody);
  
      expect(status).to.equal(200);
      expect(body).to.have.key('token');
    });
  
    it('Deve retornar mensagem de dados inválidos quando a senha do usuário estiver errada', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(wrongPassUser as any);
      sinon.stub(JWT, 'sign').returns('validToken');
      sinon.stub(Validations, 'validateUser').returns();
  
      const { status, body } = await chai.request(app)
        .post('/login')
        .send(validLoginBody);
  
      expect(status).to.equal(400);
      expect(body.message).to.equal('Invalid email or password');
    });
  });
  