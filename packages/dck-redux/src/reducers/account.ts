import { Map } from "immutable";

import DckActionTypes from "../actions/types";
import { createReducer } from "../utils";

/**
 * Initial account state.
 */
const initialState = Map({ authenticated: false });

/**
 * Account reducer.
 * This reducer set user session data to state and authenticated flag on INITIALIZE_USER_SESSION action
 * @hidden
 */
export const account = createReducer(initialState, {
  [DckActionTypes.SIGN_IN](state: any) {
    return state;
  },
  [DckActionTypes.INITIALIZE_USER_SESSION](state: any, action: any) {
    return state.withMutations((m: any) => {
      m.set("authenticated", action.authenticated);
      m.set("sessionData", action.sessionData);
    });
  }
});
