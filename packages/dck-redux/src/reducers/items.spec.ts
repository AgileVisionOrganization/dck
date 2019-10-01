/*eslint no-console: ["error", { allow: ["warn"] }] */

import { fromJS } from "immutable";
import { items } from "./items";
import * as ItemActionCreators from "../actions/items";

const initialState = fromJS({
  ItemType1: {
    items: [],
    selected: [],
    data: {},
    active: null,
    term: "",
    filters: {},
    sortingOptions: []
  },
  ItemType2: {
    items: [],
    selected: [],
    data: {},
    active: null,
    term: "",
    filters: {},
    sortingOptions: []
  },
  ItemType3: {
    items: [],
    selected: [],
    data: {},
    active: null,
    term: "",
    filters: {},
    sortingOptions: []
  }
});

const finalState = {
  ItemType1: {
    items: [
      { id: 1, field1: "updatedData" },
      { id: 2, field2: "data2" },
    ],
    selected: [1, 2],
    data: { dataField: "itemData" },
    active: null,
    term: "test",
    filters: { filterA: ["filterValue"] },
    sortingOptions: [
      "option1",
      "option2"
    ]
  },
  ItemType2: {
    items: [],
    selected: [],
    data: {},
    active: null,
    term: "",
    filters: {},
    sortingOptions: []
  },
  ItemType3: {
    items: [],
    selected: [],
    data: {},
    active: null,
    term: "",
    filters: {},
    sortingOptions: []
  }
};

describe("Items reducer", () => {

  describe("Set items", () => {
    const should = (desc: string, input: any, output: any): void => {
      it(desc, () => {
        const updated = items(
          initialState,
          ItemActionCreators.itemsSet("ItemType1", input)
        );
        expect(updated).toBeDefined();
        expect(updated.getIn(["ItemType1", "items"])).toMatchObject(output);
      });
    };
  
    const itemsArray = [
      { id: 1, field1: "data1" },
      { id: 2, field2: "data2" },
    ];

    should("set array", itemsArray, itemsArray);
    should("set wrong data type: object", {}, []);
    should("set wrong data type: undefined", undefined, []);
  });

  describe("Set one item", () => {
    it("should not set item for initial state", () => {
      let updated = items(
        initialState,
        ItemActionCreators.itemSet("ItemType1", 1, { id: 1, field1: "data1" })
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "items"]).toJS()).toMatchObject([]);
    });

    it("should update item if item with id exists in items", () => {
      let updated = items(
        initialState,
        ItemActionCreators.itemsSet("ItemType1", [
          { id: 1, field1: "data1" },
          { id: 2, field2: "data2" },
        ])
      );
      expect(updated).toBeDefined();

      updated = items(
        updated,
        ItemActionCreators.itemSet("ItemType1", 1, { id: 1, field1: "updatedData" })
      );

      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "items"])).toMatchObject([
        { id: 1, field1: "updatedData" },
        { id: 2, field2: "data2" },
      ]);
    });

    it("should not update item if item with id does not exist in items", () => {
      let updated = items(
        initialState,
        ItemActionCreators.itemsSet("ItemType1", [
          { id: 1, field1: "data1" },
          { id: 2, field2: "data2" },
        ])
      );
      expect(updated).toBeDefined();

      updated = items(
        updated,
        ItemActionCreators.itemSet("ItemType1", 0, {})
      );

      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "items"])).toMatchObject([
        { id: 1, field1: "data1" },
        { id: 2, field2: "data2" },
      ]);
    });
  });

  describe("Select items", () => {
    it("should select/unselect one item", () => {
      let updated = items(
        initialState,
        ItemActionCreators.itemSelect("ItemType1", 1)
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([1]);

      updated = items(
        updated,
        ItemActionCreators.itemSelect("ItemType1", 1)
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([1]);

      updated = items(
        updated,
        ItemActionCreators.itemUnselect("ItemType1", 1)
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([]);

      updated = items(
        updated,
        ItemActionCreators.itemUnselect("ItemType1", 2)
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([]);
    });

    it("should select/unselect items", () => {
      let updated = items(
        initialState,
        ItemActionCreators.itemsSelect("ItemType1", [1, 2])
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([1, 2]);

      updated = items(
        updated,
        ItemActionCreators.itemsSelect("ItemType1", [2, 3])
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([1, 2, 3]);

      updated = items(
        updated,
        ItemActionCreators.itemsUnselect("ItemType1", [1, 2])
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([3]);

      updated = items(
        updated,
        ItemActionCreators.itemsUnselect("ItemType1", [1, 2, 3])
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([]);
    });

    it("should select/unselect all items", () => {
      let updated = items(
        initialState,
        ItemActionCreators.itemsSelectAll("ItemType1")
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([]);

      updated = items(
        updated,
        ItemActionCreators.itemsUnselectAll("ItemType1")
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([]);

      updated = items(updated,
        ItemActionCreators.itemsSet("ItemType1", [
          { id: 1 },
          "incorrectItem",
          { id: 2 }
        ])
      );
      updated = items(
        updated,
        ItemActionCreators.itemsSelectAll("ItemType1")
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([1, 2]);

      updated = items(
        updated,
        ItemActionCreators.itemsUnselectAll("ItemType1")
      );
      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "selected"]).toJS()).toMatchObject([]);
    });
  });

  describe("Set item data", () => {
    it("should set item data by field name", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemData("ItemType1", "dataField", "itemData")
      );

      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "data", "dataField"])).toEqual("itemData");
    });

    it("should set undefined item data by empty field name", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemData("ItemType1", "", "itemData")
      );

      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "data", "dataField"])).toBeUndefined();
    });

    it("should set undefined item data", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemData("ItemType1", "dataField", undefined)
      );

      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "data", "dataField"])).toBeUndefined();
    });
  });
  
  describe("Set item filters & sorting", () => {
    it("should set a new search term", () => {
      const updated = items(
        initialState,
        ItemActionCreators.setItemSearchTerm("ItemType1", "test")
      );

      expect(updated).toBeDefined();
      expect(updated.getIn(["ItemType1", "term"])).toEqual("test");
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

  describe("All reducers together", () => {
    it("each reducer should update corresponding part of state and do not change others", () => {
      let updated = items(initialState,
        ItemActionCreators.itemsSet("ItemType1", [])
      );
      updated = items(updated,
        ItemActionCreators.setItemData("ItemType1", "dataField", "itemData")
      );
      updated = items(updated,
        ItemActionCreators.setItemSearchTerm("ItemType1", "test")
      );
      updated = items(updated,
        ItemActionCreators.setItemSortingOptions("ItemType1", [
          "option1",
          "option2"
        ])
      );
      updated = items(updated,
        ItemActionCreators.addItemSearchFilter(
          "ItemType1",
          "filterA",
          "filterValue"
        )
      );
      updated = items(updated,
        ItemActionCreators.itemsSet("ItemType1", [
          { id: 1, field1: "data1" },
          { id: 2, field2: "data2" },
        ])
      );
      updated = items(updated,
        ItemActionCreators.itemSet("ItemType1", 1, { id: 1, field1: "updatedData" })
      );
      updated = items(updated,
        ItemActionCreators.itemsSelectAll("ItemType1")
      );

      expect(updated).toBeDefined();
      expect(updated.toJS()).toMatchObject(finalState);
    });

  });


});
