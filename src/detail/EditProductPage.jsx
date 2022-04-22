
import AddEditNewProduct from "../profile/AddEditNewProduct";
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Grid } from "@material-ui/core";
import { CloseButton } from "react-bootstrap";
import { setMyProductsAction } from "../redux/actions/action";
import { useSelector } from "react-redux";



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function EditProductPage({showEditPage, setShowEditPage, fetchProduct}) {

    
    const singleProduct = useSelector(state => state.product.singleProduct)
    

    const classes = useStyles();
  
    const handleOpen = () => {
        setShowEditPage(true);
    };
  
    const handleClose = () => {
        setShowEditPage(false);
    };



    return ( 
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showEditPage}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showEditPage}>
          <div className={classes.paper}>
          <Grid container style={{display:showEditPage? "block":"none"}} >
        <CloseButton onClick={() => handleClose(false)}/>
              <Grid item xs={12}>
          <AddEditNewProduct singleProduct={singleProduct} handleClose={handleClose} fetchProduct={fetchProduct}/>
              </Grid>
      </Grid>
          </div>
        </Fade>
      </Modal>
       
     );
}

export default EditProductPage;