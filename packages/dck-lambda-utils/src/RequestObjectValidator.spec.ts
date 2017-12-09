import { RequestObjectValidator } from "./";

const emptyValidator = new RequestObjectValidator();
const validator = new RequestObjectValidator(["email", "team_id", "first_name", "last_name"], ["email", "team_id"]);

describe("RequestObjectValidator", () => {
    it("should allow any object if no fields are configured", (done) => {
        emptyValidator.validateRequest({a: 1, b: 2, c: 3}, (err, result) => {
            expect(err).toBe(null);
            done();
        });
    });

    it("should allow correct objects", (done) => {
        validator.validateRequest({
            email: "contact@agilevision.io",
            team_id: "OurCustomer",
            first_name: "Test",
            last_name: "User",
        }, (err, result) => {
            expect(err).toBe(null);
            done();
        });
    });

    it("should decline objects with missing required fields", (done) => {
        validator.validateRequest({
            team_id: "OurCustomer",
            first_name: "Test",
            last_name: "User",
        }, (err, result) => {
            expect(err).toBeInstanceOf(Error);
            done();
        });
    });
    it("should allow  objects with missing non-required fields", (done) => {
        validator.validateRequest({
            team_id: "OurCustomer",
            email: "contact@agilevision.io",
        }, (err, result) => {
            expect(err).toBe(null);
            done();
        });
    });

    it("should forbid empty  objects with non-empty validator", (done) => {
        validator.validateRequest({
        }, (err, result) => {
            expect(err).toBeInstanceOf(Error);
            done();
        });
    });

    it("should forbid null objects with non-empty validator", (done) => {
        validator.validateRequest(null, (err, result) => {
            expect(err).toBeInstanceOf(Error);
            done();
        });
    });

    it("should forbid null objects with empty validator", (done) => {
        emptyValidator.validateRequest(null, (err, result) => {
            expect(err).toBeInstanceOf(Error);
            done();
        });
    });

    it("should allow empty object if no fields are configured", (done) => {
        emptyValidator.validateRequest({}, (err, result) => {
            expect(err).toBe(null);
            done();
        });
    });
});
