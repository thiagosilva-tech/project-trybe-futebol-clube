import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

chai.use(chaiHttp);

const { expect } = chai;

describe("Seu teste", () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  describe("GET /teams", () => {
    it("Retorna status 200 e um array de teams", async function () {
      const httpResponse = await chai.request(app).get("/teams");

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.an("array");
    });
  });

  describe("GET /teams/:id", () => {
    it("Retorna status 200 e um objeto team", async function () {
      const httpResponse = await chai.request(app).get("/teams/1");

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.an("object");
    });
  });
});
