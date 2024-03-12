import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teamsMock, teamMock } from './mocks/teams.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matchesMock } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard', () => { 
    it('Retorna status 200 e a classificação geral dos times', async function () {
        // sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any);
        // sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any)
        const httpResponse = await chai.request(app).get('/leaderboard');

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.an('array');
    });
    // afterEach(sinon.restore);
 });

 describe('GET /leaderboard/home', () => { 
    it('Retorna status 200 e a classificação geral dos times que joragam em casa', async function () {
        // sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any);
        // sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any)
        const httpResponse = await chai.request(app).get('/leaderboard/home');

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.an('array');
    });
    // afterEach(sinon.restore);
 });


 describe('GET /leaderboard/away', () => { 
    it('Retorna status 200 e a classificação geral dos times que joragam em casa', async function () {
        // sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any);
        // sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any)
        const httpResponse = await chai.request(app).get('/leaderboard/away');

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.an('array');
    });
    // afterEach(sinon.restore);
 });