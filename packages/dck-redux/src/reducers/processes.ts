import { fromJS } from "immutable";

import * as types from "../actions/types";
import { createReducer } from "../utils";

/**
 * Process reducer.
 * For all processes it the system creates the record in the state with next content:
 * PROCESS_NAME: {
 *   running: false
 * }
 * @param processTypes all processes in the system 
 */
export const createProcessesReducer = (processTypes: string[]) => {
  let initialProcessStates: any;
  initialProcessStates = {};
  const processes = Object.keys(processTypes);
  processes.forEach(element => {
    initialProcessStates[element] = {
      running: false
    };
  });

  const initialState = fromJS(initialProcessStates);
  return {
    processes: createReducer(initialState, {
      [types.ASYNC_PROCESS_START](state: any, action: any) {
        return state.set(
          action.processCode,
          fromJS({
            running: true
          })
        );
      },
      [types.ASYNC_PROCESS_STOP](state: any, action: any) {
        return state.set(
          action.processCode,
          fromJS({
            running: false,
            result: action.result,
            failed: !action.result.success,
            success: action.result.success
          })
        );
      },
      [types.ASYNC_PROCESS_RESET](state: any, action: any) {
        return state.set(
          action.processCode,
          fromJS({
            running: false
          })
        );
      }
    })
  };
};
