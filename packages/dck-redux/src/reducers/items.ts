import { fromJS, Map, List } from "immutable";

import { DckActionTypes } from "../actions/types";
import { createReducer } from "../utils";

const getItemsIds = (state: any, itemType: string) => {
  return state.getIn([itemType, "items"]).map((item: any) => item.id);
}

const updateStateSelected = (state: any, itemType: string, ids: string[] | number[], select: boolean) => {
  let selected = state.getIn([itemType, "selected"]);
  const updateSelected = (id: string) => select ? selected.set(id, true) : selected.delete(id) 
  (ids || []).forEach((id: any) => selected = updateSelected(String(id)));
  return state.setIn([itemType, "selected"], selected);
}

const reducers = {
  [DckActionTypes.ITEMS_SET](state: any, action: any) {
    const items = Array.isArray(action.data) ? action.data : [];
    return state.setIn([action.itemType, "items"], items);
  },
  [DckActionTypes.ITEM_SET](state: any, action: any) {
    const thisItem = (item: any) => Number(item.id) === Number(action.id);
    const itemIndex = state.getIn([action.itemType, "items"]).findIndex(thisItem); 
    if (itemIndex === -1) return state;
    return state.setIn([action.itemType, "items", itemIndex], action.data);
  },
  [DckActionTypes.ITEM_SELECT](state: any, action: any) {
    return state.setIn([action.itemType, "selected", String(action.id)], true);
  },
  [DckActionTypes.ITEM_UNSELECT](state: any, action: any) {
    return state.deleteIn([action.itemType, "selected", String(action.id)]);
  },
  [DckActionTypes.ITEMS_SELECT](state: any, action: any) {
    return updateStateSelected(state, action.itemType, action.ids, true);
  },
  [DckActionTypes.ITEMS_UNSELECT](state: any, action: any) {
    return updateStateSelected(state, action.itemType, action.ids, false);
  },
  [DckActionTypes.ITEMS_SELECT_ALL](state: any, action: any) {
    const ids = getItemsIds(state, action.itemType);
    return updateStateSelected(state, action.itemType, ids, true);
  },
  [DckActionTypes.ITEMS_UNSELECT_ALL](state: any, action: any) {
    return state.setIn([action.itemType, "selected"], Map());
  },
  [DckActionTypes.SET_ITEM_DATA](state: any, action: any) {
    return state.setIn([action.itemType, "data", action.field], action.data);
  },
  [DckActionTypes.ITEM_MAKE_ACTIVE](state: any, action: any) {
    return state.setIn([action.itemType, "active"], action.id);
  },
  [DckActionTypes.SET_ITEM_SEARCH_TERM](state: any, action: any) {
    return state.setIn([action.itemType, "term"], action.term);
  },
  [DckActionTypes.ADD_ITEM_SEARCH_FILTER](state: any, action: any) {
    return state.updateIn([action.itemType, "filters", action.filter], List(), (list: any) => {
      if (!list.includes(action.value)) {
        return list.push(action.value);
      } else {
        return list;
      }
    });
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
    return state.setIn([action.itemType, "filters", action.filter], List(withoutDuplicates));
  },
  [DckActionTypes.REMOVE_ITEM_SEARCH_FILTER](state: any, action: any) {
    return state.deleteIn([action.itemType, "filters", action.filter], action.filter);
  },
  [DckActionTypes.CLEAR_ITEM_SEARCH_FILTERS](state: any, action: any) {
    return state.setIn([action.itemType, "filters"], Map());
  },
  [DckActionTypes.SET_ITEM_SORTING_OPTIONS](state: any, action: any) {
    return state.setIn([action.itemType, "sortingOptions"], action.sortingOptions);
  }
};

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
 *   term: "",
 *   data: {},
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
      selected: {},
      active: null,
      term: "",
      data: {},
      filters: {},
      sortingOptions: []
    };
  });

  initialState = fromJS(initialItemStates);

  return {
    items: createReducer(initialState, reducers)
  };
};

/**
 * Items reducer for tests.
 * @hidden
 */
export const items = createReducer(initialState, reducers);
