import {} from "mocha";
import { agent as request } from "supertest";
import { expect } from "chai";
import Application from "./../src/application";

let application: Application;

describe("User tests", async () => {
    before(async () => {
        application = new Application();
        await application.connect();
        await application.init();
        application.routes();
    });

    after(async () => {
        application.server.close();
    });

    it("Should not get users", async () => {
        const response = await request(application.server).get("/").expect(401);
        expect(response.ok).to.be.false;
    });

    it("Should log in the admin user", async () => {
        const response = await request(application.server)
            .post("/api/user/login")
            .set("Accept", "application/json")
            .send({
                email: "admin@email.com",
                password: "pb_admin",
            })
            .expect(200);

        expect(response.body).to.be.a("object");
    });

    it("Should register a new user", async () => {
        const response = await request(application.server)
            .post("/api/user/create")
            .set("Accept", "application/json")
            .send({
                name: "test",
                email: "test@email.com",
                password: "pb_test",
            })
            .expect("Content-Type", /json/);

        expect(response.body).to.be.a("object");
    });
});
