import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function DeleteConfirmation(props) {

    const [error, setError] = useState("")


    const deleteProduct = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_DEV_BE_URL}/products/me/${props.product._id}`,
            {
              method: "DELETE",
              headers: {
                authorization: localStorage.getItem("MyToken"),
              },
            }
          );
          if (response.status !== 200) {
            const data = await response.json();
            console.log(data);
            setError(data.error);
            setTimeout(() => setError(""), 2000)
          } else {
            const data = await response.json();
            console.log("data deleted successfully");
            props.fetchMyProducts()
          }
        } catch (error) {
          console.log(error);
        }
      };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Are you sure? Do you really want to delete you creation?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-auto">
            <div className="d-flex justify-around">
                <img src={props.product?.images[0] || "https://res.cloudinary.com/dai5duzoj/image/upload/v1649986446/creators-space-products/lw8f79wcrzpqa4eqeane.png"} alt={props.product?.title} width="150px"/>
                <div>
                    <h3> {props.product?.title}</h3>
                    <p>
                    {props.product?.summary}
                    </p>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {props.onHide()}}>Confirm</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }