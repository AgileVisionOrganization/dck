/** Session management */
export const INITIALIZE_APP = "INITIALIZE_APP";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const CONFIRM_FORGOT_PASSWORD = "CONFIRM_FORGOT_PASSWORD";
export const INITIALIZE_USER_SESSION = "INITIALIZE_USER_SESSION";
export const CHECK_AUTHENTICATED = "CHECK_AUTHENTICATED";
export const ENSURE_CHANGE_USER_PASSWORD_IS_SET =
  "ENSURE_CHANGE_USER_PASSWORD_IS_SET";

/** Async processes */
export const ASYNC_PROCESS_START = "ASYNC_PROCESS_START";
export const ASYNC_PROCESS_STOP = "ASYNC_PROCESS_STOP";
export const ASYNC_PROCESS_RESET = "ASYNC_PROCESS_RESET";

/** Items */

// Start loading items of the given type
export const ITEMS_LOAD = "ITEMS_LOAD";

// Set the list of loaded items, e.g. after it was received via the REST API call
export const ITEMS_SET = "ITEMS_SET";

// Reload some particular item
export const ITEM_RELOAD = "ITEM_RELOAD";

// Set value for the given item, e.g. after it was reloaded via the REST API
export const ITEM_SET = "ITEM_SET";

// Mark the given item as active, for example when it was opened for editing
export const ITEM_MAKE_ACTIVE = "ITEM_MAKE_ACTIVE";

// Select items, e.g. by using the checkbox in the table
export const ITEMS_SELECT = "ITEMS_SELECT";

// Add new item
export const ITEM_ADD = "ITEM_ADD";

// Save item, e.g. after editing
export const ITEM_SAVE = "ITEM_SAVE";

// Remove item
export const ITEM_REMOVE = "ITEM_REMOVE";

// Remove item
export const ITEMS_REMOVE = "ITEMS_REMOVE";

// Make search term active
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

export const ADD_SEARCH_FILTER = "ADD_SEARCH_FILTER";
export const REMOVE_SEARCH_FILTER = "REMOVE_SEARCH_FILTER";
export const SET_SEARCH_FILTERS = "SET_SEARCH_FILTERS";

export const CLEAR_SEARCH_FILTERS = "CLEAR_SEARCH_FILTERS";

export const SET_SORTING_OPTIONS = "SET_SORTING_OPTIONS";

// Make search term active per item type
export const SET_ITEM_SEARCH_TERM = "SET_ITEM_SEARCH_TERM";
export const ADD_ITEM_SEARCH_FILTER = "ADD_ITEM_SEARCH_FILTER";
export const REMOVE_ITEM_SEARCH_FILTER = "REMOVE_ITEM_SEARCH_FILTER";
export const SET_ITEM_SEARCH_FILTERS = "SET_ITEM_SEARCH_FILTERS";
export const CLEAR_ITEM_SEARCH_FILTERS = "CLEAR_ITEM_SEARCH_FILTERS";
export const SET_ITEM_SORTING_OPTIONS = "SET_ITEM_SORTING_OPTIONS";
