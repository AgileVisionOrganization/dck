import { DckActionTypes } from "./types";

/**
 * Set global sorting options.
 * @param sortingOptions sorting options
 * @hidden
 */
export function setSortingOptions(sortingOptions: any) {
  return {
    type: DckActionTypes.SET_SORTING_OPTIONS,
    sortingOptions
  };
}
