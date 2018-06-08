import * as async from "async";
import { Handler } from "aws-lambda";

import { IDckCallback, IDckDataSource } from "./BaseTypes";
import { SecurityEnforcer } from "./SecurityEnforcer";
import { HttpResponseBuilder } from "./HttpResponseBuilder";

/**
 * Advanced api builder.
 */
export class AdvancedApiBuilder {
  private securityEnforcer: SecurityEnforcer;
  private httpResponseBuilder: HttpResponseBuilder;
  private detailedLogging: boolean;

  /**
   * Advanced api builder constructor.
   * @param {SecurityEnforcer} securityEnforcer Security enfoncer
   * @param {HttpResponseBuilder} httpResponseBuilder http response builder
   * @param {boolean} detailedLogging if true, logging will be detailed
   */
  constructor(securityEnforcer: SecurityEnforcer, httpResponseBuilder: HttpResponseBuilder, detailedLogging?: boolean) {
    this.securityEnforcer = securityEnforcer;
    this.httpResponseBuilder = httpResponseBuilder;
    this.detailedLogging = detailedLogging || false;
  }

  /**
   * Api action.
   * @param {string[]} requiredGroups groups which can make this request
   * @param {boolean} validateBody validate body?
   * @param {Handler} handler function handler
   */
  public ApiAction(requiredGroups: string[], validateBody: boolean, handler: Handler): Handler {
    return (event, context, callback: IDckCallback) => {
      async.waterfall(
        [
          (next: IDckCallback) =>
            this.securityEnforcer.allowOnly(event, requiredGroups, (err) => {
              if (err) {
                return this.httpResponseBuilder.Unauthorized(null, callback);
              } else {
                next(null, null);
              }
            }),
          (data: any, next: IDckCallback) => {
            try {
              handler(event, context, next);
            } catch (error) {
              next(error);
            }
          },
        ],
        (err: any, data) => {
          if (this.detailedLogging) {
            console.log("Invoking an API method. Event: ", event, ". Response: ", data, ". Error: ", err);
          }
          if (err) {
            let errorMessage: string = null;

            try {
              switch (typeof err) {
                case "string":
                  errorMessage = String(err);
                  break;
                case "object":
                  if (err instanceof Error) {
                    errorMessage = err.message;
                  } else {
                    errorMessage = JSON.stringify(err);
                  }
                  break;
                default:
                  errorMessage = "Bad request";
                  break;
              }
            } catch (Error) {
              errorMessage = "Bad request";
            }

            this.httpResponseBuilder.BadRequest(errorMessage, data, callback);
          } else {
            this.httpResponseBuilder.OperationSucess(200, "Success", data, callback);
          }
        },
      );
    };
  }
}
