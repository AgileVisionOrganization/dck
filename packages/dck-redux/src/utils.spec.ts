import { fromJS } from "immutable";
import { stateToPropsMappingsForItem, dispatchToPropsMappingsForItem, createReducer } from "./utils";
import * as types from "./actions/types";
import { createStore } from "redux";

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
                            running: true,
                            failed: false
                        },
                        TESTITEM_ADD: {
                            running: false,
                            failed: true
                        },
                        TESTITEM_UPDATE: {
                            running: false,
                            failed: false
                        },
                        TESTITEM_REMOVE: {
                            running: false,
                            success: true
                        }
                    })
                }
            };

            const mappings = stateToPropsMappingsForItem(state, TEST_ITEM_TYPE);

            expect(mappings).toBeDefined();

            expect(mappings).toHaveProperty("testItemsLoading");
            expect(mappings).toHaveProperty("testItemsLoadFailed");
            expect(mappings).toHaveProperty("testItemsLoadSuccess");

            expect(mappings.testItemsLoading).toBeTruthy();
            expect(mappings.testItemsLoadFailed).toBeFalsy();
            expect(mappings.testItemsLoadSuccess).toBeFalsy();

            expect(mappings).toHaveProperty("testItemAdding");
            expect(mappings).toHaveProperty("testItemAddFailed");
            expect(mappings).toHaveProperty("testItemAddSuccess");

            expect(mappings.testItemAdding).toBeFalsy();
            expect(mappings.testItemAddFailed).toBeTruthy();
            expect(mappings.testItemsLoadSuccess).toBeFalsy();

            expect(mappings).toHaveProperty("testItemUpdating");
            expect(mappings).toHaveProperty("testItemUpdateFailed");
            expect(mappings).toHaveProperty("testItemUpdateSuccess");

            expect(mappings.testItemUpdating).toBeFalsy();
            expect(mappings.testItemUpdateFailed).toBeFalsy();
            expect(mappings.testItemUpdateSuccess).toBeFalsy();

            expect(mappings).toHaveProperty("testItemRemoving");
            expect(mappings).toHaveProperty("testItemRemoveFailed");
            expect(mappings).toHaveProperty("testItemRemoveSuccess");

            expect(mappings.testItemRemoving).toBeFalsy();
            expect(mappings.testItemRemoveFailed).toBeFalsy();
            expect(mappings.testItemRemoveSuccess).toBeTruthy();
        });
    });
    describe("dispatchToPropsMappingsForItem", () => {
        it("should create proper mappings", () => {
            
            const initialState: any = {testItems: [{id: "testId"}]};
          
            const testReducer =  createReducer(initialState, {
                [types.ITEMS_LOAD](state: any) {
                  return state;
                },
                [types.ITEM_ADD](state: any, action: any) {
                  state.testItems.push(action.data);
                  return state;
                },
                [types.ITEM_SAVE](state: any, action: any) {
                  state.testItems.map((item:any, index:any)=>{ if(item.id===action.id){ state.testItems[index] = action.data } })
                  return state;
                },
                [types.ITEM_REMOVE](state: any, action: any) {
                  state.testItems=state.testItems.filter((item:any)=> item.id!==action.id);
                  return state;
                },
                [types.ITEMS_REMOVE](state: any, action: any) {
                  state.testItems=state.testItems.filter((item:any)=>{
                      return action.ids.filter((id:any) => id===item.id).length===0;
                   });
                  return state;
                },
                [types.ITEM_MAKE_ACTIVE](state: any, action: any) {
                    state.testItems.map((item:any, index:any)=>{ if(item.id===action.id){ state.testItems[index].active = true } });
                    return state;
                }
            });

            const store = createStore(testReducer);

            const mappings = dispatchToPropsMappingsForItem(store.dispatch, TEST_ITEM_TYPE);

            expect(mappings).toBeDefined();

            expect(mappings).toHaveProperty("loadTestItems");
            expect(mappings).toHaveProperty("addTestItem");
            expect(mappings).toHaveProperty("updateTestItem");
            expect(mappings).toHaveProperty("removeTestItem");
            expect(mappings).toHaveProperty("removeTestItems");
            expect(mappings).toHaveProperty("makeActiveTestItem");

            const loadTestItemsAction = mappings.loadTestItems();
            expect(loadTestItemsAction).toBeDefined();
            expect(loadTestItemsAction.type).toEqual('ITEMS_LOAD');
            expect(loadTestItemsAction.itemType).toEqual('TestItem');
            expect(store.getState().testItems).toEqual([ { id: 'testId' } ]);

            const addTestItemAction = mappings.addTestItem({id: "testId2"});
            expect(addTestItemAction).toBeDefined();
            expect(addTestItemAction.type).toEqual('ITEM_ADD');
            expect(addTestItemAction.itemType).toEqual('TestItem');
            expect(store.getState().testItems).toEqual([ { id: 'testId' }, { id: 'testId2' } ]);

            const updateTestItemAction = mappings.updateTestItem("testId2", {id: "testId3"});
            expect(updateTestItemAction).toBeDefined();
            expect(updateTestItemAction.type).toEqual('ITEM_SAVE');
            expect(updateTestItemAction.itemType).toEqual('TestItem');
            expect(store.getState().testItems).toEqual([ { id: 'testId' }, { id: 'testId3' } ] );

            const deleteTestItemAction = mappings.removeTestItem("testId3");
            expect(deleteTestItemAction).toBeDefined();
            expect(deleteTestItemAction.type).toEqual('ITEM_REMOVE');
            expect(deleteTestItemAction.itemType).toEqual('TestItem');
            expect(store.getState().testItems).toEqual([ { id: 'testId' } ] );

            const makeActiveTestItemAction = mappings.makeActiveTestItem("testId");
            expect(makeActiveTestItemAction).toBeDefined();
            expect(makeActiveTestItemAction.type).toEqual('ITEM_MAKE_ACTIVE');
            expect(makeActiveTestItemAction.itemType).toEqual('TestItem');
            expect(store.getState().testItems).toEqual([ { id: 'testId', active: true } ]  );

            const deleteTestItemsAction = mappings.removeTestItems(["testId"]);
            expect(deleteTestItemsAction).toBeDefined();
            expect(deleteTestItemsAction.type).toEqual('ITEMS_REMOVE');
            expect(deleteTestItemsAction.itemType).toEqual('TestItem');
            expect(store.getState().testItems).toEqual([] );

        });
    });
});