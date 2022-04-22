import { Grid, TextField } from "@material-ui/core";
import { AddBox } from "@mui/icons-material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import {
  Autocomplete,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormControl,
  Container,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";

import "./addEditNewProduct.css";

function AddEditNewProduct({ moreInfo, setMoreInfo, singleProduct, handleClose }) {

    const [successMsg, setSuccessMsg] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])  
    const [newProductErr, setNewProductErr] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const [method,setMethod] = useState("POST")
    const [url,setUrl] = useState("/products")
    const [newProduct, setNewProduct] = useState({
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
  });

  useEffect(() => {

    if(singleProduct){
      setMethod("PUT")
      console.log(singleProduct)

      setNewProduct({
        title: singleProduct.title || "",
        category: singleProduct.category ||"",
        summary: singleProduct.summary ||"",
        description: singleProduct.description ||"",
        askingPrice: singleProduct.askingPrice ||"",
        criteria: singleProduct.criteria ||"",
        patent: singleProduct.patent ||"",
        reqInvestment:singleProduct.reqInvestment ||"",
        auxiliaryProducts:singleProduct.auxiliaryProducts ||"",
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
      
      if (Object.keys(newProductErr).length === 0 && isSubmit) {
        console.log("after I am going to submit");
      saveProduct();
    }
  }, [newProductErr]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    console.log(newProduct);
    console.log(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewProductErr(verifyForm(newProduct));
    setIsSubmit(true);
    console.log(Object.keys(newProductErr).length)
  };

  const verifyForm = () => {
    const error = {};
    if (!newProduct.title) {
      error.title = "title is missing";
    }
    if (!newProduct.category) {
      error.category = "category is missing";
    }
    if (!newProduct.summary) {
      error.summary = "summary is missing";
    }
    if (!newProduct.description) {
      error.description = "description is missing";
    }
    if (!newProduct.askingPrice) {
      error.askingPrice = "asking price is missing";
    }
    return error;
  };

  const saveProduct = async () => {
    setError("")
      console.log("saving now " , process.env.REACT_APP_DEV_BE_URL + url, method , "singleProduct", singleProduct._id)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}` + url,
        {
          method,
          body: JSON.stringify(newProduct),
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
        

        setNewProduct({
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
        if(singleProduct){
          handleClose()
        }

        if(selectedImages){
            uploadImages(singleProduct._id)
        } else{
          setIsLoading(false);
        }   
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSelection = async(e) => {
    console.log("handle selection",e.target.files)
     setSelectedImages([e.target.files])
    await console.log("selected images!!!", selectedImages)
   }


   const uploadImages = async(productId) => {
       console.log("saving the files now")
       const formData = new FormData()
      
       formData.append("images", selectedImages)
       console.log("saving the files now", formData)
    try {
        const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/products/me/${productId}/images`,{
            method:"POST",
            body : formData,
            headers:{
                "authorization" : localStorage.getItem("MyToken")
            }
        }) 
        if(response.status !== 200){
            const data = await response.json();
            console.log(data);
            setError(data.error);
        } else {
            setSuccessMsg(true)
            setIsLoading(false);
            setTimeout(() => setSuccessMsg(false),1000)
        }
    }
        catch(error){
            console.log(error)
        }
    }
   
  return (
    
      <Container conatianer>
          <h2>Fill in the product details</h2>
          {successMsg && <Alert margin="normal"  severity="success">Updated successfully</Alert>}
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
                value={newProduct.title}
                autoFocus
                autoComplete=""
                onChange={(e) => handleChange(e)}
              />
              <Typography>
                {!newProduct.title && newProductErr?.title}
              </Typography>
            </Grid>
            {/* <Autocomplete
                    disablePortal
                    id="category"
                    options={categories}
                    value={newProduct.category}
                    onChange={(e) => handleChange(e)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params}  name="category" value={newProduct.category} label="category" />}
                /> */}
            <Grid item xs={12} md={6}>
              <FormControl 
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
                  margin="normal"
                  labelId="category"
                  maxWidth="50%"
                  size="small"
                  id="category"
                  variant="outlined"
                  value={newProduct.category}
                  label="category"
                  name="category"
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography>
                {!newProduct.category && newProductErr?.category}
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
                value={newProduct.summary}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
              <Typography>
                {!newProduct.summary && newProductErr?.summary}
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
                value={newProduct.description}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
              <Typography>
                {!newProduct.description && newProductErr?.description}
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
                value={newProduct.askingPrice}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
              <Typography>
                {!newProduct.askingPrice && newProductErr?.askingPrice}
              </Typography>
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
                value={newProduct.criteria}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
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
                value={newProduct.reqInvestment}
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
                value={newProduct.agreement}
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
                value={newProduct.inventionAddresses}
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
                id="auxiliaryProducts"
                label="auxiliary products"
                name="auxiliaryProducts"
                value={newProduct.auxiliaryProducts}
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
                value={newProduct.patent}
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            
           
     
          </Grid>
          <Grid container spacing={2} className="buttons">
          <Grid item>
            <Button
                variant="contained"
                component="label"
                >
                Upload File
                <input
                    type="file"
                    hidden
                    multiple
                    onChange={(e) => {handleSelection(e)}}
                    />
            </Button>
            </Grid>
            <Grid item>
          <Button 
          variant="contained"
          component="label"
          onClick={(e) => handleSubmit(e)}>Submit</Button>
          </Grid>
          </Grid>
      </Container>
    
  );
}

export default AddEditNewProduct;
