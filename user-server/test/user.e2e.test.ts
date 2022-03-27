import application from '../src/application';
import supertest from "supertest";

process.env.PORT = '5000';

describe("", () => {
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    const app = await application();

    request = supertest(app);
  })

  it("회원 가입이 되어야 합니다.", async () => {
    await request
      .post('/api/users')
      .send({ userId: 'test', password: 'test' })
      .expect(200);
  });
});
