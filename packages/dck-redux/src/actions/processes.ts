import * as types from "./types";

/**
 * Async process start action.
 * @param processCode process code/name
 */
export function asyncProcessStart(processCode: string) {
  return {
    type: types.ASYNC_PROCESS_START,
    processCode
  };
}

/**
 * Async process stop action.
 * @param processCode process code/name
 * @param result proces result
 */
export function asyncProcessStop(processCode: string, result: any) {
  return {
    type: types.ASYNC_PROCESS_STOP,
    processCode,
    result
  };
}

/**
 * Reset async process action.
 * @param processCode process code
 */
export function asyncProcessReset(processCode: string) {
  return {
    type: types.ASYNC_PROCESS_RESET,
    processCode
  };
}
