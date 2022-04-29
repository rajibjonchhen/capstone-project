import * as React from "react";
import { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Avatar, Grid } from "@material-ui/core";
import { Box, Button, Container } from "@mui/material";
import MessageForm from "./MessageForm";
import "./detailPage.css";
import EditProductPage from "./EditProductPage";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSingleProductAction } from "../redux/actions/action";

function DetailPage() {
  const [successMsg, setSuccessMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMeeting, setShowMeeting] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [newProductErr, setNewProductErr] = useState({});
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const singleProduct = useSelector((state) => state.product.singleProduct);
  const myInfo = useSelector((state) => state.user.myInfo);
  const [imgNum, setImgNum] = useState(0);

  const dispatch = useDispatch()
  const params = useParams()
  useEffect(() => {
    window.scrollTo(0,0)
    let productId = params.productId
    if(productId){
      fetchProduct(productId)
    }
  },[])

  useEffect(() => {
    if (isSubmit && selectedImages.length > 0) {
      console.log("selected img from useEffect", selectedImages)
      uploadImages();
    }
  }, [selectedImages]);

  const handleNext = () => {
    if (
      singleProduct.images.length > 1 &&
      imgNum !== singleProduct.images.length - 1
    ) {
      setImgNum(imgNum + 1);
    }
  };
  const handlePrev = () => {
    if (imgNum >= 1) {
      setImgNum(imgNum - 1);
    }
  };

const fetchProduct = async(productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_DEV_BE_URL}/products/${productId}`,
      {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("MyToken"),
        },
      }
    );
    if (response.status !== 200) {
      const data = await response.json();
      console.log(data, response.status);
      setError(data.error);
    } else {
      const data = await response.json();
      console.log(data.product);
      dispatch(setSingleProductAction(data.product))
      setIsLoading(false);
    }
  } catch (error) {
    console.log(error)
  }
}

  const uploadImages = async (files) => {
    const userData = new FormData();

    for(let i= 0; i <= selectedImages.length; i++){
      userData.append(`images`,selectedImages[i])
    }

    try {
      
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/products/me/${singleProduct._id}/images`,
        {
          method: "POST",
          body: userData,
          headers: {
            authorization: localStorage.getItem("MyToken"),
          },
        }
      );
      if (response.status !== 200) {
        const data = await response.json();
        console.log("response not 200 data, response.status",data, response.status);
        setError(data.error);
      } else {
        const data = await response.json();
        console.log(data);
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 1000);
        if (response.status !== 200) {
          const data = await response.json();
          console.log(data, response.status);
          setError(data.error);
        } else {
          const data = await response.json();
          console.log(data.updatedProduct);
          dispatch(setSingleProductAction(data.updatedProduct))
          fetchProduct(singleProduct._id)
          setSuccessMsg(true);
          setIsLoading(false);
          setTimeout(() => setSuccessMsg(false), 1000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelection = async (e) => {
    setSelectedImages(e.target.files)
    
     setIsSubmit(true);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={{position:'relative'}}>
          <div
            className="image-box"
            style={{
           
            }}
          >
            <img
              style={{ width: "100%" }}
              src={singleProduct?.images &&
                singleProduct?.images[imgNum] ||
                "https://via.placeholder.com/300"
              }
              alt="Live from space album cover"
            />
          </div>
          <div
            style={{
              display: "flex",
              margin: "5px auto",
              justifyContent: "center",
              position:"absolute",
              bottom:0
            }}
          >
            <IconButton
            className= "arrow-btn"
              aria-label="delete"
              size="small"
              sx={{
                opacity: imgNum > 0 ? 1 : 0,
                backgroundColor: "rgb(7,105,144, 0.3)",
                color:"white"
              }}
              onClick={() => handlePrev()}
            >
              <ArrowBack fontSize="inherit"  />
            </IconButton>
            <IconButton
            className= "arrow-btn"
              aria-label="delete"
              size="small"
              sx={{
                opacity:
                  singleProduct?.images?.length  > 1 &&
                  imgNum !== singleProduct?.images?.length - 1
                    ? 1
                    : 0,
                    backgroundColor: "rgb(7,105,144, 0.3)",
                    color:"white"
                
              }}
              onClick={() => handleNext()}
            >
              <ArrowForward fontSize="inherit"  />
            </IconButton>
          </div>

          <div
           
            style={{
              margin: "15px auto",
              width: "300px",
              display: "flex",
              justifyContent: "space-around",
            }}
          ></div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          
            <Typography component="div" variant="h4">
              {singleProduct?.title}
            </Typography>
            
            <Box  style={{textAlign:"left"}}>
                    <Typography >
                    <span className="detail-title">Category : </span>
                      {singleProduct?.category}
                    </Typography>
                    <Typography
                    
                    >
                      <span className="detail-title">Summary : </span>
                      {singleProduct?.summary}
                    </Typography>
                
                    <Typography >
                    <span className="detail-title">Description : </span>
                      {singleProduct?.description}
                    </Typography>
                  { singleProduct?.askingPrice && <Typography >
                    <span className="detail-title">Asking Price : </span>
                      {singleProduct?.askingPrice}
                    </Typography>}
                  { singleProduct?.criteria && <Typography >
                    <span className="detail-title">Criteria : </span>
                      {singleProduct?.criteria}
                      </Typography>}
                  { singleProduct?.reqInvestment && <Typography >
                    <span className="detail-title">Required Investment : </span>
                      {singleProduct?.reqInvestment}
                    </Typography>}
                  { singleProduct?.inventionAddresses && <Typography >
                    <span className="detail-title"> Invension Addresses : </span>
                      {singleProduct?.inventionAddresses}
                    </Typography>}
                  { singleProduct?.patent && <Typography >
                    <span className="detail-title"> Patent  : </span>
                      {singleProduct?.patent}
                    </Typography>}
          </Box>
            {/* creator's profile */}
                <h3>Creator's Profile</h3>
            <Box className="creator-profile">
              <Avatar style={{width:"60px", height:"60px"}}src={singleProduct?.creator?.avatar}/>
              <Box style={{textAlign:"left"}}>
                <Typography>Name : {singleProduct?.creator?.name} {singleProduct?.creator?.surname}</Typography>
                <Typography>Email : {singleProduct?.creator?.email}</Typography>
              </Box>
            </Box>
         
        </Grid>
      </Grid>
      <Grid container style={{ display: open ? "block" : "block" }}>
        <Grid item xs={12}>
          {myInfo._id === singleProduct?.creator?._id ? (
            <>
              {/*  */}
              <Button
                className="theme-btn"
                variant="contained"
                component="label"
              >
                Upload File
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={(e) => {
                    handleSelection(e);
                  }}
                />
              </Button>
              
              <Button
                className="theme-btn"
                onClick={() => setShowEditPage(true)}
              >
                Edit Product
              </Button>
            </>
          ) : (
            <>
              <Button className="theme-btn" onClick={(e) => setOpen(true)}>
                Contact Creator
              </Button>
              
            </>
          )}
     
        </Grid>
      </Grid>
      <Grid
        container
        style={{ display: open ? "block" : "none", marginTop: "50px" }}
      >
        
        <Grid item xs={12}>
          <MessageForm setOpen={setOpen}/>
        </Grid>
      </Grid>
      {showEditPage && (
        <EditProductPage
        fetchProduct={fetchProduct}
          showEditPage={showEditPage}
          setShowEditPage={setShowEditPage}
        />
      )}
    
    </Container>
  );
}

export default DetailPage;
