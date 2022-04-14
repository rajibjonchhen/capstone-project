import { Container, Grid } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyMessagesAction } from "../redux/actions/action";

function MyMessages() {

    const [error, setError] = useState()
    const [singleMsg, setSingleMsg] = useState({})
    const [isLoading, setIsLoading] = useState()
    
    
    const myMessages = useSelector(state => state.user.myMessages)
    const dispatch = useDispatch()

    

    const getMessages = async() =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/users/me/messages`,{
                method:"GET",
                headers:{
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
                dispatch(setMyMessagesAction(data.messages))
              }
            } catch (error) {
              console.log(error)
            setIsLoading(false)
        }
    }


    useState(() => {
        getMessages()
    },[])


    return (  

        <Container>
 {/* <List className={classes.root}>
      {allUsers?.map(user => 
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.avatar} />
            </ListItemAvatar>
            <Typography
            style={{fontSize:"12px"}}
              >
                  {`${user.name} ${user.surname}`}
              </Typography>
          </ListItem>
          )}
      <Divider variant="inset" component="li" />
    </List> */}


            <Grid container>
                <Grid item>
                    
                    <ul>
                        {myMessages.map(message => <li onClick={() => {setSingleMsg(message)}}>{message.product}</li>)}
                    </ul>
                </Grid>
                <Grid item>
                {singleMsg && <div style={{textAlign:"left", margin:"0 0 0 10px"}}>
                                <p>Text :{singleMsg.text}</p>
                                <p>Sender :{singleMsg.sender}</p>
                                <p>Place :{singleMsg.place}</p>
                            </div>
                    }
                </Grid>
            </Grid>
                <p>{}</p>
        </Container>
    );
}

export default MyMessages;