import * as async from "async";
import * as shortid from "shortid";
import * as moment from "moment";
import * as slug from "slug";
import {CognitoIdentityServiceProvider} from "aws-sdk";

import {IDbEntity, IDckCallback, IDckDataSource, IDeleteOptions, IGetMulitpleOptions, IQueryOptions} from "./BaseTypes";
import {fromCognitoGetUser, fromCognitoUser, toCognitoAttributes} from "./utils";

/**
 * Cognito data source.
 * Can be used to manage users in cognito.
 */
export class CognitoDataSource implements IDckDataSource {

    private idp: CognitoIdentityServiceProvider;

    /**
     * Cognito data source constructor.
     * @param idp object of CognitoIdentityServiceProvider
     */
    public constructor(idp: CognitoIdentityServiceProvider) {
        this.idp = idp;
    }

    /**
     * Get users from cognito.
     * @param itemType users cognito entity
     * @param queryOptions users key
     * @param callback function callback
     */
    public getItems(itemType: IDbEntity, queryOptions: IQueryOptions, callback: IDckCallback): void {
        async.waterfall(
            [
                (next: IDckCallback) =>
                    this.idp.listUsers(
                        {
                            UserPoolId: itemType.getDatabaseTableName(),
                        },
                        next,
                    ),
                (data: any, next: IDckCallback) => {
                    const transformed = data.Users.map((x: any) => fromCognitoUser(x));
                    async.map(transformed, (x: any, cb) => {
                        this.idp.adminListGroupsForUser({
                            UserPoolId: itemType.getDatabaseTableName(),
                            Username: x.id,
                        }, (listErr: any, listData: any) => {
                            if (listErr) {
                                console.error("Failed to fetch groups for the user", x.id, listErr);
                                cb(null, x);
                            } else {
                                const groups = listData.Groups.sort((a: any, b: any) => a.Precedece - b.Precedence);
                                cb(null, {...x, groups});
                            }
                        });
                    }, next);
                },
            ],
            callback,
        );
    }

    /**
     * Get user from cognito.
     * @param itemType users cognito entity
     * @param queryOptions user key
     * @param callback function callback
     */
    public getItem(itemType: IDbEntity, queryOptions: IQueryOptions, callback: IDckCallback): void {
        this.idp.adminGetUser(
            {
                UserPoolId: itemType.getDatabaseTableName(),
                Username: queryOptions.query[itemType.getHashKey()] || queryOptions.query.id,
            },
            (err, result) => {
                if (err && err.code === "UserNotFoundException") {
                    callback(null, null);
                } else if (err) {
                    callback(err, null);
                } else {
                    const transformed = fromCognitoGetUser(result);
                    this.idp.adminListGroupsForUser({
                        UserPoolId: itemType.getDatabaseTableName(),
                        Username: transformed.id,
                    }, (listErr: any, listData: any) => {
                        if (listErr) {
                            console.error("Failed to fetch groups for the user", transformed.id, listErr);
                            callback(null, transformed);
                        } else {
                            const groups = listData.Groups.sort((a: any, b: any) => a.Precedece - b.Precedence);
                            callback(null, {...transformed, groups});
                        }
                    });
                }
            },
        );
    }

    /**
     * Get users with different keys from cognito.
     * @param itemType users cognito entity
     * @param queryOptions users keys
     * @param callback function callback
     */
    public getMultipleItems(itemType: IDbEntity, queryOptions: IGetMulitpleOptions, callback: IDckCallback): void {
        if (!queryOptions.keys || queryOptions.keys.length === 0) {
          callback(new Error("queryOptions.keys is null or undefined"), null);
          return;
      }
        async.map(
          queryOptions.keys,
          (key, mapCallback) => {
            this.idp.adminGetUser(
              {
                UserPoolId: itemType.getDatabaseTableName(),
                Username: key,
              },
              (err, data) => {
                if (err) {
                  if (err.code !== "UserNotFoundException") {
                    mapCallback(err);
                  } else {
                    mapCallback(null);
                  }
                } else {
                  const result = fromCognitoGetUser(data);
                  mapCallback(null, result);
                }
              },
            );
          },
          (err: Error, data) => {
            if (err) {
              callback(err, null);
            } else {
              callback(
                null,
                data.filter((user: any) => {
                  return user;
                }),
              );
            }
          },
        );
    }

    /**
     * Add user to cognito.
     * @param itemType users cognito entity
     * @param data user data
     * @param callback function callback
     */
    public addItem(itemType: IDbEntity, data: any, callback: IDckCallback): void {

        const rangeKey = itemType.getRangeKey();
        const rangeKeyValue = rangeKey ? data[rangeKey] : "";
        const username = slug(`${
            shortid.generate()}_${rangeKeyValue}_${data.email}`, {
            replacement: "_",
            lower: true,
        }).substr(0, 60);

        this.idp.adminCreateUser(
            {
                UserPoolId: itemType.getDatabaseTableName(),
                Username: username,
                UserAttributes: [
                    {
                        Name: "email_verified",
                        Value: "true",
                    },
                    {
                        Name: "updated_at",
                        Value: moment()
                            .unix()
                            .toString(),
                    },
                ].concat(toCognitoAttributes(data)),
                DesiredDeliveryMediums: ["EMAIL"],
            },
            (err: Error, result: any) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, fromCognitoUser(result.User));
                }
            },
        );
    }

    /**
     * Update user.
     * @param itemType users cognito entity
     * @param data new user data
     * @param queryOptions user key
     * @param callback function callback
     */
    public updateItem(itemType: IDbEntity, data: any, queryOptions: IQueryOptions, callback: IDckCallback): void {

        const cleanData = Object.assign({}, data);
        delete cleanData.id;
        delete cleanData.sub;
        delete cleanData.email_verified;
        delete cleanData.status;
        async.waterfall(
            [
                (next: IDckCallback) => this.getItem(itemType, queryOptions, next),
                (result: any, next: IDckCallback) =>
                    this.idp.adminUpdateUserAttributes(
                        {
                            UserPoolId: itemType.getDatabaseTableName(),
                            Username: queryOptions.query[itemType.getHashKey()] || queryOptions.query.id,
                            UserAttributes: [
                                {
                                    Name: "updated_at",
                                    Value: moment()
                                        .unix()
                                        .toString(),
                                },
                            ].concat(toCognitoAttributes(cleanData)),
                        },
                        next,
                    ),
                (result: any, next: IDckCallback) => this.getItem(itemType, queryOptions, next),
            ],
            callback,
        );
    }

    /**
     * Delete users.
     * @param itemType users cognito entity
     * @param options users keys
     * @param callback function callback
     */
    public deleteItems(itemType: IDbEntity, options: IDeleteOptions, callback: IDckCallback): void {

        if (options.keys === null) {
            return callback(new Error("Keys can't be null"), null);
        }

        async.each(
            options.keys,
            (keyToBeDeleted, asyncCallback: IDckCallback) => {
                async.waterfall(
                    [
                        (next: IDckCallback) => this.getItem(itemType, {query: keyToBeDeleted}, next),
                        (data: any, next: IDckCallback) =>
                            this.idp.adminDeleteUser(
                                {
                                    UserPoolId: itemType.getDatabaseTableName(),
                                    Username: keyToBeDeleted[itemType.getHashKey()],
                                },
                                next,
                            ),
                    ],
                    asyncCallback,
                );
            },
            (err) => err ? callback(err, null) : callback(null, []),
        );
    }

}
