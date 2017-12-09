import { Callback } from "aws-lambda";

export type IDckCallback = Callback;
export type FieldsMap = { [key: string]: string };

export interface IDbEntity {
  getDatabaseTableName: () => string;
  getHashKey: () => string;
  getRangeKey: () => string;
  getIndex: () => string;
}

export interface IGetMulitpleOptions {
  keys: any[];
}

export interface IQueryOptions {
  page?: number;
  limit?: number;
  query?: any;
  data?: any;
}

export interface IDeleteOptions {
  keys: any[];
}

export interface IDckDataSource {
  getItems(
    itemType: IDbEntity,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ): void;

  getItem(
    itemType: IDbEntity,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ): void;

  getMultipleItems(
    itemType: IDbEntity,
    queryOptions: IGetMulitpleOptions,
    callback: IDckCallback,
  ): void;

  addItem(itemType: IDbEntity, data: any, callback: IDckCallback): void;

  updateItem(
    itemType: IDbEntity,
    data: any,
    queryOptions: IQueryOptions,
    callback: IDckCallback,
  ): void;

  deleteItems(
    itemType: IDbEntity,
    options: IDeleteOptions,
    callback: IDckCallback,
  ): void;
}
