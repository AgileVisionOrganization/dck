import { fromJS } from "immutable";
import StoreSelectors from "./index";

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
    const process = StoreSelectors.selectProcess(state, "TEST_PROCESS");
    expect(process).toBeDefined();
    expect(process.running).toEqual(false);
    expect(process.running).toEqual(false);
  });

  it("should select null if there is no process with the given code", () => {
    const process = StoreSelectors.selectProcess(
      state,
      "NON_EXISTING_TEST_PROCESS"
    );
    expect(process).toBeFalsy();
  });

  it("should select process failed flag by code", () => {
    const failed = StoreSelectors.selectProcessFailed(
      state,
      "FAILED_TEST_PROCESS"
    );
    expect(failed).toEqual(true);
  });

  it("should select null instead of failed if there is no process with the given code", () => {
    const result = StoreSelectors.selectProcessFailed(
      state,
      "NON_EXISTING_TEST_PROCESS"
    );
    expect(result).toBeFalsy();
  });

  it("should select process running flag by code", () => {
    const running = StoreSelectors.selectProcessRunning(
      state,
      "RUNNING_TEST_PROCESS"
    );
    expect(running).toEqual(true);
  });

  it("should select null instead of running if there is no process with the given code", () => {
    const running = StoreSelectors.selectProcessRunning(
      state,
      "NON_EXISTING_TEST_PROCESS"
    );
    expect(running).toBeFalsy();
  });
});
