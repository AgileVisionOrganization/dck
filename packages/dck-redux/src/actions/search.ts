import * as types from "./types";

export function setSearchTerm(term: string) {
  return {
    type: types.SET_SEARCH_TERM,
    term
  };
}

export function addSearchFilter(filter: string, value: string) {
  return {
    type: types.ADD_SEARCH_FILTER,
    filter,
    value
  };
}

export function removeSearchFilter(filter: string) {
  return {
    type: types.REMOVE_SEARCH_FILTER,
    filter
  };
}

export function setSearchFilters(filter: string, values: string[]) {
  return {
    type: types.SET_SEARCH_FILTERS,
    filter,
    values
  };
}

export function clearSearchFilters() {
  return {
    type: types.CLEAR_SEARCH_FILTERS
  };
}
