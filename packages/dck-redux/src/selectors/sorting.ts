/**
 * Selects current search term
 * @param {object} state state
 */
export const selectSortingOptions = (state: any) =>
  state.dck.sorting.get("sortingOptions");
