/** Session management */

/**
 * Initialize app action type.
 */
export const INITIALIZE_APP = "INITIALIZE_APP";

/**
 * Sign in action type.
 */
export const SIGN_IN = "SIGN_IN";

/**
 * Sign up with password action type.
 */
export const SIGN_UP_WITH_PASSWORD = "SIGN_UP_WITH_PASSWORD";

/**
 * Sign out action type.
 */
export const SIGN_OUT = "SIGN_OUT";

/**
 * Force change password action type.
 */
export const FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD";

/**
 * Change password action type.
 */
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";

/**
 * Forgot password action type.
 */
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";

/**
 * Confirn forgot password action type.
 */
export const CONFIRM_FORGOT_PASSWORD = "CONFIRM_FORGOT_PASSWORD";

/**
 * Initialize user session action type.
 */
export const INITIALIZE_USER_SESSION = "INITIALIZE_USER_SESSION";

/**
 * Check authenticated action type.
 */
export const CHECK_AUTHENTICATED = "CHECK_AUTHENTICATED";

/**
 * Ensure changed user password is set action type.
 */
export const ENSURE_CHANGE_USER_PASSWORD_IS_SET =
  "ENSURE_CHANGE_USER_PASSWORD_IS_SET";

/** Async processes */

/**
 * Async process start action type.
 */
export const ASYNC_PROCESS_START = "ASYNC_PROCESS_START";

/**
 * Async process stop action type.
 */
export const ASYNC_PROCESS_STOP = "ASYNC_PROCESS_STOP";

/**
 * Async process reset action type.
 */
export const ASYNC_PROCESS_RESET = "ASYNC_PROCESS_RESET";

/** Items */

/**
 * Start loading items of the given type action type.
 */
export const ITEMS_LOAD = "ITEMS_LOAD";

/**
 * Set the list of loaded items action type, e.g. after it was received via the REST API call.
 */
export const ITEMS_SET = "ITEMS_SET";

/**
 * Reload some particular item action type.
 */
export const ITEM_RELOAD = "ITEM_RELOAD";

/**
 * Set value for the given item action type, e.g. after it was reloaded via the REST API.
 */
export const ITEM_SET = "ITEM_SET";

/**
 * Mark the given item as active action type, for example when it was opened for editing
 */
export const ITEM_MAKE_ACTIVE = "ITEM_MAKE_ACTIVE";

/**
 * Select items action type, e.g. by using the checkbox in the table
 */
export const ITEMS_SELECT = "ITEMS_SELECT";

/**
 * Select item action type, e.g. by using the checkbox in the table
 */
export const ITEM_SELECT = "ITEM_SELECT";

/**
 * Add new item action type
 */
export const ITEM_ADD = "ITEM_ADD";

/**
 * Save item action type, e.g. after editing
 */
export const ITEM_SAVE = "ITEM_SAVE";

/**
 * Remove item action type
 */
export const ITEM_REMOVE = "ITEM_REMOVE";

/**
 * Remove items action type
 */
export const ITEMS_REMOVE = "ITEMS_REMOVE";

/**
 * Make search term active action type
 */
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

/**
 * Add global search filter action type
 */
export const ADD_SEARCH_FILTER = "ADD_SEARCH_FILTER";

/**
 * Remove global search filter action type
 */
export const REMOVE_SEARCH_FILTER = "REMOVE_SEARCH_FILTER";

/**
 * Set global search filters action type
 */
export const SET_SEARCH_FILTERS = "SET_SEARCH_FILTERS";

/**
 * Clear global search filters action type
 */
export const CLEAR_SEARCH_FILTERS = "CLEAR_SEARCH_FILTERS";

/**
 * Set global sorting options action type
 */
export const SET_SORTING_OPTIONS = "SET_SORTING_OPTIONS";

// Make search term active per item type

/**
 * Set item search term action type
 */
export const SET_ITEM_SEARCH_TERM = "SET_ITEM_SEARCH_TERM";

/**
 * Add item search filter action type
 */
export const ADD_ITEM_SEARCH_FILTER = "ADD_ITEM_SEARCH_FILTER";

/**
 * Remove item search filter action type
 */
export const REMOVE_ITEM_SEARCH_FILTER = "REMOVE_ITEM_SEARCH_FILTER";

/**
 * SEt item search filters action type
 */
export const SET_ITEM_SEARCH_FILTERS = "SET_ITEM_SEARCH_FILTERS";

/**
 * Cleara item search filters action type
 */
export const CLEAR_ITEM_SEARCH_FILTERS = "CLEAR_ITEM_SEARCH_FILTERS";

/**
 * Set item sorting options action type
 */
export const SET_ITEM_SORTING_OPTIONS = "SET_ITEM_SORTING_OPTIONS";

/**
 * Sign up with password credentials 
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
}
