import { fromJS, Map, List } from "immutable";

import { DckActionTypes } from "../actions/types";
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
 * @hidden
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
      [DckActionTypes.ITEMS_LOAD](state: any) {
        return state;
      },
      [DckActionTypes.ITEMS_SET](state: any, action: any) {
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
      [DckActionTypes.ITEM_SET](state: any, action: any) {
        const previousActive = state.getIn([action.itemType, "active"]);
        const previousTerm = state.getIn([action.itemType, "term"]);
        const previousFilters = state.getIn([action.itemType, "filters"]);
        const previousSortingOptions = state.getIn([
          action.itemType,
          "sortingOptions"
        ]);
        const newItems =
          action.data && action.id
            ? state
                .getIn([action.itemType, "items"])
                .toJS()
                .filter((item: any) => item.id !== action.id)
                .concat([{ ...action.data, id: action.id }])
            : state.getIn([action.itemType, "items"]).toJS();
        return state.set(
          action.itemType,
          fromJS({
            items: newItems,
            selected: [],
            active: previousActive,
            term: previousTerm,
            filters: previousFilters,
            sortingOptions: previousSortingOptions
          })
        );
      },
      [DckActionTypes.SET_ITEM_DATA](state: any, action: any) {
        return state.setIn([action.itemType, action.field], action.data);
      },
      [DckActionTypes.ITEM_MAKE_ACTIVE](state: any, action: any) {
        return state.setIn([action.itemType, "active"], action.id);
      },
      [DckActionTypes.SET_ITEM_SEARCH_TERM](state: any, action: any) {
        return state.setIn([action.itemType, "term"], action.term);
      },
      [DckActionTypes.ADD_ITEM_SEARCH_FILTER](state: any, action: any) {
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
      [DckActionTypes.SET_ITEM_SEARCH_FILTERS](state: any, action: any) {
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
      [DckActionTypes.REMOVE_ITEM_SEARCH_FILTER](state: any, action: any) {
        return state.deleteIn(
          [action.itemType, "filters", action.filter],
          action.filter
        );
      },
      [DckActionTypes.CLEAR_ITEM_SEARCH_FILTERS](state: any, action: any) {
        return state.setIn([action.itemType, "filters"], Map());
      },
      [DckActionTypes.SET_ITEM_SORTING_OPTIONS](state: any, action: any) {
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
 * @hidden
 */
export const items = createReducer(initialState, {
  [DckActionTypes.ITEMS_LOAD](state: any) {
    return state;
  },
  [DckActionTypes.ITEMS_SET](state: any, action: any) {
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
  [DckActionTypes.SET_ITEM_DATA](state: any, action: any) {
    return state.setIn([action.itemType, action.field], action.data);
  },
  [DckActionTypes.ITEM_MAKE_ACTIVE](state: any, action: any) {
    return state.setIn([action.itemType, "active"], action.id);
  },
  [DckActionTypes.SET_ITEM_SEARCH_TERM](state: any, action: any) {
    return state.setIn([action.itemType, "term"], action.term);
  },
  [DckActionTypes.ADD_ITEM_SEARCH_FILTER](state: any, action: any) {
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
  [DckActionTypes.SET_ITEM_SEARCH_FILTERS](state: any, action: any) {
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
  [DckActionTypes.REMOVE_ITEM_SEARCH_FILTER](state: any, action: any) {
    return state.deleteIn(
      [action.itemType, "filters", action.filter],
      action.filter
    );
  },
  [DckActionTypes.CLEAR_ITEM_SEARCH_FILTERS](state: any, action: any) {
    return state.setIn([action.itemType, "filters"], Map());
  },
  [DckActionTypes.SET_ITEM_SORTING_OPTIONS](state: any, action: any) {
    return state.setIn(
      [action.itemType, "sortingOptions"],
      action.sortingOptions
    );
  }
});
