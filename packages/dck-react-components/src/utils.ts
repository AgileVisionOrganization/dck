import * as React from "react";
import { IValidationResult } from "dck-validators";

/**
 * Populates state for the field in the parent component
 * @param {any} that reference to the parent component
 * @param {string} name name of the field
 * @param {any} initialValue initial value of the field
 * @param {(value: string) => Promise<IValidationResult>} validator validator to be used for checking the field
 * @param {boolean} existingRecord if the record exists(true) initial value will be validated on startup
 * @param {boolean} isCheckbox used to declare current component and from what field it should take value
 * @param {boolean} isDateTimePiker used to declare current component and from what field it should take value
 */
export function initField(
  that: any,
  name: string,
  initialValue: any,
  validator: (value: string, optional?: boolean) => Promise<IValidationResult>,
  existingRecord?: boolean,
  isCheckbox?: boolean,
  isDateTimePiker?: boolean,
  optional?: boolean,
) {
  const field: any = {};

  field[name] = {
    onChange: (e: React.FormEvent<HTMLInputElement>) => {

      const updatedField = { ...that.state[name] };
      updatedField.value = isCheckbox ? e.currentTarget.checked : isDateTimePiker ? e : e.currentTarget.value;

      const newState: any = {};
      newState[name] = updatedField;
      that.setState(newState);
      validator(updatedField.value, optional).then((result) => {
        const fieldState = that.state[name];
        fieldState.validation = result;
        const updatedState: any = {};
        updatedState[name] = fieldState;
        that.setState(updatedState);
      });
    },
    validationCurrentValue: (callback: any) => {
      const updatedField = { ...that.state[name] };

      const newState: any = {};
      newState[name] = updatedField;
      that.setState(newState);

      validator(updatedField.value, optional).then((result) => {
        const fieldState = that.state[name];
        fieldState.validation = result;
        const updatedState: any = {};
        updatedState[name] = fieldState;
        that.setState(updatedState, () => {
          callback();
        });
      });
    },
    setValue: (value: any, callback: any) => {
      const updatedField = { ...that.state[name] };
      updatedField.value = value;

      const newState: any = {};
      newState[name] = updatedField;
      that.setState(newState);

      validator(value, optional).then((result) => {
        const fieldState = that.state[name];
        fieldState.validation = result;
        const updatedState: any = {};
        updatedState[name] = fieldState;
        that.setState(updatedState, () => {callback(); });
      });
    },
    validation: existingRecord ? {empty: !!initialValue, valid: true} : null ,
    validator,
    value: initialValue,
  };

  return field;
}
