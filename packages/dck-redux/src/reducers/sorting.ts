import { fromJS } from "immutable";

import * as types from "../actions/types";
import { createReducer } from "../utils";

const initialState = fromJS({
  sortingOptions: []
});

export const sorting = createReducer(initialState, {
  [types.SET_SORTING_OPTIONS](state: any, action: any) {
    return state.set("sortingOptions", action.sortingOptions);
  }
});
