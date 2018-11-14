import * as React from "react";
import { ControlLabel, FormControl, Checkbox, FormGroup, HelpBlock, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FontAwesomeProps from "@fortawesome/fontawesome-svg-core";
import * as ReactDatetime from "react-datetime";
import Select from "react-select";
import * as Autosuggest from "react-autosuggest";
import "./styles.css";

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
  | "timepicker"
  | "autocomplete"
  ;

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
  autocomplete: "autocomplete",
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
  arrowIconUp?: FontAwesomeProps.IconProp;

  /**
   * FontAwesome icon name for open list button.
   */
  arrowIconDown?: FontAwesomeProps.IconProp;

  /**
   * FontAwesome icon size for open/close list buttons.
   */
  arrowsSize?: FontAwesomeProps.SizeProp;

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

export interface IFieldGroupAutocompleteProps {
  /**
   * A function that returns input value for autocomplete
   */
  getAutocompleteValue?: (obj: ISelectValue) => string;

  /**
   * Values for autocomplete component.
   */
  autocompleteValues?: ISelectValue[];

  /**
   * This function will be called every time you might need to update autocomplete
   */
  onAutocompleteUpdateRequested?: Autosuggest.SuggestionsFetchRequested;

  /**
   * Will be called every time you need to set suggestions to []
   */
  onAutocompleteClearRequested?: () => void;

  /**
   * Autocomplete render
   */
  renderAutocomplete?: (suggestion: ISelectValue, props: object) => any;

  /**
   * Current input value
   */
  autocompleteInputValue?: string;

  /**
   * Input change event handler
   */
  onAutocompleteInputChange?: (event: React.FormEvent<any>, params: Autosuggest.ChangeEvent) => void;

  /**
   * Autocomplete input props
   */
  autocompleteInputProps?: any;

  /**
   * Css class for html input
   */
  autocompleteInputClass?: string,
  
  /**
   * Css class for autocomplete container
   */
  autocompleteContainerOpenClass?: string
}

/**
 * Combined props.
 */
export interface IFieldGroupProps extends IFieldGroupInputProps, IFieldGroupSelectProps,
 IFieldGroupDateTimeProps, IFieldGroupAutocompleteProps { }

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
    getAutocompleteValue: (obj: ISelectValue) => obj.label,
    autocompleteValues: [] as ISelectValue[],
    onAutocompleteUpdateRequested: (request: Autosuggest.SuggestionsFetchRequestedParams) => {},
    onAutocompleteClearRequested: () => {},
    autocompleteInputValue: '',
    autocompleteInputProps: {},
    onAutocompleteInputChange: (event: React.FormEvent<any>, params: Autosuggest.ChangeEvent) => {},
    renderAutocomplete: (suggestion: ISelectValue, props: object) => (<span>{suggestion.label}</span>),
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
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        {this.getCurrentRender()}
        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
        {this.state.showValidation !== false &&
          this.props.validationMessage &&
          this.props.validationState &&
          !this.props.validationState.valid ? (
            <HelpBlock>
              <FontAwesomeIcon icon="exclamation-circle" />&nbsp;
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
      case InputTypes.autocomplete:
        render = this.renderAutocomplete();
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
        {...this.props.inputProps}
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
                <FontAwesomeIcon
                  icon={this.props.arrowIconUp}
                  {...this.props.arrowsSize && {
                    size: this.props.arrowsSize,
                  }}
                />
              ) : (
                  <FontAwesomeIcon
                    icon={this.props.arrowIconDown}
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

  private renderAutocomplete() {
    const { autocompleteInputValue, onAutocompleteInputChange, autocompleteInputProps, autocompleteInputClass, autocompleteContainerOpenClass, ...otherProps } = this.props;
    const theme = {
      container:                'react-autosuggest__container',
      containerOpen:            'react-autosuggest__container--open',
      input:                    autocompleteInputClass || 'form-control',
      inputOpen:                'react-autosuggest__input--open',
      inputFocused:             'react-autosuggest__input--focused',
      suggestionsContainer:     'react-autosuggest__suggestions-container',
      suggestionsContainerOpen: autocompleteContainerOpenClass || 'react-autosuggest__suggestions-container--open',
      suggestionsList:          'react-autosuggest__suggestions-list',
      suggestion:               'react-autosuggest__suggestion',
      suggestionFirst:          'react-autosuggest__suggestion--first',
      suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
      sectionContainer:         'react-autosuggest__section-container',
      sectionContainerFirst:    'react-autosuggest__section-container--first',
      sectionTitle:             'react-autosuggest__section-title'
    };
    return <Autosuggest
    { ...otherProps}
    suggestions={this.props.autocompleteValues}
    onSuggestionsFetchRequested = {this.props.onAutocompleteUpdateRequested}
    onSuggestionsClearRequested= {this.props.onAutocompleteClearRequested}
    renderSuggestion={this.props.renderAutocomplete}
    getSuggestionValue = {this.props.getAutocompleteValue}
    theme={theme}
    inputProps={Object.assign(autocompleteInputProps, {value: autocompleteInputValue, onChange: onAutocompleteInputChange})}
    />;
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
