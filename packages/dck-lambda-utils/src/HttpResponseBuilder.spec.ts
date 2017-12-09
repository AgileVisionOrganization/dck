import {HttpResponseBuilder} from "./";

const responseBuilder = new HttpResponseBuilder({"Access-Control-Origin": "*"});

describe("HttpResponseBuilder", () => {
    it("should correctly populate headers", (done) => {
        responseBuilder.OperationSucess(200, "OK", null, (err, data: any) => {
            expect(err).toBe(null);
            expect(data).toBeDefined();
            expect(data).toHaveProperty("statusCode", 200);
            expect(data).toHaveProperty("headers");
            expect(data.headers).toHaveProperty("Access-Control-Origin", "*");
            expect(data).toHaveProperty("body");
            expect(data.body).toBeDefined();

            const parsedBody: any = JSON.parse(data.body);
            expect(parsedBody).toHaveProperty("statusCode", 200);
            expect(parsedBody).toHaveProperty("message", "OK");
            expect(parsedBody).not.toHaveProperty("data");
            done();
        });
    });
    it("should correctly return successful response", (done) => {
        responseBuilder.OperationSucess(200, "OK", {test: "test1"}, (err, data: any) => {
            expect(err).toBe(null);
            expect(data).toBeDefined();
            expect(data).toHaveProperty("statusCode", 200);
            expect(data).toHaveProperty("headers");
            expect(data.headers).toHaveProperty("Access-Control-Origin", "*");
            expect(data).toHaveProperty("body");
            expect(data.body).toBeDefined();

            const parsedBody: any = JSON.parse(data.body);
            expect(parsedBody).toHaveProperty("statusCode", 200);
            expect(parsedBody).toHaveProperty("message", "OK");
            expect(parsedBody).toHaveProperty("data", {test: "test1"});
            done();
        });
    });

    it("should correctly return a not found response", (done) => {
        responseBuilder.NotFound("Not Found", (err, data: any) => {
            expect(err).toBe(null);
            expect(data).toBeDefined();
            expect(data).toHaveProperty("statusCode", 404);
            expect(data).toHaveProperty("headers");
            expect(data.headers).toHaveProperty("Access-Control-Origin", "*");
            expect(data).toHaveProperty("body");
            expect(data.body).toBeDefined();

            const parsedBody: any = JSON.parse(data.body);
            expect(parsedBody).toHaveProperty("statusCode", 404);
            expect(parsedBody).toHaveProperty("message", "Not Found");
            done();
        });
    });
    it("should correctly return a bad request response", (done) => {
        responseBuilder.BadRequest("Bad Request", (err, data: any) => {
            expect(err).toBe(null);
            expect(data).toBeDefined();
            expect(data).toHaveProperty("statusCode", 400);
            expect(data).toHaveProperty("headers");
            expect(data.headers).toHaveProperty("Access-Control-Origin", "*");
            expect(data).toHaveProperty("body");
            expect(data.body).toBeDefined();

            const parsedBody: any = JSON.parse(data.body);
            expect(parsedBody).toHaveProperty("statusCode", 400);
            expect(parsedBody).toHaveProperty("message", "Bad Request");
            done();
        });
    });

    it("should correctly return an unauthorized request response", (done) => {
        responseBuilder.Unauthorized("Unauthorized", (err, data: any) => {
            expect(err).toBe(null);
            expect(data).toBeDefined();
            expect(data).toHaveProperty("statusCode", 401);
            expect(data).toHaveProperty("headers");
            expect(data.headers).toHaveProperty("Access-Control-Origin", "*");
            expect(data).toHaveProperty("body");
            expect(data.body).toBeDefined();

            const parsedBody: any = JSON.parse(data.body);
            expect(parsedBody).toHaveProperty("statusCode", 401);
            expect(parsedBody).toHaveProperty("message", "Unauthorized");
            done();
        });
    });
});
