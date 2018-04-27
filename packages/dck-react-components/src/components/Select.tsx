import * as React from "react";
import Select from "react-select";
import * as FontAwesome from "react-fontawesome";

export interface ISelectProps {
  containerClass?: string;
  selectClass?: string;
  placeholderText?: string;
  value?: string;
  clearable?: boolean;
  searchable?: boolean;
  multi?: boolean;
  values: any[];
  onChange: (e: any) => void;
  arrowIconUp?: string;
  arrowIconDown?: string;
  arrowsSize?: FontAwesome.FontAwesomeSize;
  arrowContainerClass?: string;
}

export class DckSelect extends React.Component<ISelectProps, any> {
  public static defaultProps = {
    containerClass: "select-container-class",
    selectClass: "select-class",
    placeholderText: "Select value",
    clearable: false,
    multi: false,
    arrowIconUp: "angle-up",
    arrowIconDown: "angle-down",
    arrowContainerClass: "arrow-container",
  };

  public render() {
    return (
      <div className={this.props.containerClass}>
        <Select
          className={this.props.selectClass}
          placeholder={this.props.placeholderText}
          value={this.props.value}
          clearable={this.props.clearable}
          searchable={this.props.searchable}
          multi={this.props.multi}
          options={this.props.values}
          onChange={(event) => {
            if (event) {
              this.props.onChange(event);
            }
          }}
          arrowRenderer={(action): JSX.Element => {
            return (
              <span className="selectfilterTypeArrow">
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
      </div>
    );
  }
}
