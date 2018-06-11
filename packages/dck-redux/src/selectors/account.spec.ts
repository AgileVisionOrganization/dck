import { Map } from "immutable";
import StoreSelectors from "./index";

describe("Selectors", () => {
  describe("Account", () => {
    it("should select ID token if it exists", () => {
      const state = {
        dck: {
          account: Map({
            sessionData: {
              idToken: "test"
            }
          })
        }
      };

      const result = StoreSelectors.selectSessionData(state);
      expect(result).toBeDefined();
      expect(result.idToken).toEqual("test");
    });

    it("should not fail if ID token doesn't exist", () => {
      const state = {
        dck: {
          account: Map({})
        }
      };

      const result = StoreSelectors.selectSessionData(state);
      expect(result).toBeFalsy();
    });
  });
});
