import * as types from "./types";

export function setSortingOptions(sortingOptions: any) {
  return {
    type: types.SET_SORTING_OPTIONS,
    sortingOptions
  };
}
