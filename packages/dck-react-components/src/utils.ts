import * as React from "react";
import { IValidationResult } from "dck-validators";

/**
 * Populates state for the field in the parent component
 * @param {*} that reference to the parent component
 * @param {*} name name of the field
 * @param {*} initialValue initial value of the field
 * @param {*} validator validator to be used for checking the field
 */
export function initField(
  that: any,
  name: string,
  initialValue: any,
  validator: (value: string) => Promise<IValidationResult>,
  existingRecord?: boolean,
  isCheckbox?: boolean,
) {
  const field: any = {};

  field[name] = {
    onChange: (e: React.FormEvent<HTMLInputElement>) => {

      const updatedField = { ...that.state[name] };
      updatedField.value = isCheckbox ? e.currentTarget.checked : e.currentTarget.value;

      const newState: any = {};
      newState[name] = updatedField;
      that.setState(newState);

      validator(e.currentTarget.value).then((result) => {
        const fieldState = that.state[name];
        fieldState.validation = result;
        const updatedState: any = {};
        updatedState[name] = fieldState;
        that.setState(updatedState);
      });
    },
    validationCurrentValue: () => {
      const updatedField = { ...that.state[name] };

      const newState: any = {};
      newState[name] = updatedField;
      that.setState(newState);

      validator(updatedField.value).then((result) => {
        const fieldState = that.state[name];
        fieldState.validation = result;
        const updatedState: any = {};
        updatedState[name] = fieldState;
        that.setState(updatedState);
      });
    },
    setValue: (value: any) => {
      const updatedField = { ...that.state[name] };
      updatedField.value = value;

      const newState: any = {};
      newState[name] = updatedField;
      that.setState(newState);

      validator(value).then((result) => {
        const fieldState = that.state[name];
        fieldState.validation = result;
        const updatedState: any = {};
        updatedState[name] = fieldState;
        that.setState(updatedState);
      });
    },
    validation: existingRecord ? {empty: !!initialValue, valid: true} : null ,
    validator,
    value: initialValue,
  };

  return field;
}
