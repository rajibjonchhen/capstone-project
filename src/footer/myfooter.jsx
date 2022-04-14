import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./myfooter.css"
import { Typography } from "@material-ui/core";

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
    
      <Grid   container style={{ justifyContent:"center"}}>
      <Grid item xs={12} md={10} lg={8} className="footer-box">
          <Grid container spacing={2}>
          {footerParts.map((part, i) => (
            <Grid key={i} item xs={12} md={3} lg={3} >
                <p className="footerCol-title">{part.title}</p>
                <div className="footerCol">
                  {part.lists.map((list, j) => (
                    <p key={j}>{list}</p>
                    ))}
                </div>
            </Grid>
          ))}
          </Grid>
      </Grid>
  </Grid>
  
  );
}

export default MyFooter;
