import chaiHttp from "chai-http";
import chai, {expect} from "chai";
import sinon from "sinon";
import {teamMock, teamsMock} from "../mocks/teams.mock";
import { app } from '../../app';
import SequelizeTeam from "../../database/models/SequelizeTeam";

chai.use(chaiHttp);

describe('GET /teams', () => { 
    it('Retorna status 200 e um array de teams', async function () {
        sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any);
        const httpResponse = (await chai.request(app).get('/teams'));

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.deep.equal(teamsMock);
    } 
    )
 })

 describe('GET /teams/:id', () => {
    it('Retorna status 200 e um objeto team', async function () {
        sinon.stub(SequelizeTeam, 'findOne').resolves(teamMock as any);
        
        const httpResponse = (await chai.request(app).get('/teams/1'));

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.equal(teamMock);
    }
    )

    it('Retorna status 404', async function () {
        sinon.stub(SequelizeTeam, 'findOne').resolves(null);
        const httpResponse = (await chai.request(app).get('/teams/1'));
        
        expect(httpResponse.status).to.be.equal(404);
        expect(httpResponse.body).to.be.deep.equal({message: 'Team not found'})
    })
 });