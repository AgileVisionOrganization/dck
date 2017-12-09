/**
 * Selects a process with specified code 
 * @param {object} state state
 * @param {string} processCode process code
 */
export function selectProcess(state: any, processCode: string) {
  const process = state.dck.processes.get(processCode);

  return process ? process.toJS() : null;
}

/**
 * Selects process running flag by it's code
 * @param {object} state state
 * @param {string} processCode process code
 */
export function selectProcessRunning(state: any, processCode: string) {
  return state.dck.processes.getIn([processCode, "running"]) || null;
}

/**
 * 
 * @param {object} state state
 * @param {string} processCode process code
 */
export function selectProcessFailed(state: any, processCode: string) {
  return state.dck.processes.getIn([processCode, "failed"]) || null;
}

/**
 * Selects process success.
 * @param {object} state state
 * @param {string} processCode process code
 */
export function selectProcessSuccess(state: any, processCode: string) {
  return state.dck.processes.getIn([processCode, "success"]) || null;
}
