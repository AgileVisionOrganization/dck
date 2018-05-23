import * as types from "./types";

/**
 * Load items action.
 * @param itemType items type
 * @param filteringOptions items filtering options
 */
export function itemsLoad(itemType: string, filteringOptions: any) {
  return {
    type: types.ITEMS_LOAD,
    itemType,
    filteringOptions
  };
}

/**
 * Add item action.
 * @param itemType item type
 * @param data item data
 */
export function itemAdd(itemType: string, data: any) {
  return {
    type: types.ITEM_ADD,
    itemType,
    data
  };
}

/**
 * Save/Update item action.
 * @param itemType item type
 * @param id item id
 * @param data updated item data
 */
export function itemSave(itemType: string, id: string | number, data: any) {
  return {
    type: types.ITEM_SAVE,
    itemType,
    id,
    data
  };
}

/**
 * Reload item with given id action.
 * @param itemType item type
 * @param id item id
 */
export function itemReload(itemType: string, id: string | number) {
  return {
    type: types.ITEM_RELOAD,
    itemType,
    id
  };
}

/**
 * Set item action.
 * @param itemType item type
 * @param id item id
 * @param data item data
 */
export function itemSet(itemType: string, id: string | number, data: any) {
  return {
    type: types.ITEM_SET,
    itemType,
    id,
    data
  };
}

/**
 * Set items action.
 * @param itemType items type
 * @param data items
 */
export function itemsSet(itemType: string, data: any) {
  return {
    type: types.ITEMS_SET,
    itemType,
    data
  };
}

/**
 * Make item active action with given id.
 * @param itemType item type
 * @param id item id
 */
export function itemMakeActive(itemType: string, id: string | number) {
  return {
    type: types.ITEM_MAKE_ACTIVE,
    itemType,
    id
  };
}

/**
 * Select item with given id action.
 * @param itemType item type
 * @param id item id
 */
export function itemSelect(itemType: string, id: string | number) {
  return {
    type: types.ITEM_SELECT,
    itemType,
    id
  };
}

/**
 * Remove item with given id action.
 * @param itemType item type
 * @param id item id
 */
export function itemRemove(itemType: string, id: string | number) {
  return {
    type: types.ITEM_REMOVE,
    itemType,
    id
  };
}

/**
 * Remove items action.
 * @param itemType item type
 * @param ids remove items ids
 */
export function itemsRemove(itemType: string, ids: string[] | number[]) {
  return {
    type: types.ITEMS_REMOVE,
    itemType,
    ids
  };
}

/**
 * Select items with given ids action.
 * @param itemType items type
 * @param ids items ids
 */
export function itemsSelect(itemType: string, ids: string[] | number[]) {
  return {
    type: types.ITEMS_SELECT,
    itemType,
    ids
  };
}

/**
 * Set item search term action.
 * @param itemType item type
 * @param term item search term
 */
export function setItemSearchTerm(itemType: string, term: string) {
  return {
    type: types.SET_ITEM_SEARCH_TERM,
    itemType,
    term
  };
}

/**
 * Add item search filter action.
 * @param itemType item type
 * @param filter filter name
 * @param value new filter value
 */
export function addItemSearchFilter(itemType: string, filter: any, value: any) {
  return {
    type: types.ADD_ITEM_SEARCH_FILTER,
    itemType,
    filter,
    value
  };
}

/**
 * Remove item search filter action.
 * @param itemType item type
 * @param filter filter name
 */
export function removeItemSearchFilter(itemType: string, filter: any) {
  return {
    type: types.REMOVE_ITEM_SEARCH_FILTER,
    itemType,
    filter
  };
}

/**
 * Set item search filters action.
 * @param itemType item type
 * @param filter filter name
 * @param values filter values
 */
export function setItemSearchFilters(
  itemType: string,
  filter: any,
  values: any
) {
  return {
    type: types.SET_ITEM_SEARCH_FILTERS,
    itemType,
    filter,
    values
  };
}

/**
 * Clear item search filters action.
 * @param itemType item type
 */
export function clearItemSearchFilters(itemType: string) {
  return {
    type: types.CLEAR_ITEM_SEARCH_FILTERS,
    itemType
  };
}

/**
 * Set item sorting options action.
 * @param itemType item type
 * @param sortingOptions sorting options
 */
export function setItemSortingOptions(itemType: string, sortingOptions: any) {
  return {
    type: types.SET_ITEM_SORTING_OPTIONS,
    itemType,
    sortingOptions
  };
}

/**
 * Standard action flow for items
 * 
 * User action => ITEMS_LOAD => ... async call ... => ITEMS_SET
 * User action => ITEM_ADD => ...async call ... => ITEMS_LOAD
 * User action => ITEM_SAVE => ...async call... => ITEM_RELOAD
 * User action => ITEM_REMOVE => ...async call... => ITEMS_SET
 */
