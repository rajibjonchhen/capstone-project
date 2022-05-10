import { Avatar, Grid } from "@material-ui/core";
import { Box } from "@mui/material";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMyMessagesAction, setSingleProductAction } from "../redux/actions/action";
import "./myMessage.css";
function MyMessages() {
  const [error, setError] = useState();
  const [singleMsg, setSingleMsg] = useState({});
  const [isLoading, setIsLoading] = useState();

  const myMessages = useSelector((state) => state.user.myMessages);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/users/me/messages`,
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
        console.log(data);
        setIsLoading(false);


        dispatch(setMyMessagesAction(data.messages));
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useState(() => {
    getMessages();
  }, []);

  return (
    <Container className="py-3">
    <Row container className=" mt-3 py-3">
      <Col item xs={12} md={6} lg={4} className="msg-sender-list-box p-1">
          <h3>Messages</h3>
          <hr className="bg-light pb-0 mb-0"/>
        {myMessages.map((message, i ) => (
            <div key={i}>
                <div
                    className="sender-list "
                    onClick={() => {
                        setSingleMsg(message);
                    }}
                    >
                    <span className="m-1">
                        <Avatar src={message?.sender?.avatar}/>
                    </span>
                    <span className="m-1">
                        {message?.sender?.name.toUpperCase()}{" "}
                        {message?.sender?.surname.toUpperCase()}
                    </span>
                </div>
        </div>
        ))}
      </Col>
      <Col xs={12} md={6} lg={8} item className="msg-detail-box p-1">
        {singleMsg &&
         (
          <Box>

        <h3>Message Detail</h3>
          <div style={{ textAlign: "left", margin: "0 0 0 10px" }}>
            
            <div className="message-element">
              {" "}
              <span className="m-1">
                <Avatar src={singleMsg?.sender?.avatar} className="P-1"/>
              </span>
              <span className="m-1" style={{fontSize:"15px", fontWeight:"600"}}>
                {singleMsg?.sender?.name.toUpperCase()} {singleMsg?.sender?.surname.toUpperCase()}
              </span>
              
            </div>
            <p className="message-element-title">Text :</p>
            <p className="message-element">{singleMsg.text}</p>
            <p className="message-element-title">Place :</p>
            <p className="message-element">{singleMsg.place}</p>
          </div>
        <div onClick={() =>{dispatch(setSingleProductAction(singleMsg.product)); navigate("/detail")}}>
          <h5>{singleMsg?.product?.title}</h5>
          <img
            src={singleMsg?.product?.images[0]}
            alt={singleMsg?.product?.title}
            style={{ width: "200px" }}
            />
        </div>
            </Box>
          )}
          </Col>
    </Row>
    </Container>
  );
}

export default MyMessages;
