import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./myfooter.css"
import { Typography } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";

function MyFooter() {
  const footerParts = [
    {
      title: "CREATOR'S SPACE",
      lists: [
        "About",
        "Contact Us",
        "Press Room",
        "Investor Relation",
        "Terms of Use",
        "Privacy Policy",
      ],
    },
    {
      title: "WE GENERATE",
      lists: [
        "Environment for Creativity",
        "Value for Investors",
        "Contents Publishers",
        "Value for Art",
        "Identity for Culture",
        "Sustainable Society",
      ],
    },
    {
      title: "PAYMENT SOLUTIONS",
      lists: [
        "Payments Setup",
        "Apple Pay",
        "PayPal",
        "Credit/Debit",
        "Buy Now, Pay Later",
        "Manual Payments",
        "Tax Automation"
      ],
    },
    {
      title: "RESOURCES & SUPPORT",
      lists: [
        "Help Center",
        "Community",
        "Success Plan",
        "Partner Program",
        "Invoice Generator",
      ],
    },
  ];
  




  return (
    
      <Container  className="footer-box"  fluid >
      <Row item xs={12} md={10} lg={10}  className="footer-box offset-lg-1">
         
          {footerParts.map((part, i) => (
            <Col key={i} item xs={12} sm={6} md={3} lg={3} style={{margin:"15px auto 0px"}}>
                <p className="footerCol-title">{part.title}</p>
                <div className="footerCol">
                  {part.lists.map((list, j) => (
                    <p key={j} className=" footer-item">{list}</p>
                    ))}
                </div>
            </Col>
          ))}
         
      </Row>
  </Container>
  
  );
}

export default MyFooter;
