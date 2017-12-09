import {IDckCallback} from "./BaseTypes";

export type HeadersMap = { [key: string]: string };

export class HttpResponseBuilder {
    private responseHeaders: HeadersMap;

    public constructor(additionalHeaders: HeadersMap) {
        this.responseHeaders = additionalHeaders;
    }

    public OperationSucess(code: number, message: string, data: any, callback: IDckCallback) {
        const response = this.createResponse(code || 200, message || "Successful operation", data);
        callback(null, response);
    }

    public NotFound(message: string, callback: IDckCallback) {
        const response = this.createResponse(404, message || "Object not found");
        callback(null, response);
    }

    public Unauthorized(message: string, callback: IDckCallback) {
        const response = this.createResponse(401, message || "Unauthorized");
        callback(null, response);
    }

    public BadRequest(message: string, callback: IDckCallback) {
        const response = this.createResponse(400, message || "Bad request");
        callback(null, response);
    }

    private createResponseBody(code: number, message: string, data?: any) {
        const response: any = {
            statusCode: code,
        };

        if (message) {
            response.message = message;
        }

        if (data) {
            response.data = data;
        }

        return response;
    }

    private createResponse(code: number, message: string, data?: any) {
        const response: any = {
            statusCode: code,
            headers: {
                ...this.responseHeaders,
            },
            body: JSON.stringify(this.createResponseBody(code, message, data)),
        };

        return response;
    }

}
