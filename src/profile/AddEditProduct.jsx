import { Box, Grid, TextField } from "@material-ui/core";
import {
  Alert, Button, Container, FormControl, InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSingleProductAction } from "../redux/actions/action";

import "./addEditProduct.css";



function AddEditProduct({ moreInfo, setMoreInfo, singleProduct, handleClose, fetchProduct, fetchMyProducts }) {

    const [success, setSuccess] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])  
    const [productErr, setProductErr] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSubmitImg, setIsSubmitImg] = useState(false);
    const [method,setMethod] = useState("POST")
    const [url,setUrl] = useState("/products")
    
    const dispatch = useDispatch()
    const [product, setProduct] = useState({
    title: "",
    category: "",
    summary: "",
    description: "",
    askingPrice: "",
    criteria: "",
    patent: "",
    reqInvestment:"",
    agreement:"",
    inventionAddresses:"",
  });

  useEffect(() => {

    if(singleProduct){
      setMethod("PUT")
      console.log(singleProduct)

      setProduct({
        title: singleProduct.title || "",
        category: singleProduct.category ||"",
        summary: singleProduct.summary ||"",
        description: singleProduct.description ||"",
        askingPrice: singleProduct.askingPrice ||"",
        criteria: singleProduct.criteria ||"",
        patent: singleProduct.patent ||"",
        reqInvestment:singleProduct.reqInvestment ||"",
        agreement:singleProduct.agreement ||"",
        inventionAddresses:singleProduct.inventionAddresses ||"",
      })
      setUrl(`/products/me/${singleProduct._id}`)
    }
  },[])

  const categories = [
    "idea",
    "story",
    "novel",
    "song",
    "poem",
    "movie",
    "web template",
  ];

  useEffect(() => {
      if (Object.keys(productErr).length === 0 && isSubmit) {
        console.log("after I am going to submit");
        saveProduct();
        console.log("save after I am going to submit");
    }
  }, [productErr]);

  useEffect(() => {
    if (isSubmitImg && selectedImages.length > 0) {
      console.log("selected img from useEffect", selectedImages)
      uploadImages();
    }
  }, [selectedImages]);

  const handleChange = (e) => {
    console.log(product)
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    isSubmit(true)
  };

  const handleSubmit = (e) => {

    e.preventDefault()
    setProductErr(verifyForm(product));
    setIsSubmit(true);
    console.log(Object.keys(productErr).length)
  };

  const verifyForm = () => {
    const error = {};
    if (!product.title) {
      error.title = "title is missing";
    }
    if (!product.category) {
      error.category = "category is missing";
    }
    if (!product.summary) {
      error.summary = "summary is missing";
    }
    if (!product.description) {
      error.description = "description is missing";
    }
    if (!product.askingPrice) {
      error.askingPrice = "asking price is missing";
    }
    return error;
  };

  const saveProduct = async () => {
    
      console.log("saving now " , process.env.REACT_APP_PROD_BE_URL + url, method , "singleProduct")
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROD_BE_URL}` + url,
        {
          method,
          body: JSON.stringify(product),
          headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem("MyToken"),
          },
        }
      );
      if (response.status !== 200) {
        const data = await response.json();
        console.log(data);
        setError(data.error);
        setIsLoading(false);
      } else {
        const data = await response.json();
        console.log(data);
        // fetchMyProducts()
       
        setIsLoading(false);
          dispatch(setSingleProductAction(data.updatedProduct))
          setSuccess(true)
        setTimeout(() => setSuccess(false),1000)
        setTimeout(() => handleClose(),1000)
        
        if(selectedImages){
          uploadImages(data.product._id)
        }
        if(method === "POST"){
            fetchMyProducts()
          setProduct({
            title: "",
            category: "",
            summary: "",
            description: "",
            askingPrice: "",
            criteria: "",
            patent: "",
            reqInvestment:"",
            auxiliaryProducts:"",
            agreement:"",
            inventionAddresses:"",
          })
        }
        
       
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSelection = async(e) => {
    console.log("handle selection",e.target.files)
     setSelectedImages(e.target.files)
     setIsSubmit(true)
     console.log("selected images!!!", selectedImages)
   }


const uploadImages = async () => {
    const userData = new FormData();
    for(let i= 0; i <= selectedImages.length; i++){
      userData.append(`images`,selectedImages[i])
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROD_BE_URL}/products/me/${singleProduct._id}/images`,
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
        setSuccess(true);
        dispatch(setSingleProductAction(data.updatedProduct))
        setTimeout(() => setSuccess(false), 1000);
        setSelectedImages([])
      }
    } catch (error) {
      console.log(error);
    }
  };






  
   
  return (
    
      <Container className="mt-3 p-5 text-dark" style={{backgroundColor:"rgb(173,191,190)"}}>
          <h2>Fill in the product details</h2>
          
          <div className="p-3" style={{display:success? "block":"none", backgroundColor:"rgb(0,128,1,0.2)"}}>Successfully updated</div>
          {error && <Alert margin="normal"  severity="error">{error}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>

            <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                size="small"
                id="title"
                label="title"
                name="title"
                value={product.title}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
             
              <Typography style={{color:"red"}}>
                {!product.title && productErr?.title}
              </Typography>
            </Grid>
          
            <Grid item xs={12} md={6}>
              <FormControl 
                className="blue-input"
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  id="category"
                  
                  name="category"
              >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
               
                  margin="none"
                  labelId="category"
                  size="small"
                  id="category"
                  variant="outlined"
                  value={product.category}
                  label="category"
                  name="category"
                  onChange={handleChange}
                >
                  {categories.map((category, i) => (
                    <MenuItem key={i} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography style={{color:"red"}}>
                {!product.category && productErr?.category}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                size="small"
                id="summary"
                label="summary"
                name="summary"
                multiline
                value={product.summary}
                autoFocus
                onChange={(e) => handleChange(e)}
              />

{/* <TextareaAutosize
  aria-label="minimum height"
  minRows={3}
  placeholder="Minimum 3 rows"
  style={{ width: "100%" }}
/> */}
              <Typography style={{color:"red"}}>
                {!product.summary && productErr?.summary}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                size="small"
                id="description"
                label="description"
                name="description"
                multiline
                value={product.description}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
              <Typography style={{color:"red"}}>
                {!product.description && productErr?.description}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                size="small"
                id="askingPrice"
                label="asking price"
                name="askingPrice"
                value={product.askingPrice}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
              <Typography style={{color:"red"}}>
                {!product.askingPrice && productErr?.askingPrice}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                size="small"
                id="reqInvestment"
                label="required investment"
                name="reqInvestment"
                value={product.reqInvestment}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                fullWidth
                size="small"
                id="criteria"
                label="criteria"
                name="criteria"
                variant="outlined"
                value={product.criteria}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
                </Grid>

         
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                fullWidth
                variant="outlined"
                size="small"
                id="agreement"
                label="agreement"
                name="agreement"
                value={product.agreement}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            
          
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                fullWidth
                variant="outlined"
                size="small"
                id="inventionAddresses"
                label="invention addresses"
                name="inventionAddresses"
                value={product.inventionAddresses}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                fullWidth
                variant="outlined"
                size="small"
                id="patent"
                label="patent"
                name="patent"
                value={product.patent}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            
           
     
          </Grid>
          <Box spacing={2} className="buttons">
          
            <Button
                variant="contained"
                component="label"
                className="theme-btn"
                >
                Upload File
                <input
                    type="file"
                    hidden
                    multiple
                    onChange={(e) => {handleSelection(e)}}
                    />
            </Button>
           
          <Button 
          className={success? "bg-success":"theme-btn"}
          variant="contained"
          component="label"
          onClick={(e) => handleSubmit(e)}> Submit</Button>
          
          </Box>
      </Container>
    
  );
}

export default AddEditProduct;
