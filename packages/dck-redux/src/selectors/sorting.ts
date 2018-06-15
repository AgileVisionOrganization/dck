/**
 * Selects current search term
 * @param {object} state state
 * @returns {any[]} global sorting options
 * @hidden
 */
export const selectSortingOptions = (state: any) => state.dck.sorting.get("sortingOptions");
