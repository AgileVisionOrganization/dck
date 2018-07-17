import * as React from "react";
import { ControlLabel, FormControl, Checkbox, FormGroup, HelpBlock, InputGroup } from "react-bootstrap";
import * as FontAwesome from "react-fontawesome";
import * as ReactDatetime from "react-datetime";
import Select from "react-select";

/**
 * Field group input types.
 */
export type FieldInputType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "checkbox"
  | "select"
  | "datetimepicker"
  | "datepicker"
  | "timepicker";

/**
 * Field group input types map.
 */
export const InputTypes = Object.freeze({
  text: "text",
  number: "number",
  password: "password",
  email: "email",
  checkbox: "checkbox",
  select: "select",
  datetimepicker: "datetimepicker",
  datepicker: "datepicker",
  timepicker: "timepicker",
});

/**
 * Props for field group component.
 */
export interface IFieldGroupInputProps {
  /**
   * Field group component type/
   */
  type?: FieldInputType;

  /**
   * Placeholder text.
   */
  placeholder?: string;

  /**
   * Component id.
   */
  id?: string;

  /**
   * Component label.
   */
  label?: string;

  /**
   * Help message.
   */
  help?: string;

  /**
   * Validation state
   */
  validationState?: any;

  /**
   * Validation message.
   */
  validationMessage?: string;

  /**
   * Function which call when component focused.
   */
  onFocus?: () => void;

  /**
   * Function which call when component value changed.
   */
  onChange?: (e: any) => void;

  /**
   * Function which call when component lost focus.
   */
  onBlur?: (e: any) => void;

  /**
   * Timeout for showing failed validation message after user start input something.
   */
  validationDebounceTimeout?: number;

  /**
   * Fuction for get ref from input
   */
  refFunc?: (instance: any) => void;

  /**
   * Input component props.
   */
  inputProps?: object;
}

/**
 * Props for select component.
 */
export interface IFieldGroupSelectProps {
  /**
   * Select class.
   */
  selectClass?: string;

  /**
   * Select value.
   */
  value?: any;

  /**
   * FontAwesome icon name for close list button.
   */
  arrowIconUp?: string;

  /**
   * FontAwesome icon name for open list button.
   */
  arrowIconDown?: string;

  /**
   * FontAwesome icon size for open/close list buttons.
   */
  arrowsSize?: FontAwesome.FontAwesomeSize;

  /**
   * Arrow container class.
   */
  arrowContainerClass?: string;

  /**
   * If true to select component will be added button  which clear input.
   */
  clearable?: boolean;

  /**
   * If true to select component will be added ability to search needed value.
   */
  searchable?: boolean;

  /**
   * If true, select component can contains several selected items.
   */
  multi?: boolean;

  /**
   * Values for select component.
   */
  selectValues?: ISelectValue[];

  /**
   * Autofocus the select component on mount
   */
  autoFocus?: boolean;
}

/**
 * Select compnent object format.
 */
export interface ISelectValue {
  /**
   * Label which will be shown to user.
   */
  readonly label: string;

  /**
   * Unique item value, such as id.
   */
  readonly value: string | number;
}

/**
 * Props for datetime component.
 */
export interface IFieldGroupDateTimeProps {
  /**
   * Date component class.
   */
  dateTimeClass?: string;

  /**
   * Date format.
   */
  dateFormat?: boolean | string;

  /**
   * Time format.
   */
  timeFormat?: boolean | string;

  /**
   * Is input allowed?
   */
  input?: boolean;

  /**
   * Is open on startup?
   */
  open?: boolean;

  /**
   * Date/time locale.
   */
  locale?: string;

  /**
   * Use utc time?
   */
  utc?: boolean;

  /**
   * function which call on element blur.
   */
  onBlur?: (e: any) => void;

  /**
   * Strict parsing?
   */
  strictParsing?: boolean;

  /**
   * Close datetime on select?
   */
  closeOnSelect?: boolean;

  /**
   * Close on tab?
   */
  closeOnTab?: boolean;

  /**
   * Disable on clck outside?
   */
  disableOnClickOutside?: boolean;
}

/**
 * Combined props.
 */
export interface IFieldGroupProps extends IFieldGroupInputProps, IFieldGroupSelectProps, IFieldGroupDateTimeProps {}

/**
 * Field group component.
 */
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
    defaultValue: new Date(),
    selectValues: [] as ISelectValue[],
    validationDebounceTimeout: 1500,
    inputProps: {},
  };

  constructor(props: IFieldGroupProps) {
    super(props);

    this.state = {
      showValidation: null,
      validationTimeout: null,
    };
  }

  /**
   * Get element validation state.
   * @param validation current element validation state
   */
  public getValidationState(validation: any) {
    if (!validation || this.state.showValidation === false) {
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
      <FormGroup controlId={this.props.id} validationState={this.getValidationState(this.props.validationState)}>
        <ControlLabel>{this.props.label}</ControlLabel>
        {this.getCurrentRender()}
        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
        {this.state.showValidation !== false &&
        this.props.validationMessage &&
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

  private onChange = (e: any) => {
    this.setState({ showValidation: !!(this.props.validationState && this.props.validationState.valid) });

    if (!this.state.validationTimeout) {
      const timeout = setTimeout(() => {
        this.setState({ showValidation: true });
        this.setState({ validationTimeout: null });
      }, this.props.validationDebounceTimeout);
      this.setState({ validationTimeout: timeout });
    }
    this.props.onChange(e);
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
        onChange={this.onChange}
        onBlur={this.props.onBlur}
        autoFocus={this.props.autoFocus}
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

  private renderDateTimePicker() {
    return (
      <div className={this.props.dateTimeClass}>
        <ReactDatetime {...this.props} />
      </div>
    );
  }

  private renderDatePicker() {
    const { dateFormat, timeFormat, ...otherProps } = this.props;
    return (
      <div className={this.props.dateTimeClass}>
        <ReactDatetime dateFormat={dateFormat ? dateFormat : true} timeFormat={false} {...otherProps} />
      </div>
    );
  }

  private renderTimePicker() {
    const { dateFormat, timeFormat, ...otherProps } = this.props;
    return (
      <div className={this.props.dateTimeClass}>
        <ReactDatetime dateFormat={false} timeFormat={timeFormat ? timeFormat : true} {...otherProps} />
      </div>
    );
  }

  private renderCheckBox() {
    return <Checkbox value={this.props.value} onChange={this.onChange} />;
  }

  private renderTextInput() {
    return (
      <FormControl
        {...this.props.inputProps}
        onFocus={this.props.onFocus}
        onChange={this.onChange}
        onBlur={this.props.onBlur}
        type={this.props.type}
        placeholder={this.props.placeholder}
        value={this.props.value}
        inputRef={this.props.refFunc}
      />
    );
  }
}
