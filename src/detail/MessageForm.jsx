import { TextField, Typography } from "@material-ui/core";

function MessageForm() {

    const handleChange = () => {

    }
    return ( 
        <>
        <TextField
            margin="normal"
            
            required
            fullWidth
            size="small"
            id="name"
            label="First Name"
            name="name"
            autoFocus
            
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary" align='left'>{}</Typography>
        </>
     );
}

export default MessageForm;