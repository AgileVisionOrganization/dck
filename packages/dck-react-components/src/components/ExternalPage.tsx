import * as React from "react";
import { Grid, Row, Col } from "react-bootstrap";

/**
 * External page props.
 */
export interface IExternalPageProps {
  /**
   * Page header string or component.
   */
  header: JSX.Element | string;

  /**
   * Page subheader.
   */
  subheader?: JSX.Element | string;

  /**
   * Page footer.
   */
  footer?: JSX.Element | string;

  /**
   * Page content.
   */
  children: React.ReactNode;

  /**
   * Page container class.
   */
  pageContainerClass?: string;

  /**
   * Page header class.
   */
  pageHeaderClass?: string;

  /**
   * Page subheader class.
   */
  pageSubheaderClass?: string;

  /**
   * Page content class.
   */
  pageContentClass?: string;

  /**
   * Form container class.
   */
  pageFormContainerClass?: string;

  /**
   * Form container.
   */
  pageFormClass?: string;

  /**
   * Form submit function.
   */
  onSubmit?: () => void;
}

/**
 * External page component.
 */
export class ExternalPage extends React.Component<IExternalPageProps, any> {
  public static defaultProps = {
    pageContainerClass: "external-page-container",
    pageHeaderClass: "external-page-header-container",
    pageContentClass: "external-page-content",
    pageFormContainerClass: "external-page-form-container",
    pageFormClass: "external-page-form",
    pageSubheaderClass: "external-page-subheader",
  };

  public render() {
    return (
      <Grid bsClass={this.props.pageContainerClass}>
        <Row className={`${this.props.pageContentClass} row`}>
          <Col
            md={6}
            mdOffset={3}
            className={`${this.props.pageContentClass} col`}
          >
            <div className={this.props.pageFormContainerClass}>
              <h1 className={this.props.pageHeaderClass}>
                {this.props.header}
              </h1>
              <h2 className={this.props.pageSubheaderClass}>
                {this.props.subheader}
              </h2>
              <form
                className={this.props.pageFormClass}
                onSubmit={(e) => {
                  if (this.props.onSubmit) {
                    this.props.onSubmit();
                  }
                  e.preventDefault();
                }}
              >
                {this.props.children}
                {this.props.footer}
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
