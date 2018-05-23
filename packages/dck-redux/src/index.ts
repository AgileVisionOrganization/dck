/**
 * @module dck-redux
 */

import * as Types from "./actions/types";
import * as Selectors from "./selectors";

/**
 * DCK props mapping functions.
 */
export {
  stateToPropsMappingsForItem,
  dispatchToPropsMappingsForItem,
  getPropTypesForItem
} from "./utils";

/**
 * Create DCK reducers.
 */
export { createDckReducer } from "./reducers";

/**
 * DCK action creators.
 */
export { DckActionCreators } from "./actions";

/**
 * DCK selectors.
 */
export const DckSelectors: any = Selectors;

/**
 * DCK action types.
 */
export const DckActionTypes: any = Types;
