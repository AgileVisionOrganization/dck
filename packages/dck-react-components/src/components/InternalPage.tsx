import * as React from "react";

export interface InternalPageProps {
  title?: string;
  headerComponent: JSX.Element;
  children: JSX.Element[];
  pageContainerClass?: string;
  pageHeaderContainerClass?: string;
  pageContentClass?: string;
}

export class InternalPage extends React.Component<InternalPageProps, any> {
  public static defaultProps = {
    pageContainerClass: "page-container",
    pageHeaderContainerClass: "page-header-container",
    pageContentClass: "page-content"
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
