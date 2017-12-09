import async from "async";
import HttpResponseBuilder from "./HttpResponseBuilder";

/**
 * Checks whether all of required fields are defined in the object
 * @param {Array} requiredFields array of required fields
 * @param {Object} item item to check
 * @param {function} cb callback
 */
export function checkRequiredFields(requiredFields, item, cb) {
  let missingFields = [];
  for (let i = 0; i < requiredFields.length; i++) {
    if (!item.hasOwnProperty(requiredFields[i])) {
      missingFields.push(requiredFields[i]);
    }
  }

  if (missingFields.length !== 0) {
    HttpResponseBuilder.BadRequestWithMessage(
      "Missing fields: " + JSON.stringify(missingFields),
      cb
    );
  }
}

/**
 * Checks whether fields, set on the object are actually supported by it
 * @param {Array} allowedFields array of allowed fields
 * @param {Object} item item to check
 * @param {function} cb callback
 */
export function checkAllowedFields(allowedFields, item, cb) {
  let unkownFields = [];

  for (let key in item) {
    if (item.hasOwnProperty(key) && allowedFields.indexOf(key) < 0) {
      unkownFields.push(key);
    }
  }

  if (unkownFields.length !== 0) {
    HttpResponseBuilder.BadRequestWithMessage(
      "Unknown fields: " + JSON.stringify(unkownFields),
      cb
    );
  }
}

export class ApiBuilder {
  constructor(dataService, ownerKey, ownerClaim, enricher, adminRoles) {
    this.ownerKey = ownerKey;
    this.ownerClaim = ownerClaim;
    this.dataService = dataService;
    this.enricher = enricher;
    this.adminRoles = adminRoles;
  }

  /**
 * Returns the list of objects from the given table filtered by the owner.
 * Owner is extracted from the Cognito claim that is mapped to the "owner" field of the table.
 * So API assumes all data is stored in a table with a OWNER_ID as a hash key and ITEM_ID as the range key
 * @param {string} tableName name of the table to be used as the primary data source
 */
  ListAction(tableName) {
    return (event, context, callback) => {
      const hashKeyValue =
        event.requestContext.authorizer.claims[this.ownerClaim];
      console.log(
        "Executing List with " +
          this.ownerKey +
          " = " +
          hashKeyValue +
          " from " +
          this.ownerClaim
      );

      this.dataService.getItemsForOwner(
        tableName,
        hashKeyValue,
        (err, result) => {
          if (err) {
            console.log(err);
            HttpResponseBuilder.BadRequest(callback);
          } else {
            HttpResponseBuilder.OperationSuccessWithData(200, result, callback);
          }
        }
      );
    };
  }

  /**
 * Returns the list of objects from the given table filtered by the parent object. For example, object can be a room and parent object is a building.
 * Parent object is fetched first to ensure the given user has the access to child objects.
 * @param {string} parentTableName name of the parent object table
 * @param {string} tableName name of the table that contains data
 * @param {string} hash name of the hash key
 */
  SubListAction(parentTableName, tableName, hash) {
    return (event, context, callback) => {
      const hashKeyValue =
        event.requestContext.authorizer.claims[this.ownerClaim];
      const parentId = event.pathParameters[this.ownerKey];

      console.log(
        "Executing SubList with " +
          this.ownerKey +
          " = " +
          hashKeyValue +
          " from " +
          this.ownerClaim
      );

      async.waterfall(
        [
          next =>
            this.dataService.getItemForOwner(
              parentTableName,
              hashKeyValue,
              parentId,
              next
            ),
          (data, next) =>
            this.dataService.getItemsForParent(tableName, hash, parentId, next),
          (data, next) =>
            this.enricher && this.enricher.SubListAction
              ? this.enricher.SubListAction(data, next)
              : next(null, data)
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            HttpResponseBuilder.BadRequest(callback);
          } else {
            HttpResponseBuilder.OperationSuccessWithData(200, result, callback);
          }
        }
      );
    };
  }

  GetAction(tableName) {
    return (event, context, callback) => {
      const hashKeyValue =
        event.requestContext.authorizer.claims[this.ownerClaim];
      const id = event.pathParameters.id;
      console.log(
        "Executing Get with " +
          this.ownerKey +
          " = " +
          hashKeyValue +
          " from " +
          this.ownerClaim
      );

      this.dataService.getItemForOwner(
        tableName,
        hashKeyValue,
        id,
        (err, result) => {
          if (err) {
            console.log(err);
            HttpResponseBuilder.NotFound(callback);
          } else {
            HttpResponseBuilder.OperationSuccessWithData(200, result, callback);
          }
        }
      );
    };
  }

  ReadApi(tableName) {
    return {
      get: this.GetAction(tableName),
      list: this.ListAction(tableName)
    };
  }

  NestedReadApi(parentTableName, tableName, hash) {
    return {
      list: this.SubListAction(parentTableName, tableName, hash)
    };
  }

  AdminApi(tableName, requiredFields, allowedFields) {
    return {
      list: this.ListAction(tableName),
      add: this.AddAction(tableName, requiredFields, allowedFields),
      get: this.GetAction(tableName),
      update: this.UpdateAction(tableName, allowedFields),
      delete: this.DeleteAction(tableName)
    };
  }
}

export class AdminApiBuilder {
  constructor(dataService) {
    this.dataService = dataService;
  }

  /**
 * Returns the list of objects from the given table filtered by the owner.
 * Owner is extracted from the Cognito claim that is mapped to the "owner" field of the table.
 * So API assumes all data is stored in a table with a OWNER_ID as a hash key and ITEM_ID as the range key
 * @param {string} tableName name of the table to be used as the primary data source
 */
  ListAction(tableName) {
    return (event, context, callback) => {
      this.dataService.getItems(tableName, (err, result) => {
        if (err) {
          console.log(err);
          HttpResponseBuilder.BadRequest(callback);
        } else {
          HttpResponseBuilder.OperationSuccessWithData(200, result, callback);
        }
      });
    };
  }

  GetAction(tableName) {
    return (event, context, callback) => {
      const id = event.pathParameters.id;
      this.dataService.getItem(tableName, id, (err, result) => {
        if (err) {
          console.log(err);
          HttpResponseBuilder.NotFound(callback);
        } else {
          HttpResponseBuilder.OperationSuccessWithData(200, result, callback);
        }
      });
    };
  }

  AddAction(tableName, requiredFields, allowedFields) {
    return (event, context, callback) => {
      const input = JSON.parse(event.body);

      checkRequiredFields(requiredFields, input, callback);
      checkAllowedFields(allowedFields, input, callback);

      this.dataService.addItem(tableName, input, (err, result) => {
        if (err) {
          console.log(err);
          HttpResponseBuilder.BadRequestWithMessage(callback, err);
        } else {
          HttpResponseBuilder.OperationSuccessWithData(201, result, callback);
        }
      });
    };
  }

  UpdateAction(tableName, allowedFields) {
    return (event, context, callback) => {
      const item = JSON.parse(event.body);
      const id = event.pathParameters.id;
      checkAllowedFields(allowedFields, item, callback);

      this.dataService.updateItem(tableName, id, item, err => {
        if (err) {
          console.log(err);
          HttpResponseBuilder.BadRequestWithMessage(callback, err);
        } else {
          HttpResponseBuilder.OperationSuccess(200, callback);
        }
      });
    };
  }

  DeleteAction(tableName) {
    return (event, context, callback) => {
      const ids = JSON.parse(event.body).ids;
      this.dataService.deleteItems(tableName, ids, err => {
        if (err) {
          console.log(err);
          HttpResponseBuilder.BadRequestWithMessage(callback, err);
        } else {
          HttpResponseBuilder.OperationSuccess(200, callback);
        }
      });
    };
  }

  ReadApi(tableName) {
    return {
      get: this.GetAction(tableName),
      list: this.ListAction(tableName)
    };
  }

  AdminApi(tableName, requiredFields, allowedFields) {
    return {
      list: this.ListAction(tableName),
      add: this.AddAction(tableName, requiredFields, allowedFields),
      get: this.GetAction(tableName),
      update: this.UpdateAction(tableName, allowedFields),
      delete: this.DeleteAction(tableName)
    };
  }
}
