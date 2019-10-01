import { fromJS, Map, List } from "immutable";

import { DckActionTypes } from "../actions/types";
import { createReducer } from "../utils";

const isObject = (obj: any): boolean =>
  Boolean(obj) && typeof obj === "object" && obj.constructor === Object;

const getItemsIds = (state: any, itemType: string) => {
  const itemsArray: any[] = Array.from(state.getIn([itemType, "items"]));
  return itemsArray.filter(isObject).map((item: any) => item.id);
}

const updateSelected = (selected: any, id: string | number, select: boolean) => {
  const selectedIndex = selected.findIndex((el: any) => String(el) === String(id));
  if (select) {
    return selectedIndex > -1 ? selected : selected.push(id);
  }
  return selectedIndex === -1 ? selected : selected.delete(selectedIndex);
};

const updateSelectedIds = (selected: any, ids: any[], select: boolean) => {
  let updated = selected;
  ids.forEach((id: any) => updated = updateSelected(updated, id, select)); 
  return updated;
};

const reducers = {
  [DckActionTypes.ITEMS_SET](state: any, action: any) {
    return state.setIn([action.itemType, "items"], Array.isArray(action.data) ? action.data : []);
  },
  [DckActionTypes.ITEM_SET](state: any, action: any) {
    const itemsArray: any[] = state.getIn([action.itemType, "items"]);
    const itemIndex = itemsArray.findIndex((item: any) => String(item.id) === String(action.id)); 
    if (itemIndex === -1) {
      return state;
    }
    itemsArray[itemIndex] = action.data;
    return state.setIn([action.itemType, "items"], itemsArray);
  },
  [DckActionTypes.ITEM_SELECT](state: any, action: any) {
    const selected = state.getIn([action.itemType, "selected"]);
    return state.setIn([action.itemType, "selected"], updateSelected(selected, action.id, true));
  },
  [DckActionTypes.ITEM_UNSELECT](state: any, action: any) {
    const selected = state.getIn([action.itemType, "selected"]);
    return state.setIn([action.itemType, "selected"], updateSelected(selected, action.id, false));
  },
  [DckActionTypes.ITEMS_SELECT](state: any, action: any) {
    const selected = state.getIn([action.itemType, "selected"]);
    return state.setIn([action.itemType, "selected"], updateSelectedIds(selected, action.ids, true));
  },
  [DckActionTypes.ITEMS_UNSELECT](state: any, action: any) {
    const selected = state.getIn([action.itemType, "selected"]);
    return state.setIn([action.itemType, "selected"], updateSelectedIds(selected, action.ids, false));
  },
  [DckActionTypes.ITEMS_SELECT_ALL](state: any, action: any) {
    const ids = getItemsIds(state, action.itemType);
    return state.setIn([action.itemType, "selected"], fromJS(ids));
  },
  [DckActionTypes.ITEMS_UNSELECT_ALL](state: any, action: any) {
    return state.setIn([action.itemType, "selected"], List());
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
      selected: [],
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
