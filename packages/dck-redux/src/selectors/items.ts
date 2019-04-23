import { createSelector } from "reselect";

/**
 * Select all items with given types.
 * @param {object} state state
 * @param {string[]} itemsType items type
 * @returns {object[]} all items with given type
 * @hidden
 */
export const selectAllItems = (state: any, itemsType: string[] | string) => {
  return state.dck.items.getIn([itemsType, "items"]).toJS();
};

/**
 * Selects active item id.
 * @param {object} state state
 * @param {string} itemType item type
 * @returns {string|number} given type active item id
 * @hidden
 */
export const selectActiveItemId = (state: any, itemType: string) => {
  return state.dck.items.getIn([itemType, "active"]);
};

/**
 * Selects active item.
 * @param {object} state state
 * @param {string} itemType item type
 * @returns {object} given type active item
 * @hidden
 */
export const selectActiveItem = createSelector(
  [selectActiveItemId, selectAllItems],
  (activeItemId: string | number, items: any) => {
    const filtered = items.filter((x: any) => {
      return x.id === activeItemId;
    });
    return filtered.length === 0 ? null : filtered[0];
  }
);

/**
 * Selects selected items ids.
 * @param {object} state state
 * @param {string} itemType item type
 * @returns {string[]|number[]} given type selected items ids
 * @hidden
 */
export const selectSelectedItemsId = (state: any, itemType: string) => {
  return state.dck.items.getIn([itemType, "selected"]);
};

/**
 * Selects selected items.
 * @param {object} state state
 * @param {string} itemType item type
 * @returns {object[]} given type selected items
 * @hidden
 */
export const selectSelectedItems = createSelector(
  [selectSelectedItemsId, selectAllItems],
  (selectedItemsId: any, items: any) => {
    const filtered = items.filter((x: any) => {
      return selectedItemsId.indexOf(x.id) > -1;
    });
    return filtered.length === 0 ? null : filtered;
  }
);

/**
 * Selects item by id.
 * @param {object} state state
 * @param {string} itemType item type
 * @param {string|number} itemId item id
 * @returns {object} item with given type and id
 * @hidden
 */
export const selectItemById = (state: any, itemType: string, itemId: string | number) => {
  const items = selectAllItems(state, itemType);

  const filtered = items.filter((x: any) => x.id === itemId);
  return filtered.length === 0 ? null : filtered[0];
};

/**
 * Get item data by field name
 * @param {object} state state
 * @param {string} itemType item type
 * @param {string} field field name
 * @returns {any} item data by field name
 * @hidden
 */
export const getItemData = (state: any, itemType: string, field: string) => {
  return state.dck.items.getIn([itemType, field]);
};

/**
 * Selects item current search term
 * @param {object} state state
 * @param {string} itemType item type
 * @returns {string} search term for given item type
 * @hidden
 */
export const selectItemSearchTerm = (state: any, itemType: string) => {
  return state.dck.items.getIn([itemType, "term"]);
};

/**
 * Selects item current search filters
 * @param {object} state state
 * @param {string} itemType item type
 * @returns {object} search filters for given item type
 * @hidden
 */
export const selectItemSearchFilters = (state: any, itemType: string) => {
  return state.dck.items.getIn([itemType, "filters"]).toJS();
};

/**
 * Selects item current sorting options
 * @param {object} state state
 * @param {string} itemType item type
 * @returns {any[]} sorting options for given item type
 * @hidden
 */
export const selectItemSortingOptions = (state: any, itemType: string) => {
  return state.dck.items.getIn([itemType, "sortingOptions"]).toJS();
};
