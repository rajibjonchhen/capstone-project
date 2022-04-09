
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { List } from '@mui/icons-material';



function MyFooter() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      
      
    return ( 
        <Grid container spacing={2}> 
            <Grid item xs={12} sm={12} md={4} lg={4} >
                <Box>
                    <Typography>xs=4</Typography>
                    <div >
                        <List >
                        <ListItem>
                            <ListItemText
                                primary="Single-line item"
                                // secondary={secondary ? 'Secondary text' : null}
                            />
                            </ListItem>,
                        </List>
                    </div>
                </Box>
            </Grid>
            
        </Grid>
     );
}

export default MyFooter;

