import { DckActionTypes } from "./types";

export namespace DckActionCreators {
  /**
   * Async process start action.
   * @param processCode process code/name
   */
  export function asyncProcessStart(processCode: string) {
    return {
      type: DckActionTypes.ASYNC_PROCESS_START,
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
      type: DckActionTypes.ASYNC_PROCESS_STOP,
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
      type: DckActionTypes.ASYNC_PROCESS_RESET,
      processCode
    };
  }
}

export default DckActionCreators;
