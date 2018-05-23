import { fromJS, Map, List } from "immutable";

import * as types from "../actions/types";
import { createReducer } from "../utils";

/**
 * Items reducer initial state.
 */
let initialState = {};

/**
 * Create items reducer.
 * These reducers manage items data.
 * For all items types, it creates the record in the state with next content:
 * ItemType: {
 *   items: [],
 *   selected: [],
 *   active: null,
 *   term: '',
 *   filters: {},
 *   sortingOptions: []
 * }
 * @param itemTypes all items types in system
 */
export const createItemsReducer = (itemTypes: string[]) => {
  let initialItemStates: any;
  initialItemStates = {};
  const availableItemTypes = Object.keys(itemTypes);

  availableItemTypes.forEach(element => {
    initialItemStates[element] = {
      items: [],
      selected: [],
      active: null,
      term: "",
      filters: {},
      sortingOptions: []
    };
  });

  initialState = fromJS(initialItemStates);

  return {
    items: createReducer(initialState, {
      [types.ITEMS_LOAD](state: any) {
        return state;
      },
      [types.ITEMS_SET](state: any, action: any) {
        const previousActive = state.getIn([action.itemType, "active"]);
        const previousTerm = state.getIn([action.itemType, "term"]);
        const previousFilters = state.getIn([action.itemType, "filters"]);
        const previousSortingOptions = state.getIn([
          action.itemType,
          "sortingOptions"
        ]);
        return state.set(
          action.itemType,
          fromJS({
            items: action.data,
            selected: [],
            active: previousActive,
            term: previousTerm,
            filters: previousFilters,
            sortingOptions: previousSortingOptions
          })
        );
      },
      [types.ITEM_MAKE_ACTIVE](state: any, action: any) {
        return state.setIn([action.itemType, "active"], action.id);
      },
      [types.SET_ITEM_SEARCH_TERM](state: any, action: any) {
        return state.setIn([action.itemType, "term"], action.term);
      },
      [types.ADD_ITEM_SEARCH_FILTER](state: any, action: any) {
        return state.updateIn(
          [action.itemType, "filters", action.filter],
          List(),
          (list: any) => {
            if (!list.includes(action.value)) {
              return list.push(action.value);
            } else {
              return list;
            }
          }
        );
      },
      [types.SET_ITEM_SEARCH_FILTERS](state: any, action: any) {
        const withoutDuplicates: any = [];

        if (action.values) {
          action.values.forEach((element: any) => {
            if (withoutDuplicates.indexOf(element) < 0) {
              withoutDuplicates.push(element);
            }
          });
        }
        return state.setIn(
          [action.itemType, "filters", action.filter],
          List(withoutDuplicates)
        );
      },
      [types.REMOVE_ITEM_SEARCH_FILTER](state: any, action: any) {
        return state.deleteIn(
          [action.itemType, "filters", action.filter],
          action.filter
        );
      },
      [types.CLEAR_ITEM_SEARCH_FILTERS](state: any, action: any) {
        return state.setIn([action.itemType, "filters"], Map());
      },
      [types.SET_ITEM_SORTING_OPTIONS](state: any, action: any) {
        return state.setIn(
          [action.itemType, "sortingOptions"],
          action.sortingOptions
        );
      }
    })
  };
};

/**
 * Items reducer for tests.
 */
export const items = createReducer(initialState, {
  [types.ITEMS_LOAD](state: any) {
    return state;
  },
  [types.ITEMS_SET](state: any, action: any) {
    const previousActive = state.getIn([action.itemType, "active"]);
    const previousTerm = state.getIn([action.itemType, "term"]);
    const previousFilters = state.getIn([action.itemType, "filters"]);
    const previousSortingOptions = state.getIn([
      action.itemType,
      "sortingOptions"
    ]);
    return state.set(
      action.itemType,
      fromJS({
        items: action.data,
        selected: [],
        active: previousActive,
        term: previousTerm,
        filters: previousFilters,
        sortingOptions: previousSortingOptions
      })
    );
  },
  [types.ITEM_MAKE_ACTIVE](state: any, action: any) {
    return state.setIn([action.itemType, "active"], action.id);
  },
  [types.SET_ITEM_SEARCH_TERM](state: any, action: any) {
    return state.setIn([action.itemType, "term"], action.term);
  },
  [types.ADD_ITEM_SEARCH_FILTER](state: any, action: any) {
    return state.updateIn(
      [action.itemType, "filters", action.filter],
      List(),
      (list: any) => {
        if (!list.includes(action.value)) {
          return list.push(action.value);
        } else {
          return list;
        }
      }
    );
  },
  [types.SET_ITEM_SEARCH_FILTERS](state: any, action: any) {
    const withoutDuplicates: any = [];

    if (action.values) {
      action.values.forEach((element: any) => {
        if (withoutDuplicates.indexOf(element) < 0) {
          withoutDuplicates.push(element);
        }
      });
    }
    return state.setIn(
      [action.itemType, "filters", action.filter],
      List(withoutDuplicates)
    );
  },
  [types.REMOVE_ITEM_SEARCH_FILTER](state: any, action: any) {
    return state.deleteIn(
      [action.itemType, "filters", action.filter],
      action.filter
    );
  },
  [types.CLEAR_ITEM_SEARCH_FILTERS](state: any, action: any) {
    return state.setIn([action.itemType, "filters"], Map());
  },
  [types.SET_ITEM_SORTING_OPTIONS](state: any, action: any) {
    return state.setIn(
      [action.itemType, "sortingOptions"],
      action.sortingOptions
    );
  }
});
