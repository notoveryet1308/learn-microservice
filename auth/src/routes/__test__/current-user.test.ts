import request from "supertest";
import { app } from "../../app";

it("respondes with details about the current user", async () => {
  const signupRes = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test45@test.com",
      password: "password",
    })
    .expect(201);
  const cookie = signupRes.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test45@test.com");
});
