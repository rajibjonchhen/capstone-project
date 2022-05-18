import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChatUserAction, setUnreadMessageAction } from "../redux/actions/action";
import "./myMessage.css";

function MyMessages() {
  const [error, setError] = useState();
  const [singleChat, setSingleChat] = useState({});
  const [isLoading, setIsLoading] = useState();

  const myInfo = useSelector((state) => state.user.myInfo);
  const myMessages = useSelector((state) => state.user.myMessages);
  const allChats = useSelector((state) => state.chat.allChats);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unreadMessages = useSelector((state) => state.chat.unreadMessages);


  // useEffect(() => {
  //   getMessages()
  // },[])

  // const getMessages = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_PROD_BE_URL}/chats/me`,
  //       {
  //         method: "GET",
  //         headers: {
  //           authorization: localStorage.getItem("MyToken"),
  //         },
  //       }
  //     );
  //     if (response.status !== 200) {
  //       const data = await response.json();
  //       console.log(data);
  //       setError(data.error);
  //       setIsLoading(false);
  //     } else {
  //       const data = await response.json();
  //       console.log(data.messages);
  //       setIsLoading(false);
  //       dispatch(setUnreadMessageAction(data.messages));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };


  return (
    <Container  className="py-3">
        <Row  style={{position:"sticky", top:"10px", background:"rgb(4,52,71)"}}>
          <Col>

          <h3>New Messages</h3>
          <h5>Total number of messages {unreadMessages.length}</h5>
          {/* <hr className="bg-light pb-0 mb-0"/> */}
          </Col>
        </Row>
    <Row  className=" mt-3 py-3">
      <Col  xs={12} md={12} lg={12} className="msg-sender-list-box p-1" style={{height:"70vh", overflow:"scroll"}}>
        {unreadMessages?.map((message, i ) => (
            <div key={i} >
                <div className='unread-message' onClick={() => {dispatch(setChatUserAction(message?.sender)); navigate("/posts")}}>
                    <div className="message-element">
                    {" "}
                    <span className="m-1">
                      <Avatar src={message?.sender?.avatar} className="p-1"/>
                    </span>
                    <span className="m-1" style={{fontSize:"15px", fontWeight:"600"}}>
                      {message?.sender?.name.toUpperCase()} {message?.sender?.surname.toUpperCase()}
                    </span>
                    
                  </div>
                  <div>

                  <p>
                    {message?.text}
                  </p>
                  <p>
                    <span className="m-1">
                      {new Date(message?.createdAt).toLocaleTimeString()}   
                    </span>
                    <span >
                      {new Date(message?.createdAt).toLocaleDateString()}   
                    </span>

                  </p>
                  </div>
                </div>
                {/* <div
                    className="sender-list "
                    onClick={() => {
                      setSingleChat(chat);
                    }}
                    >
                    <span className="m-1">
                        <Avatar src={message?.members[1]?.avatar}/>
                    </span>
                      <span className="m-1">
                        {chat?.members[1]?.name.toUpperCase()}{" "}
                        {chat?.members[1]?.surname.toUpperCase()}
                    </span>
                </div> */}
                  
        </div>
        ))}
      
      
        {Object.keys(singleChat).length > 0 &&
         
          <div >

        <h3>Message Detail</h3>
          <div style={{ textAlign: "left", margin: "0 0 0 10px" }}>
            
            <div className="message-element">
              {" "}
              <span className="m-1">
                <Avatar src={singleChat?.members[1]?.avatar} className="p-1"/>
              </span>
              <span className="m-1" style={{fontSize:"15px", fontWeight:"600"}}>
                {singleChat?.members[1]?.name.toUpperCase()} {singleChat?.members[1]?.surname.toUpperCase()}
              </span>
              
            </div>
          
            <div style={{overflow:"scroll", alignSelf:"stretch", height:"70vh"}}>

            
            {singleChat?.messages?.map((message) => 
            <div>
              {/* <p className="message-element">Text : {message.text}</p> */}
              <div >
                
                <div  className={`p-2 w-50 ${message.sender === myInfo?._id?  "ml-auto":"mr-auto"}`}>
                    <div className="d-flex">
                        <span className="m-1" style={{flex:"1", order:message?.sender?._id === myInfo?._id? 2:1}}>
                          <Avatar src={message?.sender?.avatar} className="p-1"/>
                        </span>
                        <span>
                          {message?.sender?.name}
                        </span>

                        <div>
                          <p className='single-message' style={{flex:"5",}}>
                              {message?.text}
                          </p>
                          <p style={{fontSize:'10px'}}>
                        <span className="m-1">
                        {new Date(message?.createdAt).toLocaleTimeString()}   
                        </span>
                        <span className="m-1">
                            {new Date(message?.createdAt).toLocaleDateString()} 
                        </span>
                      </p>
                        </div>
                      </div>
                </div>
            </div>
            </div>
            ) 
          }
          </div>
          </div>
            {singleChat?.product && <div >
              <h5>{singleChat?.product?.title}</h5>
              <img
                src={singleChat?.product?.images[0]}
                alt={singleChat?.product?.title}
                style={{ width: "200px" }}
                />
            </div>}
            </div>
          }
       
          </Col>
    </Row>
    </Container>
  );
}

export default MyMessages;
