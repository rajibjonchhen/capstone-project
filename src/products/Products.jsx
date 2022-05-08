import { Button, Grid } from "@material-ui/core";
import { SearchOffOutlined, SearchRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAllProductsAction, setSelectedCategoryAction } from "../redux/actions/action";
import './products.css';
import SingleCard from "./SingleCard";

function Products() {
    const [ error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState("")

    const selectedCategory = useSelector(state => state.product.selectedCategory)
    const allProducts = useSelector(state => state.product.allProducts)
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
  

    const changeCategory = (e, type)=>{
      e.preventDefault()
      dispatch(setSelectedCategoryAction(type));
      console.log(type); 
       navigate(`/products`)
    }

    useEffect(() => {
        window.scrollTo(0,0)
        fetchProducts(`${params.category}`)
    },[])

    

    const fetchProducts = async(category) => {
        try {
            console.log(process.env.REACT_APP_DEV_BE_URL)
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/products`,{
                method:"GET",
                headers:{
                    "authorization" : localStorage.getItem("MyToken"),
                }
            })
            if(response.status !== 200){
                const data = await response.json()
                console.log(data)
                setError(data.error)
                setIsLoading(false)
            } else{
                const data = await response.json()
                // const products = data.products.filter(product => product.category === category)
                // console.log(products, selectedCategory)
                dispatch(setAllProductsAction(data.products))
                setIsLoading(false)

            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } 
    }

    const categoryArray = [
        {title:"Ideas", type:"idea"},
        {title:"Novels", type:"novel"},
        {title:"Poems", type:"poem"},
        {title:"Songs", type:"song"},
        {title:"Web Template", type:"web template"},
        {title:"Movies", type:"movie"},
]

    return ( 
    <Container fluid style={{paddingTop:"70px"}}>
       <Row>
            <Col xs={4} className="m-auto">
                <div style={{position:'relative'}}>
                <input type="text" id="search" name="search" value={search} placeholder="Type to search"style={{width:"100%", height:"40px", borderRadius:"50px", padding:"0 10px"}}/>
                <span className="search-icon">
                    <SearchRounded/>
                </span>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
            {categoryArray.map((category, i) => 
            <Button
            size="small"
            name={category.type}
            onClick = {(e) => {changeCategory(e.target.name)}}
            className="theme-btn">
            {category.title}
          </Button>
            )}
            </Col>
        </Row>
        <Row container >
            {allProducts.length === 0 && <h2>There are no products</h2>}
            {allProducts.map((product, i) => <Col key={i} item xs={12} sm={6} md={4} lg={3} style={{display:"flex", justifyContent:"center"}}>
                <SingleCard product={product}/>
            </Col> 
            )}
            
        </Row>
    </Container>
     );
}

export default Products;