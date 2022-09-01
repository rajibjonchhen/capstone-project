import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfilePaginationAction } from '../redux/actions/action';

export default function DeleteConfirmation(props) {

    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const singleProduct = useSelector(state => state.product.singleProduct)

    useEffect(() => {
        // console.log(singleProduct," from useEffect lets delete singleProduct", props.singleProduct._id)

    },[])

    const deleteProduct = async () => {
        console.log(singleProduct,"lets delete singleProduct", props.singleProduct._id)
        try {
          const response = await fetch(
            `${process.env.REACT_APP_PROD_BE_URL}/products/me/${props.singleProduct._id}`,
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
            // props.fetchMyProducts()
            dispatch(setProfilePaginationAction("My Products"))
            navigate("/profile")
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
           Are you sure? Do you really want to delete your project?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-auto">
            <div className="d-flex justify-around">
                <img src={props.singleProduct?.images[0] } alt={props.product?.title} width="150px"/>
                <div>
                    <h3> {props.singleProduct?.title}</h3>
                    <p>
                    {props.singleProduct?.summary}
                    </p>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {deleteProduct();props.onHide()}}>Confirm</Button>
          <Button onClick={() => {props.onHide()}}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }