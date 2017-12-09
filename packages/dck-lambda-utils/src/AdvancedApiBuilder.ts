import * as async from "async";
import { Handler } from "aws-lambda";

import { IDckCallback, IDckDataSource } from "./BaseTypes";
import { SecurityEnforcer } from "./SecurityEnforcer";
import { HttpResponseBuilder } from "./HttpResponseBuilder";

export class AdvancedApiBuilder {
  private securityEnforcer: SecurityEnforcer;
  private httpResponseBuilder: HttpResponseBuilder;
  private detailedLogging: boolean;

  constructor(
    securityEnforcer: SecurityEnforcer,
    httpResponseBuilder: HttpResponseBuilder,
    detailedLogging?: boolean,
  ) {
    this.securityEnforcer = securityEnforcer;
    this.httpResponseBuilder = httpResponseBuilder;
    this.detailedLogging = detailedLogging || false;
  }

  public ApiAction(
    requiredGroups: string[],
    validateBody: boolean,
    handler: Handler,
  ): Handler {
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
        (err, data) => {

            if (this.detailedLogging) {
                console.log("Invoking an API method. Event: ", event, ". Response: ", data, ". Error: ", err);
            }
            if (err) {
            this.httpResponseBuilder.BadRequest("Bad request", callback);
          } else {
            this.httpResponseBuilder.OperationSucess(
              200,
              "Success",
              data,
              callback,
            );
          }
        },
      );
    };
  }
}
