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

function Products() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory
  );
  const allProducts = useSelector((state) => state.product.allProducts);
  const dispatch = useDispatch();
  const params = useParams();

  const changeCategory = (type) => {
    console.log(type);
    dispatch(setSelectedCategoryAction(type));
    console.log("selectedCategory", selectedCategory);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(selectedCategory);
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory.length > 0) {
      window.scrollTo(0, 0);
      console.log(selectedCategory);
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);


  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/products?s=${search}`,
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
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const categoryArray = [
    { title: "All Products", type: "all" },
    { title: "Ideas", type: "idea" },
    { title: "Novels", type: "novel" },
    { title: "Poems", type: "poem" },
    { title: "Songs", type: "song" },
    { title: "Web Template", type: "web template" },
    { title: "Movies", type: "movie" },
  ];

  return (
    <Container >
      <div
        style={{
          position: "sticky",
          top: "60px",
          zIndex: "2",
          padding: "20px 0 5px",
          backgroundColor:"rgb(4,52,71)"
        }}
      >
        <Row>
          <Col xs={12} md={6} lg={6} className="m-auto">
            <div style={{ position: "relative" }}>
              <input
                type="text"
                id="search"
                name="search"
                value={search}
                placeholder="Type to search"
                className="form-control"
                onChange={(e) => setSearch(e.target.value)}

              />
              <span className="search-icon pointer" onClick={() => fetchProducts()}>
                <SearchRounded />
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {categoryArray.map((category, i) => (
              <Button
                size="large"
                style={{ width: "150px" }}
                name={category.type}
                onClick={(e) => {
                  changeCategory(category.type);
                }}
                className="theme-btn"
              >
                {category.title}
              </Button>
            ))}
          </Col>
        </Row>
      </div>
      <Row style={{ margin: "50px auto" }}>
        {error.length > 0 ? (
          <div className="error-message">Error on fetching products</div>
        ) : isLoading ? (
          <div style={{ width: "100%", height: "100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
            <Spinner animation="border" variant="primary" />{" "}
          </div>
        ) : allProducts?.length === 0 ? (
          <h2>There are no products</h2>
        ) : (
          allProducts.map((product, i) => (
            <Col
              key={i}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
             
            >
              <SingleCard product={product} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Products;
