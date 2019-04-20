import { DckActionTypes } from "./types";

/**
 * Load items action.
 * @param itemType items type
 * @param filteringOptions items filtering options
 * @hidden
 */
export function itemsLoad(itemType: string, filteringOptions: any) {
  return {
    type: DckActionTypes.ITEMS_LOAD,
    itemType,
    filteringOptions
  };
}

/**
 * Add item action.
 * @param itemType item type
 * @param data item data
 * @hidden
 */
export function itemAdd(itemType: string, data: any) {
  return {
    type: DckActionTypes.ITEM_ADD,
    itemType,
    data
  };
}

/**
 * Save/Update item action.
 * @param itemType item type
 * @param id item id
 * @param data updated item data
 * @hidden
 */
export function itemSave(itemType: string, id: string | number, data: any) {
  return {
    type: DckActionTypes.ITEM_SAVE,
    itemType,
    id,
    data
  };
}

/**
 * Save/Update items action.
 * @param itemType item type
 * @param id item id
 * @param data updated item data
 * @hidden
 */
export function itemsSave(itemType: string, data: any) {
  return {
    type: DckActionTypes.ITEMS_SAVE,
    itemType,
    data
  };
}

/**
 * Reload item with given id action.
 * @param itemType item type
 * @param id item id
 * @hidden
 */
export function itemReload(itemType: string, id: string | number) {
  return {
    type: DckActionTypes.ITEM_RELOAD,
    itemType,
    id
  };
}

/**
 * Set item action.
 * @param itemType item type
 * @param id item id
 * @param data item data
 * @hidden
 */
export function itemSet(itemType: string, id: string | number, data: any) {
  return {
    type: DckActionTypes.ITEM_SET,
    itemType,
    id,
    data
  };
}

/**
 * Set items action.
 * @param itemType items type
 * @param data items
 * @hidden
 */
export function itemsSet(itemType: string, data: any) {
  return {
    type: DckActionTypes.ITEMS_SET,
    itemType,
    data
  };
}

/**
 * Set item data by field name action.
 * @param itemType item type
 * @param field item field
 * @param data item data
 * @hidden
 */
export function setItemData(itemType: string, field: string, data: any) {
  return {
    type: DckActionTypes.SET_ITEM_DATA,
    itemType,
    field,
    data
  };
}

/**
 * Make item active action with given id.
 * @param itemType item type
 * @param id item id
 * @hidden
 */
export function itemMakeActive(itemType: string, id: string | number) {
  return {
    type: DckActionTypes.ITEM_MAKE_ACTIVE,
    itemType,
    id
  };
}

/**
 * Select item with given id action.
 * @param itemType item type
 * @param id item id
 * @hidden
 */
export function itemSelect(itemType: string, id: string | number) {
  return {
    type: DckActionTypes.ITEM_SELECT,
    itemType,
    id
  };
}

/**
 * Remove item with given id action.
 * @param itemType item type
 * @param id item id
 * @hidden
 */
export function itemRemove(itemType: string, id: string | number) {
  return {
    type: DckActionTypes.ITEM_REMOVE,
    itemType,
    id
  };
}

/**
 * Remove items action.
 * @param itemType item type
 * @param ids remove items ids
 * @hidden
 */
export function itemsRemove(itemType: string, ids: string[] | number[]) {
  return {
    type: DckActionTypes.ITEMS_REMOVE,
    itemType,
    ids
  };
}

/**
 * Select items with given ids action.
 * @param itemType items type
 * @param ids items ids
 * @hidden
 */
export function itemsSelect(itemType: string, ids: string[] | number[]) {
  return {
    type: DckActionTypes.ITEMS_SELECT,
    itemType,
    ids
  };
}

/**
 * Set item search term action.
 * @param itemType item type
 * @param term item search term
 * @hidden
 */
export function setItemSearchTerm(itemType: string, term: string) {
  return {
    type: DckActionTypes.SET_ITEM_SEARCH_TERM,
    itemType,
    term
  };
}

/**
 * Add item search filter action.
 * @param itemType item type
 * @param filter filter name
 * @param value new filter value
 * @hidden
 */
export function addItemSearchFilter(itemType: string, filter: any, value: any) {
  return {
    type: DckActionTypes.ADD_ITEM_SEARCH_FILTER,
    itemType,
    filter,
    value
  };
}

/**
 * Remove item search filter action.
 * @param itemType item type
 * @param filter filter name
 * @hidden
 */
export function removeItemSearchFilter(itemType: string, filter: any) {
  return {
    type: DckActionTypes.REMOVE_ITEM_SEARCH_FILTER,
    itemType,
    filter
  };
}

/**
 * Set item search filters action.
 * @param itemType item type
 * @param filter filter name
 * @param values filter values
 * @hidden
 */
export function setItemSearchFilters(
  itemType: string,
  filter: any,
  values: any
) {
  return {
    type: DckActionTypes.SET_ITEM_SEARCH_FILTERS,
    itemType,
    filter,
    values
  };
}

/**
 * Clear item search filters action.
 * @param itemType item type
 * @hidden
 */
export function clearItemSearchFilters(itemType: string) {
  return {
    type: DckActionTypes.CLEAR_ITEM_SEARCH_FILTERS,
    itemType
  };
}

/**
 * Set item sorting options action.
 * @param itemType item type
 * @param sortingOptions sorting options
 * @hidden
 */
export function setItemSortingOptions(itemType: string, sortingOptions: any) {
  return {
    type: DckActionTypes.SET_ITEM_SORTING_OPTIONS,
    itemType,
    sortingOptions
  };
}

export function itemsImport(itemType: string, data: any) {
  return {
    type: DckActionTypes.ITEMS_IMPORT,
    itemType,
    data
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
