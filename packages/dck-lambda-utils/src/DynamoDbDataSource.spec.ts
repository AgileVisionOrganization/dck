import * as async from "async";
import * as shortid from "shortid";
import { config, DynamoDB } from "aws-sdk";
import { DynamoDbDataSource } from "./";
import { IDbEntity, IDckCallback } from "./BaseTypes";

const REGION = process.env.AWS_REGION;
const PARENT_TABLE =
  process.env.AWS_TEST_PARENT_TABLE;
const CHILD_TABLE =
  process.env.AWS_TEST_CHILD_TABLE;
const CHILD_TABLE_INDEX = "secondary_id-index";
const CHILD_TABLE_INDEX_WITH_RANGE = "parent_id-secondary_id-index";

const PARENT_HASH_KEY = "id";
const CHILD_HASH_KEY = "parent_id";
const CHILD_RANGE_KEY = "id";
const CHILD_SECONDARY_HASH_KEY = "secondary_id";

config.region = REGION;
const dynamo = new DynamoDB.DocumentClient();
const dataSource = new DynamoDbDataSource(dynamo);

const createEntity = (
  tableName: string,
  hash: string,
  range?: string,
  index?: string,
): IDbEntity => {
  return {
    getDatabaseTableName: () => tableName,
    getHashKey: () => hash,
    getRangeKey: () => range,
    getIndex: () => index,
  };
};

const ParentEntity = createEntity(PARENT_TABLE, PARENT_HASH_KEY);
const ChildEntity = createEntity(CHILD_TABLE, CHILD_HASH_KEY, CHILD_RANGE_KEY);
const BrokenEntity = createEntity(
  "NONEXISTINGTABLE",
  CHILD_HASH_KEY,
  CHILD_RANGE_KEY,
);

const ChildEntityWithIndex = createEntity(
  CHILD_TABLE,
  "secondary_id",
  null,
  CHILD_TABLE_INDEX,
);
const ChildEntityWithRangeIndex = createEntity(
  CHILD_TABLE,
  "parent_id",
  "secondary_id",
  CHILD_TABLE_INDEX_WITH_RANGE,
);
const ChildEntityWithNonExistingIndex = createEntity(
  CHILD_TABLE,
  "id",
  null,
  "NONEXISTING",
);

describe("DynamoDbDataSource Tests", () => {
  beforeEach((done: (err: any) => void) => {
    dynamo.put(
      {
        TableName: PARENT_TABLE,
        Item: {
          id: "TEST_PARENT",
          field1: "A",
          field2: ["a", "b", "c"],
          field3: { nested_field: "nested value" },
        },
      },
      () => {
        dynamo.put(
          {
            TableName: CHILD_TABLE,
            Item: {
              parent_id: "TEST_PARENT",
              id: "TEST_CHILD",
              field1: "C",
              field2: "B",
              field3: [1, 2, 3, 10],
              secondary_id: "TEST_CHILD_SEC",
            },
          },
          done,
        );
      },
    );
  });

  describe("getMultipleItems", () => {
    it("should get multiple items", (done: () => void) => {
      dataSource.getMultipleItems(
        ChildEntity,
        {
          keys: [
            {
              parent_id: "TEST_PARENT",
              id: "TEST_CHILD",
            },
          ],
        },
        (error: Error, data: any) => {
          expect(error).toBeFalsy();
          expect(data).toBeInstanceOf(Array);
          expect(data).not.toHaveLength(0);
          expect(data[0].id).not.toBe(null);
          done();
        },
      );
    });
  });

  describe("getItems", () => {
    it("should execute query when the method is called with a hash key", (
      done: () => void,
    ) => {
      const scanSpy = (dataSource.scanItems = jest.fn(dataSource.scanItems));
      const querySpy = (dataSource.queryItems = jest.fn(dataSource.queryItems));
      dataSource.getItems(
        ChildEntity,
        {
          query: { parent_id: "TEST_PARENT" },
        },
        (error: Error, data: any) => {
          expect(error).toBeFalsy();
          expect(data).toBeInstanceOf(Array);
          expect(data).not.toHaveLength(0);
          expect(data[0].id).not.toBe(null);
          expect(scanSpy).not.toBeCalled();
          expect(querySpy).toBeCalled();
          done();
        },
      );
    });

    it("should execute query and not fail when the method is called with a hash key that's not in the table", (
      done: () => void,
    ) => {
      const scanSpy = (dataSource.scanItems = jest.fn(dataSource.scanItems));
      const querySpy = (dataSource.queryItems = jest.fn(dataSource.queryItems));
      dataSource.getItems(
        ChildEntity,
        {
          query: { parent_id: "TEST_PARENT-IDONTEXIST" },
        },
        (error: Error, data: any) => {
          expect(error).toBeFalsy();
          expect(data).toBeInstanceOf(Array);
          expect(data).toHaveLength(0);
          expect(scanSpy).not.toBeCalled();
          expect(querySpy).toBeCalled();
          done();
        },
      );
    });

    it("should execute scan when the method is called without filtering options", (
      done: () => void,
    ) => {
      const scanSpy = (dataSource.scanItems = jest.fn(dataSource.scanItems));
      const querySpy = (dataSource.queryItems = jest.fn(dataSource.queryItems));
      dataSource.getItems(ParentEntity, {}, (error: Error, data: any) => {
        expect(error).toBeFalsy();
        expect(data).toBeInstanceOf(Array);
        expect(data).not.toHaveLength(0);
        expect(data[0].id).not.toBe(null);
        expect(scanSpy).toBeCalled();
        expect(querySpy).not.toBeCalled();
        done();
      });
    });

    it("should execute query by index when the method is called both with hash keys and index", (
      done: () => void,
    ) => {
      const scanSpy = (dataSource.scanItems = jest.fn(dataSource.scanItems));
      const querySpy = (dataSource.queryItems = jest.fn(dataSource.queryItems));
      dataSource.getItems(
        ChildEntityWithRangeIndex,
        {
          query: {
            parent_id: "TEST_PARENT",
          },
        },
        (error: Error, data: any) => {
          expect(error).toBeFalsy();
          expect(data).toBeInstanceOf(Array);
          expect(data).not.toHaveLength(0);
          expect(data[0].id).not.toBe(null);
          expect(scanSpy).not.toBeCalled();
          expect(querySpy).toBeCalled();
          done();
        },
      );
    });

    it("should execute scan by index when the method is called without filtering options on index", (
      done: () => void,
    ) => {
      const scanSpy = (dataSource.scanItems = jest.fn(dataSource.scanItems));
      const querySpy = (dataSource.queryItems = jest.fn(dataSource.queryItems));
      dataSource.getItems(
        ChildEntityWithRangeIndex,
        {},
        (error: Error, data: any) => {
          expect(error).toBeFalsy();
          expect(data).toBeInstanceOf(Array);
          expect(data).not.toHaveLength(0);
          expect(data[0].id).not.toBe(null);
          expect(scanSpy).toBeCalled();
          expect(querySpy).not.toBeCalled();
          done();
        },
      );
    });

    it("should fail on a non-existing table ", (done: () => void) => {
      const scanSpy = (dataSource.scanItems = jest.fn(dataSource.scanItems));
      const querySpy = (dataSource.queryItems = jest.fn(dataSource.queryItems));
      dataSource.getItems(BrokenEntity, {}, (error: Error, data: any) => {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Error);
        expect(data).toBe(null);
        expect(scanSpy).toBeCalled();
        expect(querySpy).not.toBeCalled();
        done();
      });
    });

    it("should fail on a non-existing index ", (done: () => void) => {
      const scanSpy = (dataSource.scanItems = jest.fn(dataSource.scanItems));
      const querySpy = (dataSource.queryItems = jest.fn(dataSource.queryItems));
      dataSource.getItems(
        ChildEntityWithNonExistingIndex,
        {},
        (error: Error, data: any) => {
          expect(error).toBeDefined();
          expect(error).toBeInstanceOf(Error);
          expect(data).toBe(null);
          expect(scanSpy).toBeCalled();
          expect(querySpy).not.toBeCalled();
          done();
        },
      );
    });
    it("should get empty array because this not correct field1 value", (done) => {
      dataSource.getItems(
        ChildEntityWithRangeIndex,
        {
          data: {
            field1: "error",
          },
        },
        (err: Error, data: any) => {
          expect(err).toBe(null);
          expect(data).toBeInstanceOf(Object);
          expect(data).toHaveLength(0);
          done();
        },
      );
    });
  });

  describe("getItem", () => {
    it("should return null as data when trying to get a non-existing item", (done) => {
      dataSource.getItem(
        ParentEntity,
        {
          query: {
            id: "NONEXISTINGITEM",
          },
        },
        (err, data) => {
          expect(err).toBe(null);
          expect(data).toBe(null);
          done();
        },
      );
    });
    it("should fail when trying to get an item from a non-existing table", (done) => {
      dataSource.getItem(
        BrokenEntity,
        { query: { id: "test" } },
        (err, data) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(Error);
          done();
        },
      );
    });
    it("should fail when trying to get an item from a non-existing index", (done) => {
      dataSource.getItem(
        ChildEntityWithNonExistingIndex,
        { query: { id: "test" } },
        (err, data) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(Error);
          done();
        },
      );
    });
    it("should get an item from a table if only a hash key is present for a hash-only tables", (done) => {
      dataSource.getItem(
        ParentEntity,
        {
          query: {
            id: "TEST_PARENT",
          },
        },
        (err, data: any) => {
          expect(err).toBe(null);
          expect(data).toBeInstanceOf(Object);
          expect(data.id).toBe("TEST_PARENT");
          done();
        },
      );
    });
    it("should get an item from a table if both hash and range key are specified for a hash and range tables",
     (done) => {
      dataSource.getItem(
        ChildEntity,
        {
          query: {
            parent_id: "TEST_PARENT",
            id: "TEST_CHILD",
          },
        },
        (err, data: any) => {
          expect(err).toBe(null);
          expect(data).toBeInstanceOf(Object);
          expect(data.id).toBe("TEST_CHILD");
          done();
        },
      );
    });
    it("should get an item from the index if only a hash key is present for a hash-only indices", (done) => {
      dataSource.getItem(
        ChildEntityWithIndex,
        {
          query: {
            secondary_id: "TEST_CHILD_SEC",
          },
        },
        (err, data: any) => {
          expect(err).toBe(null);
          expect(data).toBeInstanceOf(Object);
          expect(data.id).toBe("TEST_CHILD");
          done();
        },
      );
    });
    it("should get an item from the index if hash, range and was specified", (done) => {
      dataSource.getItem(
        ChildEntityWithRangeIndex,
        {
          query: {
            parent_id: "TEST_PARENT",
            secondary_id: "TEST_CHILD_SEC",
          },
        },
        (err, data: any) => {
          expect(err).toBe(null);
          expect(data).toBeInstanceOf(Object);
          expect(data.id).toBe("TEST_CHILD");
          done();
        },
      );
    });
    it("should fail if no query params are present", (done) => {
      dataSource.getItem(
        ChildEntity,
        {
          query: {},
        },
        (err, data: any) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(Error);
          expect(data).toBe(null);
          done();
        },
      );
    });
    it("should get an item from the index if hash, range and field1 was specified", (done) => {
      dataSource.getItem(
        ChildEntityWithRangeIndex,
        {
          query: {
            parent_id: "TEST_PARENT",
            secondary_id: "TEST_CHILD_SEC",
          },
          data: {
            field1: "C",
          },
        },
        (err, data: any) => {
          expect(err).toBe(null);
          expect(data).toBeInstanceOf(Object);
          expect(data.id).toBe("TEST_CHILD");
          done();
        },
      );
    });
  });

  describe("addItem", () => {
    it("should add a new item", (done) => {
      dataSource.addItem(
        ChildEntity,
        {
          parent_id: "TEST_PARENT",
        },
        (err, data) => {
          expect(err).toBe(null);
          expect(data).toBeInstanceOf(Object);
          expect(data).toHaveProperty("parent_id", "TEST_PARENT");
          expect(data).toHaveProperty("id");
          done();
        },
      );
    });
    it("should generate range if hash is present", (done) => {
      dataSource.addItem(
        ChildEntity,
        {
          parent_id: "TEST_PARENT",
          test_field: 5,
        },
        (err, data) => {
          expect(err).toBe(null);
          expect(data).not.toBe(null);
          done();
        },
      );
    });

    it("should generate hash if there is no range", (done) => {
      dataSource.addItem(
        ParentEntity,
        {
          test_field: "abc",
        },
        (err, data) => {
          expect(err).toBe(null);
          expect(data).not.toBe(null);
          done();
        },
      );
    });
    it("should fail if table doesn't exist", (done) => {
      dataSource.addItem(
        BrokenEntity,
        {
          parent_id: "TEST_PARENT",
          id: "TEST_CHILD",
        },
        (err, data) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(Error);
          expect(data).toBe(null);
          done();
        },
      );
    });
  });

  describe("updateItem", () => {
    const randomValue = shortid.generate();
    it("should update item", (done) => {
      async.waterfall(
        [
          (next: IDckCallback) =>
            dataSource.getItem(
              ParentEntity,
              { query: { id: "TEST_PARENT" } },
              next,
            ),
          (data: any, next: IDckCallback) => {
            dataSource.updateItem(
              ParentEntity,
              { ...data, fieldUpdated: randomValue },
              { query: { ...data } },
              next,
            );
          },
          (data: any, next: IDckCallback) =>
            dataSource.getItem(
              ParentEntity,
              { query: { id: "TEST_PARENT" } },
              next,
            ),
          (data: any, next: IDckCallback) => {
            expect(data.id).toBe("TEST_PARENT");
            expect(data).toHaveProperty("fieldUpdated", randomValue);
            next(null);
          },
        ],
        done,
      );
    });
    it("should fail if item doesn't exist", (done) => {
      dataSource.updateItem(
        ParentEntity,
        { fieldUpdated: randomValue },
        { query: { id: "IDONTEXIST_REALLY" } },
        (err, data) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(Error);
          expect(data).toBe(null);
          done();
        },
      );
    });
    it("should fail if table doesn't exist", (done) => {
      dataSource.updateItem(
        BrokenEntity,
        { fieldUpdated: randomValue },
        { query: { id: "IDONTEXIST" } },
        (err, data) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(Error);
          done();
        },
      );
    });
  });

  describe("deleteItems", () => {
    it("should not fail when trying to delete a non-existing item", (done) => {
      done();
    });
    it("should fail when trying to delete an item from a non-existing table", (done) => {
      dataSource.deleteItems(
        BrokenEntity,
        { keys: [{ id: "TEST123" }] },
        (err, data) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(Error);
          done();
        },
      );
    });
    it("should delete items if hash key is specified for a hash only table", (done) => {
      done();
    });
    it("should delete items if hash key and range key is specified for hash  and range key table", (done) => {
      dataSource.deleteItems(
        ChildEntity,
        {
          keys: [
            {
              parent_id: "TEST_PARENT",
              id: "TEST_CHILD",
            },
          ],
        },
        (err, data) => {
          expect(err).toBe(null);
          expect(data).toBeInstanceOf(Array);
          done();
        },
      );
    });
    it("should fail if some of hash key are missing for hash only table", (done) => {
      dataSource.deleteItems(
        ParentEntity,
        { keys: [{ someStraneField: 1 }] },
        (err, data) => {
          expect(err).toBeInstanceOf(Error);
          expect(data).toBe(null);
          done();
        },
      );
    });
    it("should not fail on empty keys", (done) => {
      dataSource.deleteItems(ParentEntity, { keys: [] }, (err, data) => {
        expect(err).toBe(null);
        expect(data).toBeInstanceOf(Array);
        done();
      });
    });

    it("should fail on null keys", (done) => {
      dataSource.deleteItems(ParentEntity, { keys: null }, (err, data) => {
        expect(err).toBeDefined();
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
  });
});
