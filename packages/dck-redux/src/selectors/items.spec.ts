import { fromJS } from "immutable";
import { DckSelectors } from "./index";

describe("Items", () => {
  const state = {
    dck: {
      items: fromJS({
        ITEM_TYPE_1: {
          items: [
            {
              id: "1",
              data: "test item 1"
            },
            {
              id: "2",
              data: "test item 2"
            },
            {
              id: "3",
              data: "test item 3"
            }
          ],
          selected: [],
          active: "2",
          term: "",
          filters: {
            a: ["1", "2", "3"],
            b: ["a"]
          },
          sortingOptions: []
        },
        ITEM_TYPE_2: {
          items: [
            {
              id: "21",
              data: "test item 21"
            },
            {
              id: "22",
              data: "test item 22"
            },
            {
              id: "23",
              data: "test item 23"
            },
            {
              id: "24",
              data: "test item 24"
            }
          ],
          selected: ["23", "22"],
          active: null,
          term: "testTerm",
          filters: {},
          sortingOptions: ["sort1", "sort2"]
        }
      })
    }
  };

  it("should get all items by type", () => {
    const items = DckSelectors.selectAllItems(state, "ITEM_TYPE_1");
    expect(items).toBeDefined();
    expect(items).toHaveLength(3);

    const items2 = DckSelectors.selectAllItems(state, "ITEM_TYPE_2");
    expect(items2).toBeDefined();
    expect(items2).toHaveLength(4);
  });

  it("should select selected item id", () => {
    const selectedItems = DckSelectors.selectSelectedItemsId(state, "ITEM_TYPE_2");
    expect(selectedItems).toBeDefined();
    expect(Array.from(selectedItems)).toMatchObject(["23", "22"]);
  });

  it("should select active item", () => {
    const activeItem = DckSelectors.selectActiveItem(state, "ITEM_TYPE_1");
    expect(activeItem).toBeDefined();
    expect(activeItem.data).toEqual("test item 2");
  });

  it("should select selected items", () => {
    const selectedItems = DckSelectors.selectSelectedItems(state, "ITEM_TYPE_2");
    expect(selectedItems).toBeDefined();
    expect(selectedItems).toHaveLength(2);
  });

  it("should select item by id", () => {
    const item = DckSelectors.selectItemById(state, "ITEM_TYPE_2", "24");
    expect(item).toBeDefined();
    expect(item.data).toEqual("test item 24");
  });

  it("should select item filters", () => {
    const selectedFilters = DckSelectors.selectItemSearchFilters(state, "ITEM_TYPE_1");

    expect(selectedFilters).toBeDefined();
    expect(selectedFilters).toBeInstanceOf(Object);
    expect(selectedFilters).toHaveProperty("a");
    expect(selectedFilters).toHaveProperty("b");
    expect(selectedFilters.a).toMatchObject(["1", "2", "3"]);
    expect(selectedFilters.b).toMatchObject(["a"]);
  });

  it("should select item search term", () => {
    const searchTerm = DckSelectors.selectItemSearchTerm(state, "ITEM_TYPE_2");
    expect(searchTerm).toBeDefined();
    expect(searchTerm).toEqual("testTerm");
  });

  it("should select item sortingOptions", () => {
    const sortingOptions = DckSelectors.selectItemSortingOptions(state, "ITEM_TYPE_2");
    expect(sortingOptions).toBeDefined();
    expect(sortingOptions).toMatchObject(["sort1", "sort2"]);
  });
});
