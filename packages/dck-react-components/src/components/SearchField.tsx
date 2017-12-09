import * as React from "react";
import * as FormGroup from "react-bootstrap/lib/FormGroup";
import * as InputGroup from "react-bootstrap/lib/InputGroup";
import * as FormControl from "react-bootstrap/lib/FormControl";
import * as FontAwesome from "react-fontawesome";

export type InputType = "text" | "password" | "email";

export interface SearchFieldProps {
  onFocus?: () => void;
  onChange?: (e: any) => void;
  fieldGroupClass?: string;
  addonClass?: string;
  addonFocusClass?: string;
  inputClass?: string;
  icon?: string;
  id?: string;
  type?: InputType;
  placeholder?: string;
  value?: string;
}

export interface SearchFieldState {
  focused: Boolean;
}

export class SearchField extends React.Component<
  SearchFieldProps,
  Partial<SearchFieldState>
> {
  public static defaultProps: Partial<SearchFieldProps> = {
    icon: "search",
    fieldGroupClass: "search-field-group",
    addonClass: "search-addon input-group-addon",
    addonFocusClass: "search-addon-focus",
    inputClass: "search-input",
    type: "text"
  };

  constructor(props: SearchFieldProps) {
    super(props);
    this.state = { focused: false };
  }

  handleBlur() {
    this.setState({ focused: false });
  }

  handleFocus() {
    this.setState({ focused: true });
    this.props.onFocus && this.props.onFocus();
  }

  render() {
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
}
