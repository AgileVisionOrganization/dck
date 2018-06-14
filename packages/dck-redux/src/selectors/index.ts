import * as AccountSelectors from "./account";
import * as ProcessesSelectors from "./processes";
import * as SearchSelectors from "./search";
import * as SortingSelectors from "./sorting";
import * as ItemsSelectors from "./items";

export class DckSelectors {
  /*********************Account Selectors***********************/
  /**
   * Selects Cognito ID token from the state
   * @param {object} state state
   * @returns current user session data
   */
  public static selectSessionData(state: any) {
    return AccountSelectors.selectSessionData(state);
  }

  /*********************Items Selectors***********************/
  /**
   * Select all items with given types.
   * @param {object} state state
   * @param {string[]} itemsType items type
   * @returns {object[]} all items with given type
   */
  public static selectAllItems(state: any, itemsType: string[] | string) {
    return ItemsSelectors.selectAllItems(state, itemsType);
  }

  /**
   * Selects active item id.
   * @param {object} state state
   * @param {string} itemType item type
   * @returns {string|number} given type active item id
   */
  public static selectActiveItemId(state: any, itemType: string) {
    return ItemsSelectors.selectActiveItemId(state, itemType);
  }

  /**
   * Selects active item.
   * @param {object} state state
   * @param {string} itemType item type
   * @returns {object} given type active item
   */
  public static selectActiveItem(state: any, itemsType: string) {
    return ItemsSelectors.selectActiveItem(state, itemsType);
  }

  /**
   * Selects selected items ids.
   * @param {object} state state
   * @param {string} itemType item type
   * @returns {string[]|number[]} given type selected items ids
   */
  public static selectSelectedItemsId(state: any, itemType: string) {
    return ItemsSelectors.selectSelectedItemsId(state, itemType);
  }

  /**
   * Selects selected items.
   * @param {object} state state
   * @param {string} itemType item type
   * @returns {object[]} given type selected items
   */
  public static selectSelectedItems(state: any, itemType: string) {
    return ItemsSelectors.selectSelectedItems(state, itemType);
  }

  /**
   * Selects item by id.
   * @param {object} state state
   * @param {string} itemType item type
   * @param {string|number} itemId item id
   * @returns {object} item with given type and id
   */
  public static selectItemById(state: any, itemType: string, itemId: string | number) {
    return ItemsSelectors.selectItemById(state, itemType, itemId);
  }

  /**
   * Selects item current search term
   * @param {object} state state
   * @param {string} itemType item type
   * @returns {string} search term for given item type
   */
  public static selectItemSearchTerm(state: any, itemType: string) {
    return ItemsSelectors.selectItemSearchTerm(state, itemType);
  }

  /**
   * Selects item current search filters
   * @param {object} state state
   * @param {string} itemType item type
   * @returns {object} search filters for given item type
   */
  public static selectItemSearchFilters(state: any, itemType: string) {
    return ItemsSelectors.selectItemSearchFilters(state, itemType);
  }

  /**
   * Selects item current sorting options
   * @param {object} state state
   * @param {string} itemType item type
   * @returns {any[]} sorting options for given item type
   */
  public static selectItemSortingOptions(state: any, itemType: string) {
    return ItemsSelectors.selectItemSortingOptions(state, itemType);
  }

  /*********************Processes Selectors***********************/
  /**
   * Selects a process with specified code
   * @param {object} state state
   * @param {string} processCode process code
   * @returns {any} process with given process code
   */
  public static selectProcess(state: any, processCode: string) {
    return ProcessesSelectors.selectProcess(state, processCode);
  }

  /**
   * Selects process running flag by it's code
   * @param {object} state state
   * @param {string} processCode process code
   * @returns {boolean} process with given code running flag
   */
  public static selectProcessRunning(state: any, processCode: string) {
    return ProcessesSelectors.selectProcessRunning(state, processCode);
  }

  /**
   * Selects process failed flag by it's code
   * @param {object} state state
   * @param {string} processCode process code
   * @returns {boolean} process with given code failed flag
   */
  public static selectProcessFailed(state: any, processCode: string) {
    return ProcessesSelectors.selectProcessFailed(state, processCode);
  }

  /**
   * Selects process success.
   * @param {object} state state
   * @param {string} processCode process code
   * @returns {boolean} process with given code success flag
   */
  public static selectProcessSuccess(state: any, processCode: string) {
    return ProcessesSelectors.selectProcessSuccess(state, processCode);
  }

  /*********************Search Selectors***********************/
  /**
   * Selects current search term
   * @param {object} state state
   * @returns {string} global search term
   */
  public static selectSearchTerm(state: any) {
    return SearchSelectors.selectSearchTerm(state);
  }

  /**
   * Selects current search filters.
   * @param {any} state current state
   * @returns {object} global search filters
   */
  public static selectSearchFilters(state: any) {
    return SearchSelectors.selectSearchFilters(state);
  }

  /*********************Sorting Selectors***********************/
  /**
   * Selects current search term
   * @param {object} state state
   * @returns {any[]} global sorting options
   */
  public static selectSortingOptions(state: any) {
    return SortingSelectors.selectSortingOptions(state);
  }
}
