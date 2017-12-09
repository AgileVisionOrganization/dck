import * as React from "react";
import * as Spinner from "react-spinkit";

export interface ProgressOverlayProps {
  children: JSX.Element;
  overlayWrapperClass?: string;
  overlayContainerClass?: string;
  spinnerContainerClass?: string;
  spinnerType?: any;
  spinnerColor?: string;
  spinnerFadeIn?: any;
  visible?: boolean;
}

export interface ProgressOverlayState {}

export class ProgressOverlay extends React.Component<
  ProgressOverlayProps,
  Partial<ProgressOverlayState>
> {
  public static defaultProps: Partial<ProgressOverlayProps> = {
    spinnerColor: "red",
    spinnerType: "double-bounce",
    spinnerFadeIn: "none",
    overlayWrapperClass: "progress-overlay-wrapper",
    overlayContainerClass: "progress-overlay-container",
    spinnerContainerClass: "spinner-container",
    visible: false
  };

  public render() {
    return this.props.visible ? (
      <div className={this.props.overlayWrapperClass}>
        <div className={this.props.overlayContainerClass}>
          {this.props.children}
          <div className={this.props.spinnerContainerClass}>
            <Spinner
              name={this.props.spinnerType}
              color={this.props.spinnerColor}
              fadeIn={this.props.spinnerFadeIn}
            />
          </div>
        </div>
      </div>
    ) : null;
  }
}
