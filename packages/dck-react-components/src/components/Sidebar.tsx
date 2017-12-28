import * as React from "react";

import { SidebarItem } from "./SidebarItem";

export interface SidebarProps {
  containerClass?: string;
  headerContainerClass?: string;
  itemsContainerClass?: string;
  headerComponent?: JSX.Element;
  children: SidebarItem[];
}

export class Sidebar extends React.Component<SidebarProps, any> {
  public static defaultProps: Partial<SidebarProps> = {
    containerClass: "sidebar-container",
    headerContainerClass: "sidebar-header-container",
    itemsContainerClass: "sidebar-items-container"
  };

  public render() {
    return (
      <div className={this.props.containerClass}>
        <div className={this.props.headerContainerClass}>
          {this.props.headerComponent}
        </div>
        <ul className={this.props.itemsContainerClass}>{this.props.children}</ul>
      </div>
    );
  }
}
