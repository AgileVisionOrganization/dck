/**
 * Selects current search term
 * @param {object} state state
 */
export const selectSearchTerm = (state: any) => state.dck.search.get("term");

export const selectSearchFilters = (state: any) =>
  state.dck.search.get("filters").toJS();
