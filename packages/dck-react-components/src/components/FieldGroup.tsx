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
import * as ReactDatetime from "react-datetime"
import "../../node_modules/react-datetime/css/react-datetime.css"

export type FieldInputType =
  | "text"
  | "password"
  | "email"
  | "checkbox"
  | "datetimepicker"
  | "datepicker"
  | "timepicker";

export const InputTypes = Object.freeze({
  text: "text",
  password: "password",
  email: "email",
  checkbox: "checkbox",
  datetimepicker: "datetimepicker",
  datepicker: "datepicker",
  timepicker: "timepicker",
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
  selectValues?: any[];
}

export interface IFieldGroupDateTimeProps {
  dateTimeClass?: string;

  dateFormat?: boolean|string;
  timeFormat?: boolean|string;
  input?: boolean;
  open?: boolean;
  locale?: string;
  utc?: boolean;
  onBlur?: (e: any) => void;
  inputProps?: Object;
  strictParsing?: boolean;
  closeOnSelect?: boolean;
  closeOnTab?: boolean;
  disableOnClickOutside?: boolean; 
}

export interface IFieldGroupProps extends IFieldGroupInputProps, IFieldGroupSelectProps, IFieldGroupDateTimeProps {}

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
    dateTimeClass: "date-time-class",
    closeOnSelect: true,
    disableOnClickOutside: false,
    open: false,
    input: true,
    defaultValue: new Date()
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
      case InputTypes.datetimepicker:
        render = this.renderDateTimePicker();
        break;
      case InputTypes.datepicker:
        render = this.renderDatePicker();
        break;
      case InputTypes.timepicker:
        render = this.renderTimePicker();
        break;
      default:
        render = this.renderTextInput();
        break;
    }

    return render;
  }

  private renderDateTimePicker() {
    return (
      <div className={this.props.dateTimeClass}>
        <ReactDatetime {...this.props}/> 
      </div>
    );
  }

  private renderDatePicker() {
    const {dateFormat, timeFormat, ...otherProps} = this.props;
    return (
      <div className={this.props.dateTimeClass}>
        <ReactDatetime dateFormat={dateFormat ? dateFormat : true} timeFormat={false} {...otherProps}/>
      </div>
    );
  }

  private renderTimePicker() {
    const {dateFormat, timeFormat, ...otherProps} = this.props;
    return (
      <div className={this.props.dateTimeClass}>
        <ReactDatetime dateFormat={false} timeFormat={timeFormat ? timeFormat : true} {...otherProps}/>
      </div>
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