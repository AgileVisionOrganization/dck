import { plural } from 'pluralize';

import { selectAllItems, selectActiveItem, selectProcessFailed, selectProcessSuccess, selectProcessRunning, selectProcess } from './selectors';
import { DckActionCreators } from "./actions";

function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function lowercaseFirstLetter(s: string) {
    return s.charAt(0).toLocaleLowerCase() + s.slice(1);
}


export function createReducer(initialState: any, handlers: any) {
  return function reducer(state = initialState, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}


export function stateToPropsMappingsForItem(state: any, itemType: string) {
  
  const pluralLowercase = lowercaseFirstLetter(plural(itemType));
  const pluralCapitalized = capitalizeFirstLetter(plural(itemType));
  const singularCapitalized = capitalizeFirstLetter(itemType);
  const singularLowercase = lowercaseFirstLetter(itemType);

  const loadProcessName = `${itemType.toUpperCase}_LOAD`;
  const addProcessName = `${itemType.toUpperCase}_ADD`;
  const updateProcessName = `${itemType.toUpperCase}_UPDATE`;
  const removeProcessName = `${itemType.toUpperCase}_REMOVE`;
  


  const mappings : any = {};
  mappings[pluralLowercase] = selectAllItems(state, itemType);
  mappings[`current${singularCapitalized}`] = selectActiveItem(state, itemType);
  
  mappings[`${pluralLowercase}Loading`] = selectProcessRunning(state, loadProcessName);
  mappings[`${pluralLowercase}LoadFailed`] = selectProcessFailed(state, loadProcessName);
  mappings[`${pluralLowercase}LoadSuccess`] = selectProcessSuccess(state, loadProcessName);

  mappings[`${singularLowercase}Adding`] = selectProcessRunning(state, addProcessName);
  mappings[`${singularLowercase}AddFailed`] = selectProcessFailed(state, addProcessName);
  mappings[`${singularLowercase}AddSuccess`] = selectProcessSuccess(state, addProcessName);

  mappings[`${singularLowercase}Updating`] = selectProcessRunning(state, updateProcessName);
  mappings[`${singularLowercase}UpdateFailed`] = selectProcessFailed(state, updateProcessName);
  mappings[`${singularLowercase}UpdateSuccess`] = selectProcessSuccess(state, updateProcessName);

  mappings[`${singularLowercase}Removing`] = selectProcessRunning(state, removeProcessName);
  mappings[`${singularLowercase}RemoveFailed`] = selectProcessFailed(state, removeProcessName);
  mappings[`${singularLowercase}RemoveSuccess`] = selectProcessSuccess(state, removeProcessName);
  
  return mappings;
}

export function dispatchToPropsMappingsForItem(dispatch: Function, itemType: string) {
  const pluralLowercase = plural(itemType).toLocaleLowerCase();
  const pluralCapitalized = capitalizeFirstLetter(plural(itemType));
  const singularCapitalized = capitalizeFirstLetter(itemType);
  const singularLowercase = itemType.toLowerCase();
  const mappings : any = {};

  mappings[`load${pluralCapitalized}`] = (filteringOptions: any) => dispatch(DckActionCreators.itemsLoad(itemType, filteringOptions));
  mappings[`add${singularCapitalized}`] = (data: any) => dispatch(DckActionCreators.itemAdd(itemType, data));
  mappings[`update${singularCapitalized}`] = (id: any, data: any) => dispatch(DckActionCreators.itemSave(itemType, id, data));
  mappings[`remove${singularCapitalized}`] = (id: any) => dispatch(DckActionCreators.itemsRemove(itemType, [id]));
  mappings[`remove${pluralCapitalized}`] = (ids: any[]) => dispatch(DckActionCreators.itemsRemove(itemType, ids));
  

  return mappings;
}