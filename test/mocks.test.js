import request from "supertest"
import mongoose from "mongoose";
import dotenv from "dotenv";
import { expect } from "chai";
import app from "../app.js";
import User from "../src/data/mongo/models/user.model.js";
import Pet from "../src/data/mongo/models/pet.model.js";

dotenv.config();

describe("Testing de la API Mock", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe("GET /mockingusers", () => {
    it("Debe devolver una lista de 50 usuarios generados", async () => {
      const res = await request(app).get("/mockingusers");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.lengthOf(50);
    });
  });

  describe("POST /generateData", () => {
    it("Debe generar datos de usuarios y mascotas correctamente", async () => {
      const res = await request(app).post("/generateData").send({
        users: 5,
        pets: 3,
      });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property("generatedUsers").that.equals(5);
      expect(res.body).to.have.property("generatedPets").that.equals(3);
    });

    it("Debe devolver error si los parámetros son inválidos", async () => {
      const res = await request(app).post("/generateData").send({
        users: "cinco",
        pets: -2,
      });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("error");
    });
  });

  describe("GET /users", () => {
    before(async () => {
      await User.create([
        { name: "Juan", email: "juan@example.com", password: "123456" },
        { name: "Martina", email: "martina@example.com", password: "abcdef" }
      ]);
    });

    it("Debe obtener la lista de usuarios en la base de datos", async () => {
      const res = await request(app).get("/users");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  describe("GET /pets", () => {
    before(async () => {
      await Pet.create([
        { name: "Firulais", age: 3, species: "dog" },
        { name: "Copito", age: 2, species: "cat" }
      ]);
    });

    it("Debe obtener la lista de mascotas en la base de datos", async () => {
      const res = await request(app).get("/pets");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.be.greaterThan(0);
    });
  });
});