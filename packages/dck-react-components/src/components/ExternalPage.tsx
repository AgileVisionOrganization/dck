import * as React from "react";
import * as Grid from "react-bootstrap/lib/Grid";
import * as Row from "react-bootstrap/lib/Row";
import * as Col from "react-bootstrap/lib/Col";

export interface ExternalPageProps {
  header: JSX.Element | string;
  subheader?: JSX.Element | string;
  footer?: JSX.Element | string;
  children: React.ReactNode;
  pageContainerClass?: string;
  pageHeaderClass?: string;
  pageSubheaderClass?: string;
  pageContentClass?: string;
  pageFormContainerClass?: string;
  pageFormClass?: string;
  onSubmit?: () => void;
}

export class ExternalPage extends React.Component<ExternalPageProps, any> {
  public static defaultProps = {
    pageContainerClass: "external-page-container",
    pageHeaderClass: "external-page-header-container",
    pageContentClass: "external-page-content",
    pageFormContainerClass: "external-page-form-container",
    pageFormClass: "external-page-form",
    pageSubheaderClass: "external-page-subheader"
  };

  render() {
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
                onSubmit={e => {
                  this.props.onSubmit && this.props.onSubmit();
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
