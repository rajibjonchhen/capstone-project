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
import { green } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  inputColor:{
    color:"green",
    borderColor: "green"
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
    if(query.length > 0){
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
    <List style={{boxShadow:"0 0 3px 3px rgb(224,224,224,0.3)", width:"100%",}}>
      <TextField className={classes.inputColor} size='small' label="search user" type="text" onKeyDown={(e) => handleChange(e)}/>
      <div style={{ height:"100vh", overflow:"scroll"}}>
      {(filteredUsers || allUsers).map((user, i) => 
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