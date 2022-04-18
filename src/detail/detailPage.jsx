import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useSelector } from "react-redux";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Image } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { Button } from "@mui/material";

function DetailPage() {
  const [successMsg, setSuccessMsg] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);
  const [newProductErr, setNewProductErr] = useState({});
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const singleProduct = useSelector((state) => state.product.singleProduct);
  const myInfo = useSelector(state => state.user.myInfo)
  const [imgNum, setImgNum] = useState(0);

  useEffect(() => {
    if (isSubmit && selectedImages.length > 0) {
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

  const uploadImages = async () => {
    const formData = new FormData();
    formData.append(`images`, selectedImages);
    console.log("saving the files now", formData);
    // for(let i= 0; i < selectedImages.length; i++){
    //   formData.append(`images[${i}]`,selectedImages[i])
    //   console.log("form data", formData)
    // }

    try {
      console.log("trying saving the files now", formData);
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/products/me/${singleProduct._id}/images`,
        {
          method: "POST",
          body: formData,
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
        console.log(data);
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 1000);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelection = (e) => {
    console.log("e.target.files", e.target.files);
    console.log("singleproduct", singleProduct._id);
    setSelectedImages(e.target.files);
    setIsSubmit(true);
    uploadImages();
  };
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <div
          style={{
            width: "300px",
            height: "300px",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <img
            style={{ width: "100%" }}
            src={
              singleProduct?.images[imgNum] || "https://via.placeholder.com/300"
            }
            alt="Live from space album cover"
          />
        </div>
          <div
            style={{
              display: "flex",
              margin: "5px auto",
              justifyContent: "center",
            }}
          >
            <IconButton
              aria-label="delete"
              size="small"
              sx={{
                opacity: imgNum > 0 ? 1 : 0,
                backgroundColor: "palegoldenrod",
              }}
            >
              <ArrowBack fontSize="inherit" onClick={() => handlePrev()} />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              sx={{
                opacity:
                  singleProduct.images.length - 1 > 0 &&
                  imgNum !== singleProduct.images.length
                    ? 1
                    : 0,
                backgroundColor: "palegoldenrod",
              }}
            >
              <ArrowForward fontSize="inherit" onClick={() => handleNext()} />
            </IconButton>
          </div>

        <div item style={{ margin: "5px" }}>
          {myInfo._id === singleProduct.creator? <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => handleSelection(e)}
            />
          </Button> :
          <Button variant="contained" component="label">
           Contact Creator
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => handleSelection(e)}
            />
          </Button>}
        </div>
      </Grid>
      <Grid item  sx={{ display: "flex", flexDirection: "column" }} xs={12} md={6}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {singleProduct?.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {singleProduct?.summary}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {singleProduct?.description}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
    //     <div>
    //        <Card sx={{ display: 'flex', mt:12 }}>
    //          <div style={{}}>
    //         <div style={{width:"300px", height:"300px", overflow:"hidden", margin:"0 auto"}}>
    //             <img style={{ width:"100%"}} src={singleProduct?.images[imgNum] || "https://via.placeholder.com/300"}
    //             alt="Live from space album cover"
    //             />
    //             </div>
    //         <div style={{display:"flex",margin:"5px auto",justifyContent:"center"}}>

    //         <IconButton aria-label="delete" size="small" sx={{display: imgNum>0 ? "block":"none", backgroundColor:'palegoldenrod'}}>
    //               <ArrowBack fontSize="inherit" onClick={() => handlePrev()}/>
    //           </IconButton>
    //             <IconButton aria-label="delete" size="small" sx={{display: singleProduct.images.length-1>0 && imgNum !== singleProduct.images.length? "block":"none", backgroundColor:'palegoldenrod'}}>
    //               <ArrowForward fontSize="inherit" onClick={() => handleNext()}/>
    //           </IconButton>

    //           <Grid item style={{margin:"5px"}}>
    //             <Button
    //                 variant="contained"
    //                 component="label"
    //                 >
    //                 Upload File
    //                 <input
    //                     type="file"
    //                     hidden
    //                     multiple
    //                     onChange={(e) => handleSelection(e)}
    //                     />
    //             </Button>
    //           </Grid>
    //                     </div>
    //         </div>
    //       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //         <CardContent sx={{ flex: '1 0 auto' }}>
    //           <Typography component="div" variant="h5">
    //             {singleProduct?.title}
    //           </Typography>
    //           <Typography variant="subtitle1" color="text.secondary" component="div">
    //           {singleProduct?.summary}
    //           </Typography>
    //           <Typography variant="subtitle1" component="div">
    //           {singleProduct?.description}
    //           </Typography>
    //         </CardContent>
    //       </Box>
    //     </Card>
    // </div>
  );
}

export default DetailPage;
