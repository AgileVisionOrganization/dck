import { combineReducers } from "redux";

import * as accountReducer from "./account";
import { createProcessesReducer } from "./processes";
import { createItemsReducer } from "./items";
import * as searchReducer from "./search";
import * as sortingReducer from "./sorting";

export function createDckReducer(
  itemTypes: string[],
  processTypes: string[]
): any {
  return combineReducers({
    ...accountReducer,
    ...createProcessesReducer(processTypes),
    ...createItemsReducer(itemTypes),
    ...searchReducer,
    ...sortingReducer
  });
}
