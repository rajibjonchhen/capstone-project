import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

function DeleteConfirmation({openDeleteConfirm, setOpenDeleteConfirm}) {
 
    const [show, setShow] = useState(false);
        // <Button variant="primary" onClick={handleShow}>
        //   Launch demo modal
        // </Button>
  return(
        <Modal show={openDeleteConfirm} onHide={setOpenDeleteConfirm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={setOpenDeleteConfirm(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={setOpenDeleteConfirm(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }
  
export default DeleteConfirmation