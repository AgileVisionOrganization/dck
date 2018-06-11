import { fromJS } from "immutable";
import StoreSelectors from "./index";

describe("Search", () => {
  it("should select search term");
  it("should select empty string if search term is not specified");
  it("should select search filters", () => {
    const state = {
      dck: {
        search: fromJS({
          term: "",
          filters: {
            a: ["1", "2", "3"],
            b: ["a"]
          }
        })
      }
    };

    const selectedFilters = StoreSelectors.selectSearchFilters(state);
    expect(selectedFilters).toBeDefined();
    expect(selectedFilters).toBeInstanceOf(Object);
    expect(selectedFilters).toHaveProperty("a");
    expect(selectedFilters).toHaveProperty("b");
    expect(selectedFilters.a).toMatchObject(["1", "2", "3"]);
    expect(selectedFilters.b).toMatchObject(["a"]);
  });
});
