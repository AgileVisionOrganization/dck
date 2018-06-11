export namespace DckSelectors {
  /**
   * Selects current search term
   * @param {object} state state
   * @returns {string} global search term
   */
  export const selectSearchTerm = (state: any) => state.dck.search.get("term");

  /**
   * Selects current search filters.
   * @param {any} state current state
   * @returns {object} global search filters
   */
  export const selectSearchFilters = (state: any) => state.dck.search.get("filters").toJS();
}

export default DckSelectors;
