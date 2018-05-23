import * as React from "react";

import { SidebarItem } from "./SidebarItem";

/**
 * Sidebar component props.
 */
export interface ISidebarProps {
  /**
   * Sidebar container class.
   */
  containerClass?: string;

  /**
   * Header container class.
   */
  headerContainerClass?: string;

  /**
   * Sidebar items container class.
   */
  itemsContainerClass?: string;

  /**
   * Sidebar header component.
   */
  headerComponent?: JSX.Element;

  /**
   * Sidebar items.
   */
  children: SidebarItem[];
}

/**
 * Sidebar component.
 * Used to navigation on the dashboard.
 */
export class Sidebar extends React.Component<ISidebarProps, any> {
  public static defaultProps: Partial<ISidebarProps> = {
    containerClass: "sidebar-container",
    headerContainerClass: "sidebar-header-container",
    itemsContainerClass: "sidebar-items-container",
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
