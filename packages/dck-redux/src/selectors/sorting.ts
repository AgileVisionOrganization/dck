export namespace DckSelectors {
  /**
   * Selects current search term
   * @param {object} state state
   * @returns {any[]} global sorting options
   */
  export const selectSortingOptions = (state: any) => state.dck.sorting.get("sortingOptions");
}

export default DckSelectors;
