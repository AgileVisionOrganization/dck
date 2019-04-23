/*eslint no-console: ["error", { allow: ["warn"] }] */

import { fromJS } from "immutable";
import { items } from "./items";
import * as ItemActionCreators from "../actions/items";

const initialState = fromJS({
  ItemType1: {
    items: ["item1", "item2", "item3"],
    selected: [],
    active: null,
    term: "",
    filters: {},
    sortingOptions: []
  },
  ItemType2: {
    items: ["item4", "item5", "item6"],
    selected: [],
    active: null,
    term: "",
    filters: {},
    sortingOptions: []
  },
  ItemType3: {
    items: ["item7", "item8", "item9"],
    selected: [],
    active: null,
    term: "",
    filters: {},
    sortingOptions: []
  }
});

describe("ItemsReducer", () => {
  describe("Search", () => {
    it("should set a new search term", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemSearchTerm("ItemType1", "test")
      );

      expect(updated.getIn(["ItemType1", "term"])).toEqual("test");
    });

    it("should set item data by field name", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemData("ItemType1", "dataField", "itemData")
      );

      expect(updated.getIn(["ItemType1", "dataField"])).toEqual("itemData");
    });

    it("should set undefined item data by empty field name", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemData("ItemType1", "", "itemData")
      );

      expect(updated.getIn(["ItemType1", "dataField"])).toBeUndefined();
    });

    it("should set undefined item data", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemData("ItemType1", "dataField", undefined)
      );

      expect(updated.getIn(["ItemType1", "dataField"])).toBeUndefined();
    });

    it("should add a new filter", () => {
      const updated = items(
        initialState,
        ItemActionCreators.addItemSearchFilter(
          "ItemType2",
          "filterA",
          "filterValue"
        )
      );
      expect(updated).toBeDefined();
      expect(
        updated.getIn(["ItemType2", "filters", "filterA"]).toJS()
      ).toContain("filterValue");

      const oneMoreFilter = items(
        updated,
        ItemActionCreators.addItemSearchFilter(
          "ItemType2",
          "filterA",
          "filterValue2"
        )
      );

      expect(oneMoreFilter).toBeDefined();
      expect(
        oneMoreFilter.getIn(["ItemType2", "filters", "filterA"]).toJS()
      ).toMatchObject(["filterValue", "filterValue2"]);
    });

    it("should not add a duplicate filter", () => {
      const updated = items(
        initialState,
        ItemActionCreators.addItemSearchFilter(
          "ItemType3",
          "filterA",
          "filterValue"
        )
      );
      expect(updated).toBeDefined();
      expect(
        updated.getIn(["ItemType3", "filters", "filterA"]).toJS()
      ).toContain("filterValue");

      const oneMoreFilter = items(
        updated,
        ItemActionCreators.addItemSearchFilter(
          "ItemType3",
          "filterA",
          "filterValue"
        )
      );
      expect(oneMoreFilter).toBeDefined();
      expect(
        oneMoreFilter.getIn(["ItemType3", "filters", "filterA"]).toJS()
      ).toMatchObject(["filterValue"]);
    });

    it("should not set duplicate filters", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemSearchFilters("ItemType3", "filterA", [
          "1",
          "2",
          "3",
          "3"
        ])
      );
      expect(
        updated.getIn(["ItemType3", "filters", "filterA"]).toJS()
      ).toMatchObject(["1", "2", "3"]);
    });

    it("should not fail on empty  filters", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemSearchFilters("ItemType3", "filterA", [])
      );

      expect(updated).toBeDefined();
      expect(
        updated.getIn(["ItemType3", "filters", "filterA"]).toJS()
      ).toMatchObject([]);
    });

    it("should remove a filter", () => {
      const updated = items(
        initialState,
        ItemActionCreators.addItemSearchFilter(
          "ItemType3",
          "filterA",
          "filterValue"
        )
      );

      expect(updated).toBeDefined();
      expect(
        updated.getIn(["ItemType3", "filters", "filterA"]).toJS()
      ).toMatchObject(["filterValue"]);

      const removedFilter = items(
        updated,
        ItemActionCreators.removeItemSearchFilter("ItemType3", "filterA")
      );
      expect(removedFilter).toBeDefined();
      expect(
        removedFilter.getIn(["ItemType3", "filters", "filterA"])
      ).toBeUndefined();
    });

    it("should clear filters", () => {
      const updated = items(
        initialState,
        ItemActionCreators.addItemSearchFilter(
          "ItemType3",
          "filterA",
          "filterValue"
        )
      );
      expect(updated).toBeDefined();
      expect(
        updated.getIn(["ItemType3", "filters", "filterA"]).toJS()
      ).toMatchObject(["filterValue"]);

      const deleted = items(
        updated,
        ItemActionCreators.clearItemSearchFilters("ItemType3")
      );
      expect(deleted).toBeDefined();
      expect(
        deleted.getIn(["ItemType3", "filters", "filterA"])
      ).toBeUndefined();
    });

    it("should add search term per item types", () => {
      const updatedWithType1 = items(
        initialState,
        ItemActionCreators.addItemSearchFilter(
          "ItemType1",
          "filterA",
          "filterValueA"
        )
      );

      const updatedWithType2 = items(
        updatedWithType1,
        ItemActionCreators.addItemSearchFilter(
          "ItemType2",
          "filterB",
          "filterValueB"
        )
      );
      expect(updatedWithType2).toBeDefined();
      expect(
        updatedWithType2.getIn(["ItemType1", "filters", "filterA"]).toJS()
      ).toMatchObject(["filterValueA"]);
      expect(updatedWithType2).toBeDefined();
      expect(
        updatedWithType2.getIn(["ItemType2", "filters", "filterB"]).toJS()
      ).toMatchObject(["filterValueB"]);
    });

    it("should set a new sortingOptions", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemSortingOptions("ItemType1", [
          "option1",
          "option2"
        ])
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "sortingOptions"])).toMatchObject([
        "option1",
        "option2"
      ]);
    });
  });
});
