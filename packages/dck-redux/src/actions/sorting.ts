import * as types from "./types";

/**
 * Set global sorting options.
 * @param sortingOptions sorting options
 */
export function setSortingOptions(sortingOptions: any) {
  return {
    type: types.SET_SORTING_OPTIONS,
    sortingOptions
  };
}
