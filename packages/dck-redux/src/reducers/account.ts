import { Map } from "immutable";

import * as types from "../actions/types";
import { createReducer } from "../utils";

/**
 * Initial account state.
 */
const initialState = Map({ authenticated: false });

/**
 * Account reducer.
 */
export const account = createReducer(initialState, {
  [types.SIGN_IN](state: any) {
    return state;
  },
  [types.INITIALIZE_USER_SESSION](state: any, action: any) {
    return state.withMutations((m: any) => {
      m.set("authenticated", action.authenticated);
      m.set("sessionData", action.sessionData);
    });
  }
});
