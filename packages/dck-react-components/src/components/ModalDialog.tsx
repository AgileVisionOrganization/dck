import * as React from "react";
import { Row, Col, Alert, Button, ButtonGroup, Modal } from "react-bootstrap";
import "./styles.css";

/**
 * Modal dialog props.
 */
export interface IModalDialog {
  /**
   * Modal dialog title.
   */
  title: string;

  /**
   * If true, modal dialog will be shown.
   */
  show: boolean;

  /**
   * Dialog content.
   */
  children: any;

  /**
   * Cancel button title.
   */
  cancelButtonTitle?: string;

  /**
   * Ok button title.
   */
  okButtonTitle?: string;

  /**
   * Cancel button style.
   */
  cancelButtonStyle?: string;

  /**
   * Ok button style.
   */
  okButtonStyle?: string;

  /**
   * Ok button diabled?
   * Can be used to avoid clicks while some process running.
   */
  okButtonDisabled?: boolean;

  /**
   * The function which will be called when modal dialog closed.
   */
  onClose?: (e: any) => void;

  /**
   * The function which will be call when user press on the ok button.
   */
  onOkClick?: (e: any) => void;

  /**
   * Modal dialog props.
   */
  modalProps?: any;

  /**
   * On enter press.
   */
  onEnter?: (e: any) => void;

  /**
   * Is cancel hide?
   */
  isCancelHide?: boolean;

  /**
   * Is cancel disabled?
   */
  isCancelDisabled?: boolean;

  /**
   * The function which will be call when user press on the cancel button.
   */
  cancelClick?: (e: any) => void;

  /**
   * Is ok button hide?
   */
  isOkHide?: boolean;

  /**
   * Body class.
   */
  bodyClass?: string;

  /**
   * Modal footer class.
   */
  footerClass?: string;

  /**
   * Modal class.
   */
  modalClass?: string;

  /**
   * Container class.
   */
  containerClass?: string;

  /**
   * Additional footer.
   */
  secondFooter?: string;

  /**
   * Close modal on the escape button press.
   */
  CloseOnEscapePress?: boolean;

  /**
   * Modal backdrop.
   */
  backdrop?: string;

  /**
   * Hide close button?
   */
  hideCloseButton?: boolean;

  /**
   * Footer component.
   */
  footer?: JSX.Element;

  /**
   * Async process success state, if this value will be true, the modal dialog will be closed.
   */
  isAsyncOperationSuccess?: boolean;

  /**
   * Async process failed state, if this value will be true, the modal dialog show to user error message.
   */
  isAsyncOperationFailed?: boolean;

  /**
   * Failed process error message.
   */
  asyncOperationFailedMessage?: string;

  /**
   * The function which will be call when async process end successfully.
   */
  onAsyncOperationSuccess?: () => void;
}

/**
 * Modal Dialog component.
 */
export class ModalDialog extends React.Component<IModalDialog, any> {
  public static defaultProps = {
    cancelButtonTitle: "Cancel",
    okButtonTitle: "Ok",
    show: false,
  };

  constructor(props: IModalDialog) {
    super(props);
    this.state = {
      isAsyncProcessed: false,
      show: false,
    };
  }

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.isAsyncOperationSuccess && this.state.isAsyncProcessed) {
      this.props.onAsyncOperationSuccess();
    }
    const newShowState =
      nextProps.isAsyncOperationSuccess && this.state.isAsyncProcessed
        ? false
        : nextProps.show;
    this.setState({
      show: newShowState,
      isAsyncProcessed: false,
    });
  }

  public render() {
    return (
      <div className={this.props.containerClass}>
        <Modal
          show={this.state.show}
          onHide={this.props.onClose}
          onEnter={this.props.onEnter}
          className={this.props.modalClass}
          keyboard={this.props.CloseOnEscapePress ? true : false}
          backdrop={this.props.backdrop}
        >
          <Modal.Header
            className="modal-dialog-close"
            closeButton={!this.props.hideCloseButton}
          >
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            className={this.props.bodyClass ? this.props.bodyClass : ""}
          >
            {this.props.children}
            {this.props.isAsyncOperationFailed ? (
              <Alert bsStyle="warning">
                {this.props.asyncOperationFailedMessage}
              </Alert>
            ) : (
              ""
            )}
          </Modal.Body>
          <Modal.Footer
            className={this.props.footerClass ? this.props.footerClass : ""}
          >
            {!this.props.footer ? (
              <Row className="modal-dialog-footer">
                {!this.props.isCancelHide ? (
                  <Button
                    bsSize="large"
                    disabled={this.props.isCancelDisabled}
                    onClick={
                      this.props.cancelClick
                        ? this.props.cancelClick
                        : (e) => {
                            if (this.props.onClose) {
                              this.props.onClose(e);
                            }
                            this.setState({ show: false });
                          }
                    }
                    className={
                      this.props.cancelButtonStyle
                        ? this.props.cancelButtonStyle
                        : "modal-dialog-cancel-button"
                    }
                  >
                    {this.props.cancelButtonTitle}
                  </Button>
                ) : (
                  ""
                )}
                {!this.props.isOkHide ? (
                  <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={
                      this.props.onOkClick
                        ? (e) => {
                            this.setState({ isAsyncProcessed: true });
                            this.props.onOkClick(e);
                          }
                        : null
                    }
                    disabled={this.props.okButtonDisabled}
                    className={
                      this.props.okButtonStyle
                        ? this.props.okButtonStyle
                        : "modal-dialog-ok-button"
                    }
                  >
                    {this.props.okButtonTitle}
                  </Button>
                ) : (
                  ""
                )}
              </Row>
            ) : (
              this.props.footer
            )}
            {this.props.secondFooter}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}