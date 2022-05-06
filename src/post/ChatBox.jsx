import { Avatar, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';



function ChatBox() {

    
    const chatUser = useSelector(state => state.user.chatUser)
    const myInfo = useSelector(state => state.user.myInfo)

    useEffect(() => {

        console.log("myInfo and chatUser", myInfo, chatUser)
    },[chatUser])

  return (

    <Container  style={{display:"flex", flexDirection:"column", border:"1px solid rgb(224,224,224)",borderRadius:'5px',overflow:"hidden", boxShadow:"0 0 3px 3px rgb(224,224,224,0.3)"}}>
        <Row style={{ borderBottom:"1px solid rgb(224,224,224)"}}>
            <Col >
                <ListItem  className="pointer">
                    <ListItemAvatar>
                    <Avatar alt={chatUser.name} src={chatUser.avatar} />
                    </ListItemAvatar>
                    <Typography
                    style={{fontSize:"12px"}}
                    >
                        {`${chatUser.name} ${chatUser.surname}`}
                    </Typography>
                </ListItem>
            </Col>
        </Row>
        
        <Row>
            <Col style={{width:"100%",minHeight:"70vh"}}>
                lets chat
            </Col>
        </Row>
        
        <Row>
            <Col style={{display:"flex",gap:"5px", marginBottom:"10px"}}>
                <input style={{width:"100%"}}/>
                <Button>Send</Button>
            </Col>
        </Row>
        
    </Container>
    
  )
}

export default ChatBox