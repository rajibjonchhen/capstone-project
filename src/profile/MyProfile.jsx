import { Grid, TextField } from "@material-ui/core";
import "./myProfile.css"


const handleChange = () => {

}
function MyProfile() {
    return (  
        <Grid container className="profile-box" spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <ul>
                    <li>
                        My Creations
                    </li>
                    <li>
                        Messages
                    </li>
                    <li>
                        Messages
                    </li>
                    <li>
                        Add New Product
                    </li>
                </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
                <div>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="title"
                    label="title"
                    name="title"
                    autoFocus
                    onChange={(e) => handleChange(e)}
            />
                </div>
            </Grid>
        </Grid>
    );
}

export default MyProfile;