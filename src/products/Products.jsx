import { Button } from "@material-ui/core";
import { SearchRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setAllProductsAction,
  setSelectedCategoryAction
} from "../redux/actions/action";
import "./products.css";
import SingleCard from "./SingleCard";
import {FcMenu} from "react-icons/fc"
import CategoriesBtns from "./CategoriesBtns";


function Products() {
  const [showCategories, setShowCategories] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState("")
  const [searchedProducts, setSearchProducts] = useState([])

  const myInfo = useSelector(state => state.user.myInfo);
  
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory
  );

  const allProducts = useSelector((state) => state.product.allProducts);
  const dispatch = useDispatch();
  const params = useParams();

  const changeCategory = (type) => {
    dispatch(setSelectedCategoryAction(type));
    setShowCategories(false)
  };

  useEffect(() => {
    if (selectedCategory.length > 0 ) {
      window.scrollTo(0, 0);
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(setSelectedCategoryAction("all"))
    setUrl(myInfo? `${process.env.REACT_APP_PROD_BE_URL}/products/allProducts?s=${search}`:`${process.env.REACT_APP_PROD_BE_URL}/products?s=${search}`)
    
    // console.log(myInfo,"myInfo");
    fetchProducts("all");
  }, [myInfo]);



 
  useEffect(() => {
    console.log(search.length, "search" , search)
    if(search.length !== 0){
      setSearchProducts(allProducts.filter(product => product.title.toUpperCase().includes(search.toUpperCase()) || product.category.toUpperCase().includes(search.toUpperCase() || product.creator.name.toUpperCase().includes(search.toUpperCase()))))
      // dispatch(setAllProductsAction(allProducts.filter(product => product.title.toUpperCase().includes(search.toUpperCase()) || product.category.toUpperCase().includes(search.toUpperCase() || product.creator.name.toUpperCase().includes(search.toUpperCase())))))
    }
  },[search])


  

  const fetchProducts = async () => {
    setIsLoading(true);
      
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROD_BE_URL}/products/allProducts?s=${search}`,
        {
          method: "GET",
          headers: {
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
        console.log("category.length", selectedCategory.length);
        if (selectedCategory?.length > 0 && selectedCategory !== "all") {
          const products = data.products.filter(
            (product) => product.category === selectedCategory
          );
          console.log(products, selectedCategory);
          dispatch(setAllProductsAction(products));
          setTimeout(() => setIsLoading(false), 200)
        } else {
          dispatch(setAllProductsAction(data.products));
          setTimeout(() => setIsLoading(false),200 )
         
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchProductsNoUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROD_BE_URL}/products/allProducts?s=${search}`,
        {
          method: "GET",
          headers: {
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
        console.log("category.length", selectedCategory.length);
        if (selectedCategory?.length > 0 && selectedCategory !== "all") {
          const products = data.products.filter(
            (product) => product.category === selectedCategory
          );
          console.log(products, selectedCategory);
          dispatch(setAllProductsAction(products));
          setIsLoading(false);
        } else {
          dispatch(setAllProductsAction(data.products));
          setTimeout(() => setIsLoading(false),200 )
         
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  

  return (
    <Container fluid style={{minHeight:"80vh"}}>
      <Container
        style={{
          position: "sticky",
          top: "50px",
          zIndex: "2",
          padding: "20px 10px 0 10px ",
          backgroundColor:"rgb(4,52,71)",
          margin:"0 auto"

          
        }}
      >
        <Row>
          <Col xs={12} md={6} lg={6} style={{margin:"0 auto", display:"flex", alignItems:"center"}}>
            <div style={{ position: "relative" , width:"100%"}}>
              <input
                type="text"
                id="search"
                name="search"
                value={search}
                placeholder="Type to search"
                className="form-control"
                onChange={(e) => setSearch(e.target.value)}

              />
              <span className="search-icon pointer" onClick={() => {if(search.length>0)fetchProducts()}}>
                <SearchRounded />
              </span>
            </div>
            <span className="burger-menu" style={{fontSize:"40px"}} onClick={() => {setShowCategories(!showCategories)}}><FcMenu/> </span>
          </Col>
        </Row>
        <Row className="inline-buttons"  >
            <CategoriesBtns selectedCategory={selectedCategory} changeCategory={changeCategory}/>
        </Row>
        <Row className="mobile-btns"  style={{display:showCategories? "block":"none"}} >
            <CategoriesBtns selectedCategory={selectedCategory} changeCategory={changeCategory}/>
        </Row>
        
      </Container>

      <Container>
      <Row style={{ margin: "30px auto d-flex justify-between"}} >
        {error.length > 0 ? (
          <div className="error-message">Error on fetching products</div>
        ) : isLoading ? (
          <div style={{ width: "100%", height: "100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
            <Spinner animation="border" variant="primary" />{" "}
          </div>
        ) : allProducts?.length === 0 ? (
          <h2 className="mt-5 text-center w-100">There are no products from this category</h2>
        ) : (
          (search? searchedProducts : allProducts).map((product, i) => (
            <Col
              key={i}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{width:'100%', padding:'5px',}}
            >
              <SingleCard product={product} />
            </Col>
          ))
        )}
      </Row>
      </Container>

    </Container>
  );
}

export default Products;
