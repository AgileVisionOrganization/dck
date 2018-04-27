import * as React from "react";
import {
  ControlLabel,
  FormControl,
  Checkbox,
  FormGroup,
  HelpBlock,
  InputGroup,
} from "react-bootstrap";
import * as FontAwesome from "react-fontawesome";
import * as DateTime from "react-datetime";
import Select from "react-select";

export type FieldInputType =
  | "text"
  | "password"
  | "email"
  | "checkbox"
  | "datepicker"
  | "select";

export const InputTypes = Object.freeze({
  text: "text",
  password: "password",
  email: "email",
  checkbox: "checkbox",
  datepicker: "datepicker",
  select: "select",
});

export interface IFieldGroupInputProps {
  type?: FieldInputType;
  placeholder?: string;
  id?: string;
  label?: string;
  help?: string;
  validationState?: any;
  validationMessage?: string;
  onFocus?: () => void;
  onChange?: (e: any) => void;
}

export interface IFieldGroupSelectProps {
  selectClass?: string;
  value?: any;
  arrowIconUp?: string;
  arrowIconDown?: string;
  arrowsSize?: FontAwesome.FontAwesomeSize;
  arrowContainerClass?: string;
  clearable?: boolean;
  searchable?: boolean;
  multi?: boolean;
  selectValues: any[];
}

export interface IFieldGroupProps extends IFieldGroupInputProps, IFieldGroupSelectProps {}

export class FieldGroup extends React.Component<IFieldGroupProps, any> {
  public static defaultProps = {
    type: "text",
    selectClass: "select-class",
    clearable: false,
    multi: false,
    searchable: false,
    arrowIconUp: "angle-up",
    arrowIconDown: "angle-down",
    arrowContainerClass: "arrow-container",
  };

  public getValidationState(validation: any) {
    if (!validation) {
      return null;
    }

    if (validation.valid) {
      return "success";
    } else {
      return "error";
    }
  }

  public render() {
    return (
      <FormGroup
        controlId={this.props.id}
        validationState={this.getValidationState(this.props.validationState)}
      >
        <ControlLabel>{this.props.label}</ControlLabel>
        {this.getCurrentRender()}
        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
        {this.props.validationMessage &&
        this.props.validationState &&
        !this.props.validationState.valid ? (
          <HelpBlock>
            <FontAwesome name="exclamation-circle" />&nbsp;
            {this.props.validationMessage}
          </HelpBlock>
        ) : (
          <HelpBlock>&nbsp;</HelpBlock>
        )}
      </FormGroup>
    );
  }

  private getCurrentRender() {
    let render = null;
    switch (this.props.type) {
      case InputTypes.checkbox:
        render = this.renderCheckBox();
        break;
      case InputTypes.select:
        render = this.renderSelect();
        break;
      default:
        render = this.renderTextInput();
        break;
    }

    return render;
  }

  private renderSelect() {
    return (
      <Select
        className={this.props.selectClass}
        placeholder={this.props.placeholder}
        value={this.props.value}
        clearable={this.props.clearable}
        searchable={this.props.searchable}
        multi={this.props.multi}
        options={this.props.selectValues}
        onChange={(event) => {
          if (event) {
            this.props.onChange(event);
          }
        }}
        arrowRenderer={(action): JSX.Element => {
          return (
            <span className={this.props.arrowContainerClass}>
              {action && action.isOpen ? (
                <FontAwesome
                  name={this.props.arrowIconUp}
                  {...this.props.arrowsSize && {
                    size: this.props.arrowsSize,
                  }}
                />
              ) : (
                <FontAwesome
                  name={this.props.arrowIconDown}
                  {...this.props.arrowsSize && {
                    size: this.props.arrowsSize,
                  }}
                />
              )}
            </span>
          );
        }}
      />
    );
  }

  private renderCheckBox() {
    return <Checkbox value={this.props.value} onChange={this.props.onChange} />;
  }

  private renderTextInput() {
    return (
      <FormControl
        onFocus={this.props.onFocus}
        onChange={this.props.onChange}
        type={this.props.type}
        placeholder={this.props.placeholder}
        value={this.props.value}
      />
    );
  }
}

export default FieldGroup;
