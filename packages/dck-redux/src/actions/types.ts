/** Session management */
export class DckActionTypes {
  /**
   * Initialize app action type.
   */
  public static INITIALIZE_APP = "INITIALIZE_APP";

  /**
   * Sign in action type.
   */
  public static SIGN_IN = "SIGN_IN";

  /**
   * Sign up with password action type.
   */
  public static SIGN_UP_WITH_PASSWORD = "SIGN_UP_WITH_PASSWORD";

  /**
   * Sign out action type.
   */
  public static SIGN_OUT = "SIGN_OUT";

  /**
   * Force change password action type.
   */
  public static FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD";

  /**
   * Change password action type.
   */
  public static CHANGE_PASSWORD = "CHANGE_PASSWORD";

  /**
   * Forgot password action type.
   */
  public static FORGOT_PASSWORD = "FORGOT_PASSWORD";

  /**
   * Confirn forgot password action type.
   */
  public static CONFIRM_FORGOT_PASSWORD = "CONFIRM_FORGOT_PASSWORD";

  /**
   * Initialize user session action type.
   */
  public static INITIALIZE_USER_SESSION = "INITIALIZE_USER_SESSION";

  /**
   * Check authenticated action type.
   */
  public static CHECK_AUTHENTICATED = "CHECK_AUTHENTICATED";

  /**
   * Ensure changed user password is set action type.
   */
  public static ENSURE_CHANGE_USER_PASSWORD_IS_SET =
    "ENSURE_CHANGE_USER_PASSWORD_IS_SET";

  /** Async processes */

  /**
   * Async process start action type.
   */
  public static ASYNC_PROCESS_START = "ASYNC_PROCESS_START";

  /**
   * Async process stop action type.
   */
  public static ASYNC_PROCESS_STOP = "ASYNC_PROCESS_STOP";

  /**
   * Async process reset action type.
   */
  public static ASYNC_PROCESS_RESET = "ASYNC_PROCESS_RESET";

  /** Items */

  /**
   * Start loading items of the given type action type.
   */
  public static ITEMS_LOAD = "ITEMS_LOAD";

  /**
   * Set the list of loaded items action type, e.g. after it was received via the REST API call.
   */
  public static ITEMS_SET = "ITEMS_SET";

  /**
   * Reload some particular item action type.
   */
  public static ITEM_RELOAD = "ITEM_RELOAD";

  /**
   * Set value for the given item action type, e.g. after it was reloaded via the REST API.
   */
  public static ITEM_SET = "ITEM_SET";

  /**
   * Set item specific data by field name e.g. "totalPages", "currentPage", "validateStatus" etc.
   */
  public static SET_ITEM_DATA = "SET_ITEM_DATA";

  /**
   * Mark the given item as active action type, for example when it was opened for editing
   */
  public static ITEM_MAKE_ACTIVE = "ITEM_MAKE_ACTIVE";

  /**
   * Select items action type, e.g. by using the checkbox in the table
   */
  public static ITEMS_SELECT = "ITEMS_SELECT";

  /**
   * Select item action type, e.g. by using the checkbox in the table
   */
  public static ITEM_SELECT = "ITEM_SELECT";

  /**
   * Add new item action type
   */
  public static ITEM_ADD = "ITEM_ADD";

  /**
   * Save item action type, e.g. after editing
   */
  public static ITEM_SAVE = "ITEM_SAVE";

  /**
   * Save items action type, e.g. after editing
   */
  public static ITEMS_SAVE = "ITEMS_SAVE";

  /**
   * Remove item action type
   */
  public static ITEM_REMOVE = "ITEM_REMOVE";

  /**
   * Remove items action type
   */
  public static ITEMS_REMOVE = "ITEMS_REMOVE";

  /**
   * Make search term active action type
   */
  public static SET_SEARCH_TERM = "SET_SEARCH_TERM";

  /**
   * Add global search filter action type
   */
  public static ADD_SEARCH_FILTER = "ADD_SEARCH_FILTER";

  /**
   * Remove global search filter action type
   */
  public static REMOVE_SEARCH_FILTER = "REMOVE_SEARCH_FILTER";

  /**
   * Set global search filters action type
   */
  public static SET_SEARCH_FILTERS = "SET_SEARCH_FILTERS";

  /**
   * Clear global search filters action type
   */
  public static CLEAR_SEARCH_FILTERS = "CLEAR_SEARCH_FILTERS";

  /**
   * Set global sorting options action type
   */
  public static SET_SORTING_OPTIONS = "SET_SORTING_OPTIONS";

  // Make search term active per item type

  /**
   * Set item search term action type
   */
  public static SET_ITEM_SEARCH_TERM = "SET_ITEM_SEARCH_TERM";

  /**
   * Add item search filter action type
   */
  public static ADD_ITEM_SEARCH_FILTER = "ADD_ITEM_SEARCH_FILTER";

  /**
   * Remove item search filter action type
   */
  public static REMOVE_ITEM_SEARCH_FILTER = "REMOVE_ITEM_SEARCH_FILTER";

  /**
   * Set item search filters action type
   */
  public static SET_ITEM_SEARCH_FILTERS = "SET_ITEM_SEARCH_FILTERS";

  /**
   * Cleara item search filters action type
   */
  public static CLEAR_ITEM_SEARCH_FILTERS = "CLEAR_ITEM_SEARCH_FILTERS";

  /**
   * Set item sorting options action type
   */
  public static SET_ITEM_SORTING_OPTIONS = "SET_ITEM_SORTING_OPTIONS";

  /**
   * Import items from file, e.g. from csv
   */
  public static ITEMS_IMPORT = "ITEMS_IMPORT";
}

/**
 * Sign up with password credentials
 * @hidden
 */
export type SignUpWithPasswordCredentials = {
  /**
   * User identifier e.g. email or some other unique data
   */
  identifier: string;

  /**
   * User password.
   */
  password1: string;

  /**
   * User confirmation password.
   */
  password2: string;
};
