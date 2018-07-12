import { bindActionCreators } from "redux";
import { DckActionCreators, DckActionTypes } from "./index";

describe("Test exports", () => {
  describe("Test action creators", () => {
    it("success bind action creators methods", () => {
      const TestActionCreators = {
        checkAuthenticated: () => DckActionCreators.checkAuthenticated()
      };

      const mapDispatchToProps = (dispatch: any) => {
        return bindActionCreators(TestActionCreators, dispatch);
      };
      const testDispatch = jest.fn();

      expect(mapDispatchToProps).toBeDefined();
      mapDispatchToProps(testDispatch).checkAuthenticated();
      const result = testDispatch.mock.calls[0][0];

      expect(result).toBeDefined();
      expect(result).toEqual({
        type: DckActionTypes.CHECK_AUTHENTICATED
      });
    });

    it("should bind action creators methods", () => {
      const mapDispatchToProps = (dispatch: any) => {
        return bindActionCreators(DckActionCreators.getBindObject(), dispatch);
      };
      const testDispatch = jest.fn();

      expect(mapDispatchToProps).toBeDefined();
      mapDispatchToProps(testDispatch).checkAuthenticated();
      const result = testDispatch.mock.calls[0][0];

      expect(result).toBeDefined();
      expect(result).toEqual({
        type: DckActionTypes.CHECK_AUTHENTICATED
      });
    });
  });
});
