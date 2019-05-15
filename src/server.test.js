const expect = require("expect");
const request = require("supertest");

const { app } = require("./server");
const { mongoose } = require("../db/test-db");
const { todoModel } = require("../db/todo");

describe("POST/todo", () => {
  it("Should create new object", done => {
    let text = "testing post api";
    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) return done(err);
        todoModel
          .findOneAndDelete({ text })
          .then(
            todo => {
              console.log("test api deleted successfully");
              done();
            },
            err => {
              console.log("error while deleting test api");
            }
          )
          .catch(e => done(e));
      });
  });
});
