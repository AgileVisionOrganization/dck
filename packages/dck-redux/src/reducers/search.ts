import { fromJS, Map, List } from "immutable";

import DckActionTypes from "../actions/types";
import { createReducer } from "../utils";

/**
 * Search reducer initial state.
 */
const initialState = fromJS({
  term: "",
  filters: {}
});

/**
 * Search reducer.
 * Global search filters can be used to filters value in some generic search field.
 * @hidden
 */
export const search = createReducer(initialState, {
  [DckActionTypes.SET_SEARCH_TERM](state: any, action: any) {
    return state.set("term", action.term);
  },
  [DckActionTypes.ADD_SEARCH_FILTER](state: any, action: any) {
    return state.updateIn(["filters", action.filter], List(), (list: any) => {
      if (!list.includes(action.value)) {
        return list.push(action.value);
      } else {
        return list;
      }
    });
  },
  [DckActionTypes.SET_SEARCH_FILTERS](state: any, action: any) {
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
  [DckActionTypes.REMOVE_SEARCH_FILTER](state: any, action: any) {
    return state.deleteIn(["filters", action.filter]);
  },
  [DckActionTypes.CLEAR_SEARCH_FILTERS](state: any) {
    return state.set("filters", Map());
  }
});
