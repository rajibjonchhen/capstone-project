import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllChatsAction } from "../redux/actions/action";
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

  const getMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/chats/me`,
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
        dispatch(setAllChatsAction(data.messages));
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <Container  className="py-3">
    <Row  className=" mt-3 py-3">
      <Col  xs={12} md={6} lg={4} className="msg-sender-list-box p-1">
          <h3>Messages</h3>
          <hr className="bg-light pb-0 mb-0"/>
        {allChats.map((chat, i ) => (
            <div key={i}>
              
                <div
                    className="sender-list "
                    onClick={() => {
                      setSingleChat(chat);
                    }}
                    >
                    <span className="m-1">
                        <Avatar src={chat?.members[1]?.avatar}/>
                    </span>
                      <span className="m-1">
                        {chat?.members[1]?.name.toUpperCase()}{" "}
                        {chat?.members[1]?.surname.toUpperCase()}
                    </span>
                </div>
                  
        </div>
        ))}
      </Col>
      <Col xs={12} md={6} lg={8} item className="msg-detail-box p-1">
      
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
