import * as AccountActions from "./account";
import * as ProcessesActions from "./processes";
import * as ItemsActions from "./items";
import * as SearchActions from "./search";
import * as SortingActions from "./sorting";

export const DckActionCreators = {
  ...AccountActions,
  ...ProcessesActions,
  ...ItemsActions,
  ...SearchActions,
  ...SortingActions
};
