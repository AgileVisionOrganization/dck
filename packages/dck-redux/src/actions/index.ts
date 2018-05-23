import * as AccountActions from "./account";
import * as ProcessesActions from "./processes";
import * as ItemsActions from "./items";
import * as SearchActions from "./search";
import * as SortingActions from "./sorting";

/**
 * Action creators.
 */
export const DckActionCreators = {
  
  /**
   * Account actions.
   */
  ...AccountActions,
  
  /**
   * Process actions.
   */
  ...ProcessesActions,

  /**
   * Items actions.
   */
  ...ItemsActions,

  /**
   * Search actions.
   */
  ...SearchActions,

  /**
   * Sorting actions.
   */
  ...SortingActions
};
