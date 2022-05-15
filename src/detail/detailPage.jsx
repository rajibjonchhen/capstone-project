import { Avatar, Grid } from "@material-ui/core";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSingleProductAction } from "../redux/actions/action";
import "./detailPage.css";
import EditProductPage from "./EditProductPage";
import MessageForm from "./MessageForm";

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
  

  const dispatch = useDispatch()
  const params = useParams()
  
  useEffect(() => {
    window.scrollTo(0,0)
    let productId = params.productId
    console.log("detail page productId", productId)
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

  const uploadImages = async () => {
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
        dispatch(setSingleProductAction(data.updatedProduct))
        setTimeout(() => setSuccessMsg(false), 1000);
        setSelectedImages([])
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
    <Container >
      <Row  spacing={2} className=" mt-3 py-3">
        <Col  xs={12} md={6} style={{position:'relative'}}>
          <div
           
            style={{
           
            }}
          >
            {/*  */}
            <Carousel  className="detail-carousel">
              {singleProduct?.images?.map((image,i ) => 
                <Carousel.Item key={i} className="detail-carousel-img">
                  <div style={{padding:"15px"}}>

                  <img
                    className="d-block w-100 "
                    src={image ||
                      "https://via.placeholder.com/300"}
                      alt="First slide"
                      />
                      </div>
                      
                </Carousel.Item>)}
          </Carousel>
            {/*  */}
            
          </div>
        </Col>
        <Col
          xs={12}
          md={6}
        >
          
            <Typography className="text-left my-3" component="div" variant="h4">
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
                      $ {singleProduct?.askingPrice}.00
                    </Typography>}
                  { singleProduct?.criteria && <Typography >
                    <span className="detail-title">Criteria : </span>
                      {singleProduct?.criteria}
                      </Typography>}
                  { singleProduct?.reqInvestment && <Typography >
                    <span className="detail-title">Required Investment : </span>
                      $ {singleProduct?.reqInvestment}.00
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
                <h5 className="text-left my-3">Creator's Profile</h5>
            <Box >
              <Avatar style={{width:"60px", height:"60px"}}src={singleProduct?.creator?.avatar}/>
              <Box style={{textAlign:"left"}}>
                <Typography>Name : {singleProduct?.creator?.name} {singleProduct?.creator?.surname}</Typography>
                <Typography>Email : {singleProduct?.creator?.email}</Typography>
              </Box>
            </Box>

            {myInfo._id !== singleProduct?.creator?._id &&
              <Button className="theme-btn" style={{border:"1px solid white", display:!open? "flex":"none"}} onClick={(e) => setOpen(true)}>
                Contact Creator
              </Button>}
         
        </Col>
      </Row>
        <Row
        style={{ display: open ? "block" : "none", marginTop: "50px" }}
      >
        
        <Col  xs={12}>
          <MessageForm setOpen={setOpen}/>
        </Col>
      </Row>
      <Row  style={{ margin:"50px auto" }}>
        <Col  xs={12} style={{ margin:"0px auto" }}>
          {myInfo._id === singleProduct?.creator?._id  && (
            <>
              {/*  */}
              <Button
                className="theme-btn"
                style={{border:"1px solid white"}}
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
                style={{border:"1px solid white"}}

                onClick={() => setShowEditPage(true)}
              >
                Edit Product
              </Button>
            </>
          ) }
     
        </Col>
      </Row>
      
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
