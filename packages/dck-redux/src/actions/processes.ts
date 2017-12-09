import * as types from "./types";

export function asyncProcessStart(processCode: string) {
  return {
    type: types.ASYNC_PROCESS_START,
    processCode
  };
}

export function asyncProcessStop(processCode: string, result: any) {
  return {
    type: types.ASYNC_PROCESS_START,
    processCode,
    result
  };
}

export function asyncProcessReset(processCode: string) {
  return {
    type: types.ASYNC_PROCESS_RESET,
    processCode
  };
}
