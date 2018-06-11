import DckActionTypes from "./types";

export namespace DckActionCreators {
  /**
   * Set global sorting options.
   * @param sortingOptions sorting options
   */
  export function setSortingOptions(sortingOptions: any) {
    return {
      type: DckActionTypes.SET_SORTING_OPTIONS,
      sortingOptions
    };
  }
}

export default DckActionCreators;
