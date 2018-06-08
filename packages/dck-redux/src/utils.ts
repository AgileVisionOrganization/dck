import { plural } from 'pluralize';

import { selectAllItems, selectActiveItem, selectProcessFailed, selectProcessSuccess, selectProcessRunning, selectProcess } from './selectors';
import { DckActionCreators } from "./actions";
import * as PropTypes from "prop-types";

function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function lowercaseFirstLetter(s: string) {
  return s.charAt(0).toLocaleLowerCase() + s.slice(1);
}

/**
 * Created reducer.
 * @param initialState reducer initial state 
 * @param handlers reducer handlers
 */
export function createReducer(initialState: any, handlers: any) {
  return function reducer(state = initialState, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

/**
 * Get CRUD process status for item with given type. 
 * @param state current state
 * @param itemType item type
 * @returns {any} status of CRUD process for item with given type 
 */
export function stateToPropsMappingsForItem(state: any, itemType: string) {

  const pluralLowercase = lowercaseFirstLetter(plural(itemType));
  const pluralCapitalized = capitalizeFirstLetter(plural(itemType));
  const singularCapitalized = capitalizeFirstLetter(itemType);
  const singularLowercase = lowercaseFirstLetter(itemType);

  const loadProcessName = `${itemType.toUpperCase()}_LOAD`;
  const addProcessName = `${itemType.toUpperCase()}_ADD`;
  const updateProcessName = `${itemType.toUpperCase()}_UPDATE`;
  const removeProcessName = `${itemType.toUpperCase()}_REMOVE`;



  const mappings: any = {};
  mappings[pluralLowercase] = selectAllItems(state, itemType);
  mappings[`current${singularCapitalized}`] = selectActiveItem(state, itemType);

  mappings[`${pluralLowercase}Loading`] = selectProcessRunning(state, loadProcessName);
  mappings[`${pluralLowercase}LoadingProcess`] = selectProcess(state, loadProcessName);
  mappings[`${pluralLowercase}LoadFailed`] = selectProcessFailed(state, loadProcessName);
  mappings[`${pluralLowercase}LoadSuccess`] = selectProcessSuccess(state, loadProcessName);

  mappings[`${singularLowercase}Adding`] = selectProcessRunning(state, addProcessName);
  mappings[`${singularLowercase}AddingProcess`] = selectProcess(state, addProcessName);
  mappings[`${singularLowercase}AddFailed`] = selectProcessFailed(state, addProcessName);
  mappings[`${singularLowercase}AddSuccess`] = selectProcessSuccess(state, addProcessName);

  mappings[`${singularLowercase}Updating`] = selectProcessRunning(state, updateProcessName);
  mappings[`${singularLowercase}UpdatingProcess`] = selectProcess(state, updateProcessName);
  mappings[`${singularLowercase}UpdateFailed`] = selectProcessFailed(state, updateProcessName);
  mappings[`${singularLowercase}UpdateSuccess`] = selectProcessSuccess(state, updateProcessName);

  mappings[`${singularLowercase}Removing`] = selectProcessRunning(state, removeProcessName);
  mappings[`${singularLowercase}RemovingProcess`] = selectProcess(state, removeProcessName);
  mappings[`${singularLowercase}RemoveFailed`] = selectProcessFailed(state, removeProcessName);
  mappings[`${singularLowercase}RemoveSuccess`] = selectProcessSuccess(state, removeProcessName);

  return mappings;
}

/**
 * Create mappings by which You can dispatch CRUD actions for given type.
 * @param dispatch dispatch
 * @param itemType item type
 * @returns {any} mapping with dispatch CRUD actions for given type 
 */
export function dispatchToPropsMappingsForItem(dispatch: any, itemType: string) {
  const pluralLowercase = plural(itemType).toLocaleLowerCase();
  const pluralCapitalized = capitalizeFirstLetter(plural(itemType));
  const singularCapitalized = capitalizeFirstLetter(itemType);
  const singularLowercase = itemType.toLowerCase();
  const mappings: any = {};

  mappings[`load${pluralCapitalized}`] = (filteringOptions: any) => dispatch(DckActionCreators.itemsLoad(itemType, filteringOptions));
  mappings[`add${singularCapitalized}`] = (data: any) => dispatch(DckActionCreators.itemAdd(itemType, data));
  mappings[`update${singularCapitalized}`] = (id: any, data: any) => dispatch(DckActionCreators.itemSave(itemType, id, data));
  mappings[`remove${singularCapitalized}`] = (id: any) => dispatch(DckActionCreators.itemRemove(itemType, id));
  mappings[`remove${pluralCapitalized}`] = (ids: any[]) => dispatch(DckActionCreators.itemsRemove(itemType, ids));
  mappings[`remove${singularCapitalized}`] = (id: any) => dispatch(DckActionCreators.itemRemove(itemType, id));
  mappings[`makeActive${singularCapitalized}`] = (id: any) => dispatch(DckActionCreators.itemMakeActive(itemType, id));


  return mappings;
}

/**
 * Get prop types for CRUD process and actions.
 * @param itemType item type
 * @returns {any} object with CRUD prop types for given item type
 */
export function getPropTypesForItem(itemType: string) {
  const pluralLowercase = lowercaseFirstLetter(plural(itemType));
  const pluralCapitalized = capitalizeFirstLetter(plural(itemType));
  const singularCapitalized = capitalizeFirstLetter(itemType);
  const singularLowercase = lowercaseFirstLetter(itemType);

  const mappings: any = {};
  mappings[pluralLowercase] = PropTypes.array;
  mappings[`current${singularCapitalized}`] = PropTypes.object;

  mappings[`${pluralLowercase}Loading`] = PropTypes.bool;
  mappings[`${pluralLowercase}LoadFailed`] = PropTypes.bool;
  mappings[`${pluralLowercase}LoadSuccess`] = PropTypes.bool;

  mappings[`${singularLowercase}Adding`] = PropTypes.bool;
  mappings[`${singularLowercase}AddFailed`] = PropTypes.bool;
  mappings[`${singularLowercase}AddSuccess`] = PropTypes.bool;

  mappings[`${singularLowercase}Updating`] = PropTypes.bool;
  mappings[`${singularLowercase}UpdateFailed`] = PropTypes.bool;
  mappings[`${singularLowercase}UpdateSuccess`] = PropTypes.bool;

  mappings[`${singularLowercase}Removing`] = PropTypes.bool;
  mappings[`${singularLowercase}RemoveFailed`] = PropTypes.bool;
  mappings[`${singularLowercase}RemoveSuccess`] = PropTypes.bool;

  mappings[`load${pluralCapitalized}`] = PropTypes.any;
  mappings[`add${singularCapitalized}`] = PropTypes.any;
  mappings[`update${singularCapitalized}`] = PropTypes.any;
  mappings[`remove${singularCapitalized}`] = PropTypes.any;
  mappings[`remove${pluralCapitalized}`] = PropTypes.any;
  mappings[`makeActive${singularCapitalized}`] = PropTypes.any;
  
  return mappings;
}