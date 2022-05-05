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
import { setAllUsersAction } from '../redux/actions/action';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
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
  
    setFilteredUsers(allUsers.filter(user => user.name.toUpperCase().includes(query.toUpperCase()) || user.surname.toUpperCase().includes(query.toUpperCase() || user.email.toUpperCase().includes(query.toUpperCase()))))
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
    <List className={classes.root} style={{width:"100%"}}>
      <TextField size='small' label="search user" type="text" onKeyDown={(e) => handleChange(e)}/>
      {(filteredUsers || allUsers).map((user, i) => 
          <ListItem key={i} >
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
    </List>
  );
}