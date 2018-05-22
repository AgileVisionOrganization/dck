import * as React from "react";
import {FormGroup, InputGroup, FormControl} from "react-bootstrap";
import * as FontAwesome from "react-fontawesome";

/**
 * Search field input type.
 */
export type InputType = "text" | "password" | "email";

/**
 * Search field props.
 */
export interface ISearchFieldProps {
  /**
   * On focus function.
   */
  onFocus?: () => void;

  /**
   * On change function.
   */
  onChange?: (e: any) => void;

  /**
   * Field group class.
   */
  fieldGroupClass?: string;

  /**
   * Field group addon class.
   */
  addonClass?: string;

  /**
   * Addon focus class.
   */
  addonFocusClass?: string;

  /**
   * Input field class.
   */
  inputClass?: string;

  /**
   * FontAwesome icon for search field.
   */
  icon?: string;

  /**
   * Input id.
   */
  id?: string;

  /**
   * Input type.
   */
  type?: InputType;

  /**
   * Input placeholder.
   */
  placeholder?: string;

  /**
   * Input value.
   */
  value?: string;
}

/**
 * Search field default state.
 */
export interface ISearchFieldState {
  focused: boolean;
}

/**
 * Search field component.
 */
export class SearchField extends React.Component<
  ISearchFieldProps,
  Partial<ISearchFieldState>
> {
  public static defaultProps: Partial<ISearchFieldProps> = {
    icon: "search",
    fieldGroupClass: "search-field-group",
    addonClass: "search-addon input-group-addon",
    addonFocusClass: "search-addon-focus",
    inputClass: "search-input",
    type: "text",
  };

  constructor(props: ISearchFieldProps) {
    super(props);
    this.state = { focused: false };
  }

  public render() {
    const addonClass = this.state.focused
      ? "search-addon input-group-addon search-addon-focus"
      : "search-addon input-group-addon";

    return (
      <FormGroup
        controlId={this.props.id}
        bsClass={`form-group ${this.props.fieldGroupClass}`}
      >
        <InputGroup>
          <InputGroup.Addon className={this.props.addonClass}>
            <FontAwesome name={this.props.icon} />
          </InputGroup.Addon>
          <FormControl
            bsClass={`form-control ${this.props.inputClass}`}
            onFocus={() => this.handleFocus()}
            onBlur={() => this.handleBlur()}
            onChange={this.props.onChange}
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
          />
        </InputGroup>
      </FormGroup>
    );
  }
  private handleBlur() {
    this.setState({ focused: false });
  }

  private handleFocus() {
    this.setState({ focused: true });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }
}
