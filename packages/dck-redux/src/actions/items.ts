import * as types from "./types";

export function itemsLoad(itemType: string, filteringOptions: any) {
  return {
    type: types.ITEMS_LOAD,
    itemType,
    filteringOptions
  };
}

export function itemAdd(itemType: string, data: any) {
  return {
    type: types.ITEM_ADD,
    itemType,
    data
  };
}

export function itemSave(itemType: string, id: string | number, data: any) {
  return {
    type: types.ITEM_SAVE,
    itemType,
    id,
    data
  };
}

export function itemReload(itemType: string, id: string | number) {
  return {
    type: types.ITEM_RELOAD,
    itemType,
    id
  };
}

export function itemSet(itemType: string, id: string | number, data: any) {
  return {
    type: types.ITEM_SET,
    itemType,
    id,
    data
  };
}

export function itemsSet(itemType: string, data: any) {
  return {
    type: types.ITEMS_SET,
    itemType,
    data
  };
}

export function itemMakeActive(itemType: string, id: string | number) {
  return {
    type: types.ITEM_MAKE_ACTIVE,
    itemType,
    id
  };
}

export function itemSelect(itemType: string, id: string | number) {
  return {
    type: types.ITEMS_SELECT,
    id
  };
}

export function itemRemove(itemType: string, id: string | number) {
  return {
    type: types.ITEM_REMOVE,
    itemType,
    id
  };
}

export function itemsRemove(itemType: string, ids: string[] | number[]) {
  return {
    type: types.ITEMS_REMOVE,
    itemType,
    ids
  };
}

export function itemsSelect(itemType: string, ids: string[] | number[]) {
  return {
    type: types.ITEMS_SELECT,
    ids
  };
}

export function setItemSearchTerm(itemType: string, term: string) {
  return {
    type: types.SET_ITEM_SEARCH_TERM,
    itemType,
    term
  };
}

export function addItemSearchFilter(itemType: string, filter: any, value: any) {
  return {
    type: types.ADD_ITEM_SEARCH_FILTER,
    itemType,
    filter,
    value
  };
}

export function removeItemSearchFilter(itemType: string, filter: any) {
  return {
    type: types.REMOVE_ITEM_SEARCH_FILTER,
    itemType,
    filter
  };
}

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

export function clearItemSearchFilters(itemType: string) {
  return {
    type: types.CLEAR_ITEM_SEARCH_FILTERS,
    itemType
  };
}

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
