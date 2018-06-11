/**
 * @module dck-redux
 */

import ActionTypes from "./actions/types";
import ActionCreators from "./actions";
import Selectors from "./selectors";
import createReducer from "./reducers";

export const createDckReducer = createReducer;
export const DckActionCreators = { ...ActionCreators };
export const DckActionTypes = { ...ActionTypes };
export const DckSelectors = { ...Selectors };

/**
 * DCK props mapping functions.
 */
export { stateToPropsMappingsForItem, dispatchToPropsMappingsForItem, getPropTypesForItem } from "./utils";
