import { IDckCallback } from "./BaseTypes";

/**
 * Response builder header map.
 */
export type HeadersMap = { [key: string]: string };

/**
 * Response builder.
 */
export class HttpResponseBuilder {
  private responseHeaders: HeadersMap;

  /**
   * Response builder constructor.
   * @param additionalHeaders additional headers
   */
  public constructor(additionalHeaders: HeadersMap) {
    this.responseHeaders = additionalHeaders;
  }

  /**
   * Operaion success response.
   * @param code response code
   * @param message resposne message
   * @param data response data
   * @param callback function callback
   */
  public OperationSucess(code: number, message: string, data: any, callback: IDckCallback) {
    const response = this.createResponse(code || 200, message || "Successful operation", data);
    callback(null, response);
  }

  /**
   * Not found response.
   * @param message resposne message
   * @param callback function callback
   */
  public NotFound(message: string, callback: IDckCallback) {
    const response = this.createResponse(404, message || "Object not found");
    callback(null, response);
  }

  /**
   * Unauthorized response.
   * @param message response message
   * @param callback function callback
   */
  public Unauthorized(message: string, callback: IDckCallback) {
    const response = this.createResponse(401, message || "Unauthorized");
    callback(null, response);
  }

  /**
   * BadRequest response.
   * @param message response message
   * @param data response data
   * @param callback function callback
   */
  public BadRequest(message: string, data: any, callback: IDckCallback) {
    const response = this.createResponse(400, message || "Bad request", data || {});
    callback(null, response);
  }

  /**
   * Custom response.
   * @param code response code
   * @param message response message
   * @param data response data
   * @param callback function callback
   */
  public CustomResponse(code: number, message: string, data: any, callback: IDckCallback) {
    const response = this.createResponse(code, message, data);
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
