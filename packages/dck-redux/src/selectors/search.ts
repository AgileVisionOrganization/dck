/**
 * Selects current search term
 * @param {object} state state
 * @returns {string} global search term
 * @hidden
 */
export const selectSearchTerm = (state: any) => state.dck.search.get("term");

/**
 * Selects current search filters.
 * @param {any} state current state
 * @returns {object} global search filters
 * @hidden
 */
export const selectSearchFilters = (state: any) => state.dck.search.get("filters").toJS();
