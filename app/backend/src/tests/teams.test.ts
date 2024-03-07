import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import {teamsMock, teamMock} from './mocks/teams.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => { 
    it('Retorna status 200 e um array de teams', async function () {
        sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any);
        const httpResponse = await chai.request(app).get('/teams');

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.deep.equal(teamsMock);
    });
    afterEach(sinon.restore);
 })

 describe('GET /teams/:id', () => {
    it('Retorna status 200 e um objeto team', async function () {
        sinon.stub(SequelizeTeam, 'findByPk').resolves(teamMock as any);
        
        const httpResponse = await chai.request(app).get('/teams/1');

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.deep.equal(teamMock);
    });

    it('Retorna status 404', async function () {
        sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
        const httpResponse = await chai.request(app).get('/teams/1');
        
        expect(httpResponse.status).to.be.equal(404);
        expect(httpResponse.body).to.be.deep.equal({message: 'Team 1 not found'})
    });
    afterEach(sinon.restore);
 });