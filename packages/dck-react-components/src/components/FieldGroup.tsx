import * as React from "react";
import * as ControlLabel from "react-bootstrap/lib/ControlLabel";
import * as FormControl from "react-bootstrap/lib/FormControl";
import * as Checkbox from "react-bootstrap/lib/Checkbox";
import * as FormGroup from "react-bootstrap/lib/FormGroup";
import * as HelpBlock from "react-bootstrap/lib/HelpBlock";
import * as InputGroup from "react-bootstrap/lib/InputGroup";
import * as FontAwesome from "react-fontawesome";
import * as DateTime from "react-datetime";

export type FieldInputType = "text" | "password" | "email" | "checkbox" | "datepicker";

export interface FieldGroupProps {
  type?: FieldInputType;
  placeholder?: string;
  id?: string;
  label?: string;
  help?: string;
  validationState?: any;
  validationMessage?: string;
  onFocus?: () => void;
  onChange?: (e: any) => void;
  value?: any;
}

export class FieldGroup extends React.Component<FieldGroupProps, any> {
  public static defaultProps = {
    type: "text",
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
        {this.props.type === "checkbox"? 

        <Checkbox value={this.props.value} onChange={this.props.onChange} /> :
        
        <FormControl
          onFocus={this.props.onFocus}
          onChange={this.props.onChange}
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
        />
        }
        
        {" "}
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
}

export default FieldGroup;
