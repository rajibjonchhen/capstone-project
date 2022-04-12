import { TextField } from "@material-ui/core";
import { AddBox } from "@mui/icons-material";
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import {  Button, Typography } from "@mui/material";
import { useState } from "react";
import "./addEditNewProduct.css"

function AddEditNewProduct({moreInfo, setMoreInfo}) {
    
    const [newProductErr, setNewProductErr] = useState({})
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState()
    const [isSubmit, setIsSubmit] = useState(false)
    const [newProduct, setNewProduct] = useState({
        title:"",
        category:"",
        summary:"",
        description:"",
        askingPrice:"",
        criteria:"",
    })

    useState(() => {
        if(Object.keys(newProductErr).length === 0 && isSubmit){
            console.log("I am going to submit")
            saveProduct()
        }
    },[newProductErr])

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewProduct({...newProduct, [name]:value})
        console.log(name, value)

    }

    const handleSubmit = () => {
        setNewProductErr(verifyForm(newProduct))
        setIsSubmit(true)
        console.log(newProductErr)
    }

    const verifyForm = () => {
        const error ={}
        if(!newProduct.title){
            error.title = "title is missing"
        }
        if(!newProduct.category){
            error.category = "category is missing"
        }
        if(!newProduct.summary){
            error.summary = "summary is missing"
        }
        if(!newProduct.description){
            error.description = "description is missing"
        }
        if(!newProduct.askingPrice){
            error.askingPrice = "asking price is missing"
        }
        return error
    }

    const saveProduct = async() =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/products`,{
                method:"POST",
                body : JSON.stringify(newProduct),
                headers:{
                    "content-type" :"application/json",
                    "authorization": localStorage.getItem("MyToken")
                }
            })
            if(response.status !== 200){
                const data = await response.json()
                console.log(data)
                setError(data.error)
                setIsLoading(false)
              } else{
                const data = await response.json()
                console.log(data)
                setIsLoading(false)
              }
            } catch (error) {
              console.log(error)
            setIsLoading(false)
        }
    }

    return ( <>

            
            
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="title"
                    label="title"
                    name="title"
                    value={newProduct.title}

                    autoFocus
                    onChange={(e) => handleChange(e)}
            />
            <Typography>{!newProduct.title && newProductErr?.title}</Typography>
                
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="category"
                    label="category"
                    name="category"
                    value={newProduct.category}

                    autoFocus
                    onChange={(e) => handleChange(e)}
            />
            <Typography>{!newProduct.category && newProductErr?.category}</Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="summary"
                    label="summary"
                    name="summary"
                    value={newProduct.summary}

                    autoFocus
                    onChange={(e) => handleChange(e)}
            />
            <Typography>{!newProduct.summary && newProductErr?.summary}</Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="description"
                    label="description"
                    name="description"
                    value={newProduct.description}

                    autoFocus
                    onChange={(e) => handleChange(e)}
            />
            <Typography>{!newProduct.description && newProductErr?.description}</Typography>
               
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="askingPrice"
                    label="asking price"
                    name="askingPrice"
                    value={newProduct.askingPrice}
                    autoFocus
                    onChange={(e) => handleChange(e)}
            />
            <Typography>{!newProduct.askingPrice && newProductErr?.askingPrice}</Typography>

            <TextField
                    margin="normal"
                    
                    fullWidth
                    size="small"
                    id="criteria"
                    label="criteria"
                    name="criteria"
                    value={newProduct.criteria}
                    autoFocus
                    onChange={(e) => handleChange(e)}
            />
            <div className="text-icon" style={{display:!moreInfo? "block":"none"}} onClick={() => setMoreInfo(true) }> <span>Add More Info</span> <span><AddBox/></span> </div>
            {/* more detail */}
            <div style={{display:moreInfo? "block":"none"}}>
                
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="agreement"
                    label="agreement"
                    name="agreement"
                    value={newProduct.agreement}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="reqInvestment"
                    label="reqInvestment"
                    name="reqInvestment"
                    value={newProduct.reqInvestment}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    />

                <TextField
                    margin="normal"
                    fullWidth
                    size="small"
                    id="reqInvestment"
                    label="reqInvestment"
                    name="reqInvestment"
                    value={newProduct.reqInvestment}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    />

                <TextField
                    margin="normal"
                    fullWidth
                    size="small"
                    id="inventionAddresses"
                    label="invention addresses"
                    name="inventionAddresses"
                    value={newProduct.inventionAddresses}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    />

                <TextField
                    margin="normal"
                    fullWidth
                    size="small"
                    id="auxiliaryProducts"
                    label="auxiliary products"
                    name="auxiliaryProducts"
                    value={newProduct.auxiliaryProducts}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    />

                <TextField
                    margin="normal"
                    fullWidth
                    size="small"
                    id="patent"
                    label="patent"
                    name="patent"
                    value={newProduct.patent}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    />

                <div className="text-icon" style={{display:moreInfo? "block":"none"}} onClick={() => setMoreInfo(false) }><span>Show Less Info</span>  <span><IndeterminateCheckBoxIcon/></span> </div>
            </div>
                    <Button onClick={() => handleSubmit()}>Submit</Button>
    </> );
}

export default AddEditNewProduct;