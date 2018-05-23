import * as React from "react";
import { Link } from "react-router";
import * as FontAwesome from "react-fontawesome";

/**
 * Sidebar item props.
 */
export interface ISidebarItemProps {
  /**
   * On click redirect to.
   */
  to: string;

  /**
   * Is item location path are external?
   */
  external?: boolean;

  /**
   * Sidebar item class.
   */
  itemClass?: string;

  /**
   * Sidebar item active class.
   */
  activeClass?: string;

  /**
   * Sidebar item FontAwesome icon.
   */
  icon?: string;

  /**
   * Icon container class.
   */
  iconContainerClass?: string;

  /**
   * FownAwesome icon size.
   */
  iconSize?: FontAwesome.FontAwesomeSize;

  /**
   * Sidebar item text.
   */
  children: Node;

  /**
   * Sidebar item text class.
   */
  textClass?: string;
}

/**
 * Sidebar item.
 */
export class SidebarItem extends React.Component<ISidebarItemProps, any> {
  public static defaultProps: Partial<ISidebarItemProps> = {
    itemClass: "sidebar-item",
    activeClass: "active",
    iconContainerClass: "sidebar-item-icon-container",
    iconSize: "lg",
    textClass: "sidebar-item-text",
    external: false,
  };

  public render() {
    return (
      <li className={this.props.itemClass}>
        {this.props.external ? this.renderExternalLink() : this.renderInternalLink()}
      </li>
    );
  }

  private renderInternalLink() {
    return (<Link to={this.props.to} activeClassName={this.props.activeClass}>
      <div className={this.props.iconContainerClass}>
        <FontAwesome name={this.props.icon} size={this.props.iconSize} />
      </div>
      <span className={this.props.textClass}>{this.props.children}</span>
    </Link>);
  }

  private renderExternalLink() {
    return (<a href={this.props.to}>
      <div className={this.props.iconContainerClass}>
        <FontAwesome name={this.props.icon} size={this.props.iconSize} />
      </div>
      <span className={this.props.textClass}>{this.props.children}</span>
    </a>);
  }
}
