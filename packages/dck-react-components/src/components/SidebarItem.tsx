import * as React from "react";
import { Link } from "react-router";
import * as FontAwesome from "react-fontawesome";

export interface SidebarItemProps {
  to: string;
  external?: boolean;
  itemClass?: string;
  activeClass?: string;
  icon?: string;
  iconContainerClass?: string;
  iconSize?: FontAwesome.FontAwesomeSize;
  children: Node;
  textClass?: string;
}

export class SidebarItem extends React.Component<SidebarItemProps, any> {
  public static defaultProps: Partial<SidebarItemProps> = {
    itemClass: "sidebar-item",
    activeClass: "active",
    iconContainerClass: "sidebar-item-icon-container",
    iconSize: "lg",
    textClass: "sidebar-item-text",
    external: false
  };


  renderInternalLink() {
    return (<Link to={this.props.to} activeClassName={this.props.activeClass}>
      <div className={this.props.iconContainerClass}>
        <FontAwesome name={this.props.icon} size={this.props.iconSize} />
      </div>
      <span className={this.props.textClass}>{this.props.children}</span>
    </Link>)
  }

  renderExternalLink() {
    return (<a href={this.props.to}>
      <div className={this.props.iconContainerClass}>
        <FontAwesome name={this.props.icon} size={this.props.iconSize} />
      </div>
      <span className={this.props.textClass}>{this.props.children}</span>
    </a>)
  }

  public render() {
    return (
      <li className={this.props.itemClass}>
        {this.props.external? this.renderExternalLink() : this.renderInternalLink()}
      </li>
    );
  }
}
