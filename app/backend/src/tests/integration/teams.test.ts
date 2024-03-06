import chaiHttp from "chai-http";
import chai, {expect} from "chai";
import { app } from '../../app';

chai.use(chaiHttp);

describe('GET /teams', () => { 
    it('Retorna status 200 e um array de teams', async function () {
        const httpResponse = (await chai.request(app).get('/teams'));

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.an('array');
    } 
    )
 })

 describe('GET /teams/:id', () => {
    it('Retorna status 200 e um objeto team', async function () {
        const httpResponse = (await chai.request(app).get('/teams/1'));

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.an('object');
    }
    )
 });