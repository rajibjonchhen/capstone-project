import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsersAction, setChatUserAction } from '../redux/actions/action';
import { InputBase } from '@material-ui/core';
import "./rightSidebar.css"
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  inputBase:{
    border:"1px solid white",
    borderRadius:theme.shape.borderRadius,
    height:'5vh',
    padding:theme.spacing(2),
    width:"100%",
  },
  inputBase__placeholder:{
    color:"white"
  }
 
}));


export default function RightSidebar() {

  const [error, setError] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  
  const allUsers = useSelector(state => state.user.allUsers)
  const dispatch = useDispatch()
  
  useEffect(() => {
    
      fetchUsers()
  },[])

  useEffect(() => {
    console.log(query.length, "query" , query)
    if(query.length !== 0){
      setFilteredUsers(allUsers.filter(user => user.name.toUpperCase().includes(query.toUpperCase()) || user.surname.toUpperCase().includes(query.toUpperCase() || user.email.toUpperCase().includes(query.toUpperCase()))))
    }
  },[query])

  const fetchUsers = async() => {
    
      try {
          const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/users`,{
              method:"GET",
              headers:{
                  "authorization" : localStorage.getItem("MyToken"),
              }
          })
          if(response.status !== 200){
              const data = await response.json()
              console.log(data)
              setError(data.error)
              
          } else{
              const data = await response.json()
              dispatch(setAllUsersAction(data.users))
          }
      } catch (error) {
          console.log(error)
      } 
  }

const handleChange = (e) =>  {
  
    setQuery(e.target.value)
  
}



  return (
    <List style={{boxShadow:"0 0 3px 3px rgb(224,224,224,0.3)", padding:'5px', height:"100%"}}>
      {/* <InputBase className={classes.inputBase} size='small' placeholder="search user" type="text" onKeyDown={(e) => handleChange(e)}/> */}
      <input className={classes.inputBase}   placeholder="search user" type="text" onKeyDown={(e) => handleChange(e)}/>
      <div style={{ height:"83vh", overflow:"scroll"}}>
      {(filteredUsers.length > 0? filteredUsers : allUsers).map((user, i) => 
          <ListItem key={i} className="pointer" onClick={() => dispatch(setChatUserAction(user))}>
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
          </div>
      <Divider variant="inset" component="li" />
    </List>
  );
}