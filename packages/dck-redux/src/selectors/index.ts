import AccountSelectors from "./account";
import ProcessesSelectors from "./processes";
import SearchSelectors from "./search";
import SortingSelectors from "./sorting";
import ItemsSelectors from "./items";

export const DckSelectors = {
  ...AccountSelectors,
  ...ProcessesSelectors,
  ...SearchSelectors,
  ...SortingSelectors,
  ...ItemsSelectors
};

export default DckSelectors;
