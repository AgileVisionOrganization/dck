import * as types from "./types";

/**
 * Set global search term action.
 * @param term search term
 */
export function setSearchTerm(term: string) {
  return {
    type: types.SET_SEARCH_TERM,
    term
  };
}

/**
 * Add global search filter action.
 * @param filter filter name
 * @param value filter value
 */
export function addSearchFilter(filter: string, value: string) {
  return {
    type: types.ADD_SEARCH_FILTER,
    filter,
    value
  };
}

/**
 * Remove global search filters action.
 * @param filter filter name
 */
export function removeSearchFilter(filter: string) {
  return {
    type: types.REMOVE_SEARCH_FILTER,
    filter
  };
}

/**
 * Set global search filters action.
 * @param filter filter name
 * @param values filter values
 */
export function setSearchFilters(filter: string, values: string[]) {
  return {
    type: types.SET_SEARCH_FILTERS,
    filter,
    values
  };
}

/**
 * Clear global searh filters.
 */
export function clearSearchFilters() {
  return {
    type: types.CLEAR_SEARCH_FILTERS
  };
}
