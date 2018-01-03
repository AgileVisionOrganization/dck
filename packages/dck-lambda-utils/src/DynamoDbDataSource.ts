import * as async from "async";
import * as shortid from "shortid";
import * as moment from "moment";
import { DynamoDB } from "aws-sdk";

const MAX_BATCH_WRITE_ITEMS = 25;

import {
  IDckCallback,
  IDckDataSource,
  IDbEntity,
  IQueryOptions,
  IDeleteOptions,
  IGetMulitpleOptions,
} from "./BaseTypes";

export class DynamoDbDataSource implements IDckDataSource {
  private dynamo: DynamoDB.DocumentClient;

  constructor(dynamo: DynamoDB.DocumentClient) {
    this.dynamo = dynamo;
  }

  public queryItems(
    itemType: IDbEntity,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ) {
    const hashKey = itemType.getHashKey();
    const rangeKey = itemType.getRangeKey();
    const expressionAttributeNames: any = {};
    const expressionAttributeValues: any = {};
    const comparisonOperators : any = queryOptions.comparisonOperators || {};

    let filterExpression: any = "";
    if (queryOptions.data) {
      Object.keys(queryOptions.data).forEach((item) => {
        expressionAttributeNames["#" + item] = item;
        expressionAttributeValues[":" + item] = queryOptions.data[item];
        if (filterExpression.length > 0) {
          filterExpression += "and ";
        }
        const comparisonOperator: string = comparisonOperators[item] || "=";
        filterExpression += "#" + item + comparisonOperator + ":" + item + " ";
      });
    }
    expressionAttributeNames["#hkeyname"] = hashKey;
    expressionAttributeValues[":hkeyvalue"] = queryOptions.query[hashKey];
    const hashKeyComparisonOperator = comparisonOperators[hashKey] || "=";
    let keyConditionExpression: string = null;
    
    if (queryOptions.query[rangeKey]) {
      const rangeKeyComparisonOperator = comparisonOperators[rangeKey] || "=";
      expressionAttributeNames["#rkeyname"] = rangeKey;
      expressionAttributeValues[":rkeyvalue"] = queryOptions.query[rangeKey];
      keyConditionExpression =
        `#hkeyname ${hashKeyComparisonOperator} :hkeyvalue and #rkeyname ${rangeKeyComparisonOperator} :rkeyvalue`;
    } else {
      keyConditionExpression = `#hkeyname ${hashKeyComparisonOperator} :hkeyvalue`;
    }
    async.waterfall(
      [
        (next: IDckCallback) => {
          const query: any = {
            TableName: itemType.getDatabaseTableName(),
            IndexName: itemType.getIndex(),
            ExpressionAttributeNames: expressionAttributeNames,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionAttributeValues,
          };
          if (filterExpression && filterExpression.length > 0) {
            query.FilterExpression = filterExpression;
          }
          this.dynamo.query(query, next);
        },
        (data: any, next: IDckCallback) => {
          next(null, data.Items);
        },
      ],
      callback,
    );
  }

  public scanItems(
    itemType: IDbEntity,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ) {
    const expressionAttributeNames: any = {};
    const expressionAttributeValues: any = {};
    const comparisonOperators : any = queryOptions.comparisonOperators || {};

    let filterExpression: any = "";
    if (queryOptions.data) {
      Object.keys(queryOptions.data).forEach((item) => {
        expressionAttributeNames["#" + item] = item;
        expressionAttributeValues[":" + item] = queryOptions.data[item];
        if (filterExpression.length > 0) {
          filterExpression += "and ";
        }
        const comparisonOperator: string = comparisonOperators[item] || "=";
        filterExpression += "#" + item + comparisonOperator + ":" + item + " ";
      });
    }
    async.waterfall(
      [
        (next: IDckCallback) => {
          const query: any = {
            TableName: itemType.getDatabaseTableName(),
            IndexName: itemType.getIndex(),
          };
          if (filterExpression && filterExpression.length > 0) {
            query.FilterExpression = filterExpression;
            query.ExpressionAttributeNames = expressionAttributeNames;
            query.ExpressionAttributeValues = expressionAttributeValues;
          }
          this.dynamo.scan(query, next);
        },
        (data: any, next: IDckCallback) => {
          next(null, data.Items);
        },
      ],
      callback,
    );
  }

  public getItems(
    itemType: IDbEntity,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ) {
    const tableName = itemType.getDatabaseTableName();
    const indexName = itemType.getIndex();
    const queryParams = queryOptions.query && queryOptions.query;

    if (queryParams) {
      this.queryItems(itemType, queryOptions, callback);
    } else {
      this.scanItems(itemType, queryOptions, callback);
    }
  }

  public getMultipleItems(
    itemType: IDbEntity,
    queryOptions: IGetMulitpleOptions,
    callback: IDckCallback,
  ): void {
    const params: any = {
      RequestItems: {},
    };

    params.RequestItems[itemType.getDatabaseTableName()] = {
      Keys: queryOptions.keys,
    };

    async.waterfall(
      [
        (next: IDckCallback) => this.dynamo.batchGet(params, next),
        (data: any, next: IDckCallback) =>
          next(null, data.Responses[itemType.getDatabaseTableName()]),
      ],
      callback,
    );
  }

  public addItem(item: IDbEntity, data: any, callback: IDckCallback) {
    const newItem = Object.assign({}, data, {
      added: moment().unix(),
    });

    const hashKey = item.getHashKey();
    const rangeKey = item.getRangeKey();

    if (!newItem[hashKey]) {
      newItem[hashKey] = shortid.generate();
    }

    if (rangeKey && !newItem[rangeKey]) {
      newItem[rangeKey] = shortid.generate();
    }

    async.waterfall(
      [
        (next: IDckCallback) => {
          this.dynamo.put(
            {
              TableName: item.getDatabaseTableName(),
              Item: newItem,
            },
            next,
          );
        },
        (response: any, next: IDckCallback) => {
          next(null, newItem);
        },
      ],
      callback,
    );
  }

  public getItem(
    itemType: IDbEntity,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ): void {
    const hashKey = itemType.getHashKey();
    const rangeKey = itemType.getRangeKey();

    const expressionAttributeNames: any = { "#hkeyname": hashKey };
    if (rangeKey) {
      expressionAttributeNames["#rkeyname"] = rangeKey;
    }

    const expressionAttributeValues: any = {
      ":hkeyvalue": queryOptions.query[hashKey],
    };
    if (rangeKey) {
      expressionAttributeValues[":rkeyvalue"] = queryOptions.query[rangeKey];
    }

    const keyConditionExpression = rangeKey
      ? "#hkeyname = :hkeyvalue and #rkeyname = :rkeyvalue"
      : "#hkeyname = :hkeyvalue";

    const queryParams = {
      TableName: itemType.getDatabaseTableName(),
      IndexName: itemType.getIndex(),
      ExpressionAttributeNames: expressionAttributeNames,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    async.waterfall(
      [
        (next: IDckCallback) => {
          this.dynamo.query(queryParams, next);
        },
        (data: any, next: IDckCallback) => {
          next(null, data.Items.length === 0 ? null : data.Items[0]);
        },
      ],
      callback,
    );
  }

  public updateItem(
    itemType: IDbEntity,
    data: any,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ): void {
    const hashKey = itemType.getHashKey();
    const rangeKey = itemType.getRangeKey();

    const keyCondition: any = {};
    keyCondition[hashKey] = queryOptions.query[hashKey];

    if (rangeKey) {
      keyCondition[rangeKey] = queryOptions.query[rangeKey];
    }

    const newItem = Object.assign({}, data, {
      updated: moment().unix(),
    });

    delete newItem[hashKey];

    if (rangeKey) {
      delete newItem[rangeKey];
    }

    const updates: any = {};
    for (const key in newItem) {
      if (newItem.hasOwnProperty(key)) {
        updates[key] = {
          Action: "PUT",
          Value: newItem[key],
        };
      }
    }

    async.waterfall(
      [
        (next: IDckCallback) => this.getItem(itemType, queryOptions, next),
        (result: any, next: IDckCallback) => {
          if (!result) {
            next(new Error("Can't update non-existing item"), null);
          } else {
            this.dynamo.update(
              {
                TableName: itemType.getDatabaseTableName(),
                Key: keyCondition,
                AttributeUpdates: updates,
              },
              next,
            );
          }
        },
        (response: any, next: IDckCallback) => {
          next(null, response.Attributes);
        },
      ],
      callback,
    );
  }

  public deleteItems(
    itemType: IDbEntity,
    options: IDeleteOptions,
    callback: IDckCallback,
  ): void {
    if (!options.keys) {
      const errorMessage = "Keys to be deleted can't be null";
      console.error(errorMessage);
      return callback(new Error(errorMessage));
    }

    if (options.keys.length > MAX_BATCH_WRITE_ITEMS) {
      const errorMessage = "Can't delete more than %d in a single batch";
      console.error(errorMessage, MAX_BATCH_WRITE_ITEMS);
      return callback(new Error(errorMessage));
    }

    if (options.keys.length === 0) {
      return callback(null, []);
    }

    const hashKey = itemType.getHashKey();
    const rangeKey = itemType.getRangeKey();

    async.waterfall(
      [
        (next: IDckCallback) => {
          const requestItems: any = {};
          requestItems[itemType.getDatabaseTableName()] = options.keys.map(
            (x: any) => {
              return {
                DeleteRequest: {
                  Key: x,
                },
              };
            },
          );
          this.dynamo.batchWrite(
            {
              RequestItems: requestItems,
            },
            next,
          );
        },
        (data: any, next: IDckCallback) => {
          next(null, []);
        },
      ],
      callback,
    );
  }
}
