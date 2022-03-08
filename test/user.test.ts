import {} from "mocha";
import { agent as request } from "supertest";
import { expect } from "chai";
import Application from "./../src/application";

let application: Application;
let Cookies: string = "";
let userCreatedId: string = "";

describe("User tests", async () => {
    before(async () => {
        application = new Application();
        await application.connect();
        await application.init();
        application.routes();
    });

    after(async () => {
        application.server.close();
        request(application.server);
    });

    /**
     * Should not get any user because the cookie hasn't been set
     */
    it("Should not get users", async () => {
        const response = await request(application.server).get("/").expect(401);
        expect(response.ok).to.be.false;
    });

    /**
     *  Should log in with a admin user, this user is created on migration
     */
    it("Should log in the admin", async () => {
        console.log("cookie ", Cookies);
        const response = await request(application.server)
            .post("/api/user/login")
            .set("Accept", "application/json")
            .send({
                email: "admin@email.com",
                password: "pb_admin",
            })
            .expect(200);

        Cookies = response.headers["set-cookie"].pop().split(";")[0];

        expect(response.body).to.be.a("object");
    });

    /**
     *  Get all users and expect to recieve an array
     */
    it("Should get all users", async () => {
        const response = await request(application.server)
            .get("/api/user/")
            .set("Cookie", [Cookies])
            .expect(200);
        expect(response.body).to.be.an("array");
    });

    /**
     *  Should create a new user
     */
    it("Should create a new user", async () => {
        const response = await request(application.server)
            .post("/api/user/create")
            .set("Accept", "application/json")
            .set("Cookie", [Cookies])
            .send({
                name: "test",
                email: "test@email.com",
                password: "pb_test",
            })
            .expect("Content-Type", /json/);

        if (response.body.id) {
            userCreatedId = response.body.id;
        }
        expect(response.body).to.be.a("object");
    });

    /**
     *  Should update the recent created user
     */
    it("Should update a user", async () => {
        if (userCreatedId) {
            const response = await request(application.server)
                .put(`/api/user/${userCreatedId}`)
                .set("Accept", "application/json")
                .set("Cookie", [Cookies])
                .send({
                    name: "_test",
                    email: "_test@email.com",
                    password: "_pb_test",
                })
                .expect(200);

            expect(response.ok).to.be.true;
        }
    });

    /**
     *  Should delete the recent created user
     */
    it("Should delete a user", async () => {
        if (userCreatedId) {
            const response = await request(application.server)
                .delete(`/api/user/${userCreatedId}`)
                .set("Accept", "application/json")
                .set("Cookie", [Cookies])
                .send({
                    name: "_test",
                    email: "_test@email.com",
                    password: "_pb_test",
                })
                .expect(200);

            expect(response.ok).to.be.true;
        }
    });
});
