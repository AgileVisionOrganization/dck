import * as ProcessActionCreators from "./processes";
import * as SearchActionCreators from "./search";
import * as AccountActionCreators from "./account";
import * as ItemsActionCreators from "./items";
import * as SortingActionCreators from "./sorting";
import { SignUpWithPasswordCredentials } from "./types";

/**
 * Action creators.
 */
export class DckActionCreators {
  /*********************Process Actions***********************/
  /**
   * Async process start action.
   * @param processCode process code/name
   */
  public static asyncProcessStart(processCode: string) {
    return ProcessActionCreators.asyncProcessStart(processCode);
  }

  /**
   * Async process stop action.
   * @param processCode process code/name
   * @param result proces result
   */
  public static asyncProcessStop(processCode: string, result: any) {
    return ProcessActionCreators.asyncProcessStop(processCode, result);
  }

  /**
   * Reset async process action.
   * @param processCode process code
   */
  public static asyncProcessReset(processCode: string) {
    return ProcessActionCreators.asyncProcessReset(processCode);
  }

  /*********************Search Actions***********************/
  /**
   * Set global search term action.
   * @param term search term
   */
  public static setSearchTerm(term: string) {
    return SearchActionCreators.setSearchTerm(term);
  }

  /**
   * Add global search filter action.
   * @param filter filter name
   * @param value filter value
   */
  public static addSearchFilter(filter: string, value: string) {
    return SearchActionCreators.addSearchFilter(filter, value);
  }

  /**
   * Remove global search filters action.
   * @param filter filter name
   */
  public static removeSearchFilter(filter: string) {
    return SearchActionCreators.removeSearchFilter(filter);
  }

  /**
   * Set global search filters action.
   * @param filter filter name
   * @param values filter values
   */
  public static setSearchFilters(filter: string, values: string[]) {
    return SearchActionCreators.setSearchFilters(filter, values);
  }

  /**
   * Clear global searh filters.
   */
  public static clearSearchFilters() {
    return SearchActionCreators.clearSearchFilters();
  }

  /*********************Account Actions***********************/
  /**
   * Check authenticated action.
   * @category Foo
   */
  public static checkAuthenticated() {
    return AccountActionCreators.checkAuthenticated();
  }

  /**
   * Sign in action.
   * @param email user email
   * @param password user password
   */
  public static signIn(email: string, password: string) {
    return AccountActionCreators.signIn(email, password);
  }

  /**
   * Sign up with password action.
   * @param credentials user credentials
   */
  public static signUpWithPassword(credentials: SignUpWithPasswordCredentials) {
    return AccountActionCreators.signUpWithPassword(credentials);
  }

  /**
   * Initialize app action.
   */
  public static initializeApp() {
    return AccountActionCreators.initializeApp();
  }

  /**
   * Initialize user session action.
   * @param sessionData user data(e.g. the token, roles, permissions etc.)
   * @param authenticated is user authenticated
   */
  public static initializeUserSession(
    sessionData: any,
    authenticated: boolean
  ) {
    return AccountActionCreators.initializeUserSession(
      sessionData,
      authenticated
    );
  }

  /**
   * Sign out action.
   */
  public static signOut() {
    return AccountActionCreators.signOut();
  }

  /**
   * Force change password action.
   * @param password password
   */
  public static forceChangePassword(password: string) {
    return AccountActionCreators.forceChangePassword(password);
  }

  /**
   * Change password action.
   * @param oldPassword old password
   * @param password new password
   */
  public static changePassword(oldPassword: string, password: string) {
    return AccountActionCreators.changePassword(oldPassword, password);
  }

  /**
   * Forgot password action.
   * @param email user email
   */
  public static forgotPassword(email: string) {
    return AccountActionCreators.forgotPassword(email);
  }

  /**
   * Confirm forgot password action.
   * @param email user email
   * @param verificationCode verification code
   * @param password new user password
   */
  public static confirmForgotPassword(
    email: string,
    verificationCode: string,
    password: string
  ) {
    return AccountActionCreators.confirmForgotPassword(
      email,
      verificationCode,
      password
    );
  }

  /**
   * Ensure change password for user is set action.
   */
  public static ensureChangePasswordUserIsSet() {
    return AccountActionCreators.ensureChangePasswordUserIsSet();
  }

  /*********************Items Actions***********************/

  /**
   * Load items action.
   * @param itemType items type
   * @param filteringOptions items filtering options
   */
  public static itemsLoad(itemType: string, filteringOptions: any) {
    return ItemsActionCreators.itemsLoad(itemType, filteringOptions);
  }

  /**
   * Add item action.
   * @param itemType item type
   * @param data item data
   */
  public static itemAdd(itemType: string, data: any) {
    return ItemsActionCreators.itemAdd(itemType, data);
  }

  /**
   * Save/Update item action.
   * @param itemType item type
   * @param id item id
   * @param data updated item data
   */
  public static itemSave(itemType: string, id: string | number, data: any) {
    return ItemsActionCreators.itemSave(itemType, id, data);
  }

  /**
   * Save/Update items action.
   * @param itemType item type
   * @param data updated items array
   */
  public static itemsSave(itemType: string, data: any) {
    return ItemsActionCreators.itemsSave(itemType, data);
  }

  /**
   * Reload item with given id action.
   * @param itemType item type
   * @param id item id
   */
  public static itemReload(itemType: string, id: string | number) {
    return ItemsActionCreators.itemReload(itemType, id);
  }

  /**
   * Set item action.
   * @param itemType item type
   * @param id item id
   * @param data item data
   */
  public static itemSet(itemType: string, id: string | number, data: any) {
    return ItemsActionCreators.itemSet(itemType, id, data);
  }

  /**
   * Set items action.
   * @param itemType items type
   * @param data items
   */
  public static itemsSet(itemType: string, data: any) {
    return ItemsActionCreators.itemsSet(itemType, data);
  }

  /**
   * Set item data by field name action.
   * @param itemType item type
   * @param field item field
   * @param data item data
   * @hidden
   */
  public static setItemData(itemType: string, field: string, data: any) {
    return ItemsActionCreators.setItemData(itemType, field, data);
  }

  /**
   * Make item active action with given id.
   * @param itemType item type
   * @param id item id
   */
  public static itemMakeActive(itemType: string, id: string | number) {
    return ItemsActionCreators.itemMakeActive(itemType, id);
  }

  /**
   * Select item with given id action.
   * @param itemType item type
   * @param id item id
   */
  public static itemSelect(itemType: string, id: string | number) {
    return ItemsActionCreators.itemSelect(itemType, id);
  }

  /**
   * Remove item with given id action.
   * @param itemType item type
   * @param id item id
   */
  public static itemRemove(itemType: string, id: string | number) {
    return ItemsActionCreators.itemRemove(itemType, id);
  }

  /**
   * Remove items action.
   * @param itemType item type
   * @param ids remove items ids
   */
  public static itemsRemove(itemType: string, ids: string[] | number[]) {
    return ItemsActionCreators.itemsRemove(itemType, ids);
  }

  /**
   * Select items with given ids action.
   * @param itemType items type
   * @param ids items ids
   */
  public static itemsSelect(itemType: string, ids: string[] | number[]) {
    return ItemsActionCreators.itemsSelect(itemType, ids);
  }

  /**
   * Set item search term action.
   * @param itemType item type
   * @param term item search term
   */
  public static setItemSearchTerm(itemType: string, term: string) {
    return ItemsActionCreators.setItemSearchTerm(itemType, term);
  }

  /**
   * Add item search filter action.
   * @param itemType item type
   * @param filter filter name
   * @param value new filter value
   */
  public static addItemSearchFilter(itemType: string, filter: any, value: any) {
    return ItemsActionCreators.addItemSearchFilter(itemType, filter, value);
  }

  /**
   * Remove item search filter action.
   * @param itemType item type
   * @param filter filter name
   */
  public static removeItemSearchFilter(itemType: string, filter: any) {
    return ItemsActionCreators.removeItemSearchFilter(itemType, filter);
  }

  /**
   * Set item search filters action.
   * @param itemType item type
   * @param filter filter name
   * @param values filter values
   */
  public static setItemSearchFilters(
    itemType: string,
    filter: any,
    values: any
  ) {
    return ItemsActionCreators.setItemSearchFilters(itemType, filter, values);
  }

  /**
   * Clear item search filters action.
   * @param itemType item type
   */
  public static clearItemSearchFilters(itemType: string) {
    return ItemsActionCreators.clearItemSearchFilters(itemType);
  }

  /**
   * Set item sorting options action.
   * @param itemType item type
   * @param sortingOptions sorting options
   */
  public static setItemSortingOptions(itemType: string, sortingOptions: any) {
    return ItemsActionCreators.setItemSortingOptions(itemType, sortingOptions);
  }

  /*********************Sorting Actions***********************/
  /**
   * Set global sorting options.
   * @param sortingOptions sorting options
   */
  public static setSortingOptions(sortingOptions: any) {
    return SortingActionCreators.setSortingOptions(sortingOptions);
  }

  /**
   * Import items action.
   * @param itemType item type
   * @param data object contained import data
   */
  public static itemsImport(itemType: string, data: any) {
    return ItemsActionCreators.itemsImport(itemType, data);
  }

  /**
   * Get object for redux bindings.
   * @returns object with class methods for redux bindActionCreators method
   */
  public static getBindObject() {
    const DckActions: any = DckActionCreators;
    const keys: string[] = Object.keys(DckActionCreators);
    const object: any = {};
    if (keys && keys.length) {
      keys.forEach((key: string) => {
        if (
          key &&
          key !== "getBindObject" &&
          DckActions[key] &&
          typeof DckActions[key] === "function"
        ) {
          object[key] = DckActions[key];
        }
      });
    }

    return object;
  }
}
