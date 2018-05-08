import * as React from "react";
import { Modal } from 'react-bootstrap' 
import * as Button from "react-bootstrap/lib/Button";
import * as ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import { Row, Col, Alert } from "react-bootstrap";
import "./styles.css"

export interface IModalDialog {
  title: string;
  show: boolean;
  children: any;
  cancelButtonTitle?: string;
  okButtonTitle?: string;
  cancelButtonStyle?: string;
  okButtonStyle?: string;
  okButtonDisabled?: boolean;
  onClose?: (e: any) => void;
  onOkClick?: (e: any) => void;
  modalProps?: any;
  onEnter?: (e: any) => void;
  isCancelHide?: boolean;
  isCancelDisabled?: boolean;
  cancelClick?: (e: any) => void;
  isOkHide?: boolean;
  bodyClass?: string;
  footerClass?: string;
  modalClass?: string;
  containerClass?: string;
  secondFooter?: string;
  CloseOnEscapePress?: boolean;
  backdrop?: string;
  hideCloseButton?: boolean;
  footer?: string;
  isAsyncOperationSuccess?: boolean;
  isAsyncOperationFailed?: boolean;
  asyncOperationFailedMessage?: string;
  onAsyncOperationSuccess?: () => void;
}

export class ModalDialog extends React.Component<IModalDialog, any> {
  public static defaultProps = {
    cancelButtonTitle: "Cancel",
    okButtonTitle: "Ok",
    show: false,
  };

  constructor(props: IModalDialog) {
    super(props);
    this.state={
        isAsyncProcessed: false,
        show: false
    }
  }

   componentWillReceiveProps(nextProps:any){
    const newShowState = nextProps.isAsyncOperationSuccess && this.state.isAsyncProcessed ? false : nextProps.show 
    this.setState({
        show: newShowState,
        isAsyncProcessed: false
    }
    );
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
            {this.props.isAsyncOperationFailed ? 
                <Alert bsStyle="warning">
                {this.props.asyncOperationFailedMessage}
                </Alert>
            :   ""
            }
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
                        : (e) => {if(this.props.onClose)this.props.onClose(e); this.setState({show:false})}
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
                    onClick={this.props.onOkClick ? (e)=>{this.setState({isAsyncProcessed: true}); this.props.onOkClick(e);} : null}
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

export default ModalDialog;
