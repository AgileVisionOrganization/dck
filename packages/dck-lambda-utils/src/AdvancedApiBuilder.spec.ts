import { AdvancedApiBuilder, SecurityEnforcer, HttpResponseBuilder } from "./";

const enforcer = new SecurityEnforcer("custom:team_id", "cognito:groups");
const httpResponseBuilder = new HttpResponseBuilder({});
const apiBuilder = new AdvancedApiBuilder(enforcer, httpResponseBuilder);

describe("AdvancedApiBuilder", () => {
  it("should allow request if the user has enough permissions", (done) => {
    const eventTemplate = {
      requestContext: {
        authorizer: {
          claims: {
            "cognito:groups": ["demo-admin"],
          },
        },
      },
    };

    const api = apiBuilder.ApiAction(["demo-admin"], false, (event, context: any, callback) => {
      callback(null, { ok: true });
    });

    api(eventTemplate, null, (err: Error, data: any) => {
      expect(err).toBe(null);
      expect(data).not.toBe(null);
      expect(data).toHaveProperty("statusCode", 200);
      done();
    });
  });

  it("should forbid request if the user doesn't have enough permissions", (done) => {
    const eventTemplate = {
      requestContext: {
        authorizer: {
          claims: {
            "cognito:groups": ["demo-user"],
          },
        },
      },
    };

    const api = apiBuilder.ApiAction(["demo-admin"], false, (event, context: any, callback) => {
      callback(null, { ok: true });
    });

    api(eventTemplate, null, (err: Error, data: any) => {
      expect(err).toBe(null);
      expect(data).not.toBe(null);
      expect(data.statusCode).toBe(401);
      done();
    });
  });

  it("should produce bad request if the user doesn't have enough permissions", (done) => {
    const eventTemplate = {
      requestContext: {
        authorizer: {
          claims: {
            "cognito:groups": ["demo-admin"],
          },
        },
      },
    };

    const api = apiBuilder.ApiAction(["demo-admin"], false, (event, context: any, callback) => {
      throw new Error("Mock error");
    });

    api(eventTemplate, null, (err: Error, data: any) => {
      expect(err).toBe(null);
      expect(data).not.toBe(null);
      expect(data.statusCode).toBe(400);
      done();
    });
  });

  it("should return custom error message", (done) => {
    const eventTemplate = {
      requestContext: {
        authorizer: {
          claims: {
            "cognito:groups": ["demo-admin"],
          },
        },
      },
    };

    const api = apiBuilder.ApiAction(["demo-admin"], false, (event, context: any, callback) => {
      callback(Error("Test message"), {});
    });

    api(eventTemplate, null, (err: Error, data: any) => {
      console.log("err=", err);
      console.log("data=", data);
      expect(err).toBeTruthy();
      expect(data).toBeTruthy();
      expect(data).toHaveProperty("statusCode", 200);
      done();
    });
  });
});
