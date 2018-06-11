import { fromJS } from "immutable";
import { search } from "./search";
import ActionTypes from "../actions/types";

const initialState = fromJS({
  term: "",
  filters: {}
});

describe("SearchReducer", () => {
  describe("Search", () => {
    it("should set a new search term", () => {
      const updated = search(initialState, {
        type: ActionTypes.SET_SEARCH_TERM,
        term: "test"
      });
      expect(updated).toBeDefined();
      expect(updated.get("term")).toEqual("test");
    });

    it("should add a new filter", () => {
      const updated = search(initialState, {
        type: ActionTypes.ADD_SEARCH_FILTER,
        filter: "filterA",
        value: "filterValue"
      });
      expect(updated).toBeDefined();
      expect(updated.getIn(["filters", "filterA"]).toJS()).toMatchObject([
        "filterValue"
      ]);

      const oneMoreFilter = search(updated, {
        type: ActionTypes.ADD_SEARCH_FILTER,
        filter: "filterA",
        value: "filterValue2"
      });
      expect(oneMoreFilter).toBeDefined();
      expect(oneMoreFilter.getIn(["filters", "filterA"]).toJS()).toMatchObject([
        "filterValue",
        "filterValue2"
      ]);
    });

    it("should not add a duplicate filter", () => {
      const updated = search(initialState, {
        type: ActionTypes.ADD_SEARCH_FILTER,
        filter: "filterA",
        value: "filterValue"
      });
      expect(updated).toBeDefined();
      expect(updated.getIn(["filters", "filterA"]).toJS()).toMatchObject([
        "filterValue"
      ]);

      const oneMoreFilter = search(updated, {
        type: ActionTypes.ADD_SEARCH_FILTER,
        filter: "filterA",
        value: "filterValue"
      });
      expect(oneMoreFilter).toBeDefined();
      expect(oneMoreFilter.getIn(["filters", "filterA"]).toJS()).toMatchObject([
        "filterValue"
      ]);
    });

    it("should not set duplicate filters", () => {
      const updated = search(initialState, {
        type: ActionTypes.SET_SEARCH_FILTERS,
        filter: "filterA",
        values: ["1", "2", "3", "3"]
      });
      expect(updated).toBeDefined();
      expect(updated.getIn(["filters", "filterA"]).toJS()).toMatchObject([
        "1",
        "2",
        "3"
      ]);
    });

    it("should not fail on empty  filters", () => {
      const updated = search(initialState, {
        type: ActionTypes.SET_SEARCH_FILTERS,
        filter: "filterA",
        values: []
      });
      expect(updated).toBeDefined();
      expect(updated.getIn(["filters", "filterA"]).toJS()).toMatchObject([]);
    });

    it("should not fail on non-existing  filters", () => {
      const updated = search(initialState, {
        type: ActionTypes.SET_SEARCH_FILTERS,
        filter: "filterA"
      });
      expect(updated).toBeDefined();
      expect(updated.getIn(["filters", "filterA"]).toJS()).toMatchObject([]);
    });

    it("should remove a filter", () => {
      const updated = search(initialState, {
        type: ActionTypes.ADD_SEARCH_FILTER,
        filter: "filterA",
        value: "filterValue"
      });

      expect(updated).toBeDefined();
      expect(updated.getIn(["filters", "filterA"]).toJS()).toMatchObject([
        "filterValue"
      ]);

      const removedFilter = search(updated, {
        type: ActionTypes.REMOVE_SEARCH_FILTER,
        filter: "filterA"
      });

      expect(removedFilter).toBeDefined();
      expect(removedFilter.getIn(["filters", "filterA"])).toBeUndefined();
    });

    it("should clear filters", () => {
      const updated = search(
        fromJS({
          term: "",
          filters: {
            a: ["1", "2", "3"],
            b: ["a"]
          }
        }),
        {
          type: ActionTypes.CLEAR_SEARCH_FILTERS
        }
      );

      expect(updated).toBeDefined();
      expect(updated.getIn(["filters", "a"])).toBeUndefined();
      expect(updated.getIn(["filters", "b"])).toBeUndefined();
    });
  });
});
