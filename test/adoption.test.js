import * as chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import app from "../app.js";

const { expect } = chai;
chai.use(chaiHttp);

describe("🦴 Adoptions API", () => {
  let adoptionId;

  it("✅ Debería crear una nueva adopción", async () => {
    const res = await request(app)
      .post("/adoptions/67acfbe5832106cf96e87524/ed7ecd8ad7faceb5cdd2feeb")
      .send();

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property(
      "message",
      "✅ Adopción creada exitosamente"
    );
    expect(res.body).to.have.property("adoption");

    adoptionId = res.body.adoption._id
  });

  it("✅ Debería obtener una adopción por ID", async () => {
    chai.expect(adoptionId).to.not.be.undefined;
    const res = await request(app).get(`/adoptions/${adoptionId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id", adoptionId);
    expect(res.body).to.have.property("user");
    expect(res.body).to.have.property("pet");
  });

  it("❌ Debería devolver error para una adopción inexistente", async () => {
    const res = await request(app).get(
      "/adoptions/666666666666666666666666"
    );

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("message", "Adopción no encontrada");
  });
});