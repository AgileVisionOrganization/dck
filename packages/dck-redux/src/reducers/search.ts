import { fromJS, Map, List } from "immutable";

import * as types from "../actions/types";
import { createReducer } from "../utils";

const initialState = fromJS({
  term: "",
  filters: {}
});

export const search = createReducer(initialState, {
  [types.SET_SEARCH_TERM](state: any, action: any) {
    return state.set("term", action.term);
  },
  [types.ADD_SEARCH_FILTER](state: any, action: any) {
    return state.updateIn(["filters", action.filter], List(), (list: any) => {
      if (!list.includes(action.value)) {
        return list.push(action.value);
      } else {
        return list;
      }
    });
  },
  [types.SET_SEARCH_FILTERS](state: any, action: any) {
    const withoutDuplicates: any = [];

    if (action.values) {
      action.values.forEach((element: any) => {
        if (withoutDuplicates.indexOf(element) < 0) {
          withoutDuplicates.push(element);
        }
      });
    }

    return state.setIn(["filters", action.filter], List(withoutDuplicates));
  },
  [types.REMOVE_SEARCH_FILTER](state: any, action: any) {
    return state.deleteIn(["filters", action.filter]);
  },
  [types.CLEAR_SEARCH_FILTERS](state: any) {
    return state.set("filters", Map());
  }
});
