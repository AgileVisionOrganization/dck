import * as React from "react";
import * as Spinner from "react-spinkit";

/**
 * Progress overlay props.
 */
export interface IProgressOverlayProps {
  /**
   * Component content.
   */
  children: JSX.Element;

  /**
   * Overlay wrapper class.
   */
  overlayWrapperClass?: string;

  /**
   * Overlay container class.
   */
  overlayContainerClass?: string;

  /**
   * Spinner container class.
   */
  spinnerContainerClass?: string;

  /**
   * Spinner type.
   */
  spinnerType?: any;

  /**
   * Spinner color.
   */
  spinnerColor?: string;

  /**
   * Spinner fade in?
   */
  spinnerFadeIn?: any;

  /**
   * Component visible?
   */
  visible?: boolean;
}

/**
 * Progress overlay state.
 */
export interface IProgressOverlayState {}

/**
 * Progress overlay component.
 * Can be used to wait some async process.
 */
export class ProgressOverlay extends React.Component<
  IProgressOverlayProps,
  Partial<IProgressOverlayState>
> {
  public static defaultProps: Partial<IProgressOverlayProps> = {
    spinnerColor: "red",
    spinnerType: "double-bounce",
    spinnerFadeIn: "none",
    overlayWrapperClass: "progress-overlay-wrapper",
    overlayContainerClass: "progress-overlay-container",
    spinnerContainerClass: "spinner-container",
    visible: false,
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
