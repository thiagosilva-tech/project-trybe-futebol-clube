import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app'; 
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matchMock, matchesInProgress, matchesMock, matchesNotInProgress, newMatchMock } from './mocks/match.mock';
import Validations from '../middlewares/Validations';
import { Response, Request, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

const tokenValido = JWT.sign({email:'teste@teste.com'})

describe('/matches', () => {
    
    describe('Metodo GET', () => {
        afterEach(sinon.restore);
    
        it('Testa se retorna todos os partidas e um status 200', async () => {
            sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any);
    
            const response = await chai.request(app).get('/matches');
    
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.deep.equal(matchesMock);
        });
    
        it('Testa se retorna só as partidas em andamente e um status 200', async () => {
            sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);
    
            const response = await chai.request(app).get('/matches?inProgress=true');
    
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.deep.equal(matchesInProgress);
        });
    
        it('Testa se retorna só as partidas finalizadas e um status 200', async () => {
            sinon.stub(SequelizeMatch, 'findAll').resolves(matchesNotInProgress as any);
    
            const response = await chai.request(app).get('/matches?inProgress=false');
    
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.deep.equal(matchesNotInProgress);
        });
    })

    describe('Metodo PATCH', () => {
        afterEach(sinon.restore);
    
        it('Testa se retorna uma partida finalizada e um status 200', async () => {
            const matchId = '41';
            const response = await chai.request(app).patch(`/matches/${matchId}/finish`).set({authorization: tokenValido});

            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.deep.equal({ message: 'Finished' });
        });

        it('Testa que não é possivel alterar uma partida sem um token', async () => {
            const matchId = 'XX';
            const response = await chai.request(app).patch(`/matches/${matchId}/finish`);

            expect(response.status).to.be.equal(401);
            expect(response.body).to.be.deep.equal({ message: 'Token not found' });
        })
    });

    describe('Metodo POST', () => {
        afterEach(sinon.restore);

        it('Testa se retorna uma nova partida e um status 201', async () => {
            // const token = 'fakeToken';
            // const req: Partial<Request> = {
            //     body: newMatchMock,
            //     headers: {
            //         authorization: token
            //     }
            // };
            // const next = sinon.stub();
            // const res: Partial<Response> = {
            //     status: sinon.stub().returnsThis(),
            //     json: sinon.stub()
            // };
          
            // sinon.stub(Validations, 'validateToken'); 
            
            // await Validations.validateToken(req as Request, res as Response, next as NextFunction);

            sinon.stub(SequelizeMatch, 'create').resolves(matchMock as any);
          
            const response = await chai.request(app).post('/matches').set({authorization: tokenValido}).send(newMatchMock);
          
            expect(response.status).to.be.equal(201);
            expect(response.body).to.be.deep.equal(matchMock);
        });

        it('Testa que não é possivel criar uma partida sem um token', async () => {
            const response = await chai.request(app).post('/matches').send(newMatchMock);

            expect(response.status).to.be.equal(401);
            expect(response.body).to.be.deep.equal({ message: 'Token not found' });
        });

        it('Testa que não é possivel criar uma partida com um token invalido', async () => {
            const response = await chai.request(app).post('/matches').set({authorization: 'invalidToken'}).send({});

            expect(response.status).to.be.equal(401);
            expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
        });

        it('Testa que não pode criar uma partida com times iguais', async () => {
            const match = {
                homeTeamId: '1',
                awayTeamId: '1',
                homeTeamGoals: '2',
                awayTeamGoals: '2',
            };
            sinon.stub(SequelizeMatch, 'create').resolves({ message: 'It is not possible to create a match with two equal teams' } as any);
            const response = await chai.request(app).post('/matches').set({authorization: tokenValido}).send(match);
            expect(response.status).to.be.equal(422);
            expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
        });

        it('Testa que não pode criar uma partida com times que não existam', async () => {
            const match = {
                homeTeamId: '99',
                awayTeamId: '1',
                homeTeamGoals: '2',
                awayTeamGoals: '2',
            };
            sinon.stub(SequelizeMatch, 'create').resolves({ message: 'There is no team with such id!' } as any);
            const response = await chai.request(app).post('/matches').set({authorization: tokenValido}).send(match);
            expect(response.status).to.be.equal(404);
            expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
        });
    });

})