import { Callback } from "aws-lambda";

/**
 * Lambda callback.
 */
export type IDckCallback = Callback;

/**
 * Fields map.
 */
export type FieldsMap = { [key: string]: string };

/**
 * Database entity interface.
 */
export interface IDbEntity {
  getDatabaseTableName: () => string;
  getHashKey: () => string;
  getRangeKey: () => string;
  getIndex: () => string;
}

/**
 * Get multiple options request body.
 */
export interface IGetMulitpleOptions {
  keys: any[];
}

/**
 * Query options structure.
 */
export interface IQueryOptions {
  page?: number;
  limit?: number;
  query?: any;
  data?: any;
  comparisonOperators?: any;
  descending?: boolean;
}

/**
 * Delete items options format.
 */
export interface IDeleteOptions {
  keys: any[];
}

/**
 * Dck data source.
 */
export interface IDckDataSource {
  /**
   * Get items with query options.
   * @param itemType item database entity
   * @param queryOptions query options
   * @param callback function callback
   */
  getItems(
    itemType: IDbEntity,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ): void;

  /**
   * Get item by query options.
   * @param itemType item database entity
   * @param queryOptions query options
   * @param callback function callback
   */
  getItem(
    itemType: IDbEntity,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ): void;

  /**
   * Get items by several condition
   * @param itemType item database entity
   * @param queryOptions several query options
   * @param callback function callback
   */
  getMultipleItems(
    itemType: IDbEntity,
    queryOptions: IGetMulitpleOptions,
    callback: IDckCallback,
  ): void;

  /**
   * Add item to database
   * @param itemType item database entity
   * @param data item data
   * @param callback function callback
   */
  addItem(itemType: IDbEntity, data: any, callback: IDckCallback): void;

  /**
   * Update item in database
   * @param itemType item database entity
   * @param data item new data
   * @param queryOptions item keys
   * @param callback function callback
   */
  updateItem(
    itemType: IDbEntity,
    data: any,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ): void;

  /**
   * Delete items.
   * @param itemType item database entity
   * @param options items condition
   * @param callback function callback
   */
  deleteItems(
    itemType: IDbEntity,
    options: IDeleteOptions,
    callback: IDckCallback,
  ): void;
}

/**
 * Dck cognito data source.
 */
export interface IDckCognitoDataSource {
  /**
   * Get items with query options.
   * @param itemType item database entity
   * @param queryOptions query options
   * @param loadUsersGroups load user groups flag.
   *  if set true- users will be returned with their groups in "groups" field
   * @param callback function callback
   */
  getItems(
    itemType: IDbEntity,
    queryOptions: IQueryOptions,
    loadUsersGroups: boolean,
    callback: IDckCallback,
  ): void;

  /**
   * Get item by query options.
   * @param itemType item database entity
   * @param queryOptions query options
   * @param loadUserGroups load user groups flag.
   *  if set true- user will be returned with it groups in "groups" field
   * @param callback function callback
   */
  getItem(
    itemType: IDbEntity,
    queryOptions: IQueryOptions,
    loadUserGroups: boolean,
    callback: IDckCallback,
  ): void;

  /**
   * Get items by several condition
   * @param itemType item database entity
   * @param queryOptions several query options
   * @param callback function callback
   */
  getMultipleItems(
    itemType: IDbEntity,
    queryOptions: IGetMulitpleOptions,
    callback: IDckCallback,
  ): void;

  /**
   * Add item to database
   * @param itemType item database entity
   * @param data item data
   * @param callback function callback
   */
  addItem(itemType: IDbEntity, data: any, callback: IDckCallback): void;

  /**
   * Update item in database
   * @param itemType item database entity
   * @param data item new data
   * @param queryOptions item keys
   * @param callback function callback
   */
  updateItem(
    itemType: IDbEntity,
    data: any,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ): void;

  /**
   * Delete items.
   * @param itemType item database entity
   * @param options items condition
   * @param callback function callback
   */
  deleteItems(
    itemType: IDbEntity,
    options: IDeleteOptions,
    callback: IDckCallback,
  ): void;
}
