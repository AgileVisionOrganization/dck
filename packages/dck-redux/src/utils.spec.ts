import { fromJS } from "immutable";
import { stateToPropsMappingsForItem } from "./utils";

const TEST_ITEM_TYPE = "TestItem";

describe("Utils Tests", () => {
    describe("stateToPropsMappingsForItem", () => {
        it("should create proper mappings", () => {
            const state = {
                dck: {
                    items: fromJS({
                        TestItem: {
                            items: [],
                            selected: [],
                            active: null,
                            term: "",
                            filters: {},
                            sortingOptions: []
                        }
                    }),
                    processes: fromJS({
                        TESTITEM_LOAD: {
                            running: false,
                            failed: false
                        },
                        TestItemAdding: {
                            running: false,
                            failed: false
                        },
                        TestItemUpdating: {
                            running: false,
                            failed: false
                        },
                        TestItemRemoving: {
                            running: false,
                            failed: false
                        }
                    })
                }
            };

            const mappings = stateToPropsMappingsForItem(state, TEST_ITEM_TYPE);

            expect(mappings).toBeDefined();

            expect(mappings).toHaveProperty("testItemsLoading");
            expect(mappings).toHaveProperty("testItemsLoadFailed");
            expect(mappings).toHaveProperty("testItemsLoadSuccess");

            expect(mappings).toHaveProperty("testItemAdding");
            expect(mappings).toHaveProperty("testItemAddFailed");
            expect(mappings).toHaveProperty("testItemAddSuccess");

            expect(mappings).toHaveProperty("testItemUpdating");
            expect(mappings).toHaveProperty("testItemUpdateFailed");
            expect(mappings).toHaveProperty("testItemUpdateSuccess");

            expect(mappings).toHaveProperty("testItemRemoving");
            expect(mappings).toHaveProperty("testItemRemoveFailed");
            expect(mappings).toHaveProperty("testItemRemoveSuccess");


        });
    });
});