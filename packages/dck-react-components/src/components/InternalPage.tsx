import * as React from "react";

/**
 * Internal page props.
 */
export interface InternalPageProps {
  /**
   * Page title.
   */
  title?: string;

  /**
   * Page header component.
   */
  headerComponent: JSX.Element;

  /**
   * Page content.
   */
  children: JSX.Element[];

  /**
   * Page container class.
   */
  pageContainerClass?: string;

  /**
   * Header container class.
   */
  pageHeaderContainerClass?: string;

  /**
   * Page content class.
   */
  pageContentClass?: string;
}

/**
 * Internal page component.
 */
export class InternalPage extends React.Component<InternalPageProps, any> {
  public static defaultProps = {
    pageContainerClass: "page-container",
    pageHeaderContainerClass: "page-header-container",
    pageContentClass: "page-content",
  };

  public render() {
    return (
      <div className={this.props.pageContainerClass}>
        <div className={this.props.pageHeaderContainerClass}>
          {this.props.title && <h1>{this.props.title}</h1>}
          {this.props.headerComponent}
        </div>
        <div className={this.props.pageContentClass}>{this.props.children}</div>
      </div>
    );
  }
}
