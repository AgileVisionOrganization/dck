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
      <div className="sidebar-container">
        <div className="sidebar-header-container">
          {this.props.headerComponent}
        </div>
        <ul className="sidebarItems">{this.props.children}</ul>
      </div>
    );
  }
}
