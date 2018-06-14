import { fromJS } from "immutable";
import { DckSelectors } from "./index";

describe("Process", () => {
  const state = {
    dck: {
      processes: fromJS({
        TEST_PROCESS: {
          running: false,
          failed: false
        },
        FAILED_TEST_PROCESS: {
          running: false,
          failed: true
        },
        RUNNING_TEST_PROCESS: {
          running: true,
          failed: false
        }
      })
    }
  };

  it("should select process by code", () => {
    const process = DckSelectors.selectProcess(state, "TEST_PROCESS");
    expect(process).toBeDefined();
    expect(process.running).toEqual(false);
    expect(process.running).toEqual(false);
  });

  it("should select null if there is no process with the given code", () => {
    const process = DckSelectors.selectProcess(state, "NON_EXISTING_TEST_PROCESS");
    expect(process).toBeFalsy();
  });

  it("should select process failed flag by code", () => {
    const failed = DckSelectors.selectProcessFailed(state, "FAILED_TEST_PROCESS");
    expect(failed).toEqual(true);
  });

  it("should select null instead of failed if there is no process with the given code", () => {
    const result = DckSelectors.selectProcessFailed(state, "NON_EXISTING_TEST_PROCESS");
    expect(result).toBeFalsy();
  });

  it("should select process running flag by code", () => {
    const running = DckSelectors.selectProcessRunning(state, "RUNNING_TEST_PROCESS");
    expect(running).toEqual(true);
  });

  it("should select null instead of running if there is no process with the given code", () => {
    const running = DckSelectors.selectProcessRunning(state, "NON_EXISTING_TEST_PROCESS");
    expect(running).toBeFalsy();
  });
});
