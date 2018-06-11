import AccountActions from "./account";
import ProcessesActions from "./processes";
import ItemsActions from "./items";
import SearchActions from "./search";
import SortingActions from "./sorting";

/**
 * Action creators.
 */
const DckActionCreators = {
  ...AccountActions,
  ...ProcessesActions,
  ...ItemsActions,
  ...SearchActions,
  ...SortingActions
};
export default DckActionCreators;
