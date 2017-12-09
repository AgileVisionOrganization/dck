import {SecurityEnforcer} from "./";

const enforcer = new SecurityEnforcer("custom:team_id", "cognito:groups");

describe("Security Enforcer", () => {
    it("should allow request if the user has enough permissions", (done) => {
        enforcer.allowOnly({
            requestContext: {
                authorizer: {
                    claims: {
                        "cognito:groups": ["demo-admin"],
                    },
                },
            },
        }, ["demo-admin"], (err, data) => {
            expect(err).toBe(null);
            done();
        });
    });

    it("should not allow request if the user has enough permissions", (done) => {
        enforcer.allowOnly({
            requestContext: {
                authorizer: {
                    claims: {
                        "cognito:groups": ["demo-user"],
                    },
                },
            },
        }, ["demo-admin"], (err, data) => {
            expect(err).toBeDefined();
            expect(err).not.toBe(null);
            done();
        });
    });
});
