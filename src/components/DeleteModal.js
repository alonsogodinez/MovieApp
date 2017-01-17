import React from 'react'
import { Modal, ModalHeader } from 'react-bootstrap'


export default class deleteModal extends React.Component{

  render(){
    return (
      <Modal show={this.props.showModal} onHide={this.props.close}>
        <ModalHeader closeButton>
          <Modal.Title>Delete this</Modal.Title>
        </ModalHeader>
        <Modal.Body className="">
          <p> Are you sure ?</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={this.props.deleteEntity}
            className="btn btn-primary">
            Yes
          </button>
          <button
            onClick={this.props.close}
            className="btn btn-default">
            No
          </button>
        </Modal.Footer>

      </Modal>
    )
  }
}