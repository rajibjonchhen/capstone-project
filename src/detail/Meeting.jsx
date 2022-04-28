import React, { useState } from "react";
import "date-fns"
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns"
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from "@material-ui/pickers"

function Meeting() {

    const [selectedDate, setSelectedDate] = useState( new Date("2022-05-28T10:00:00"))

    const changeHandler= (date) => {
        setSelectedDate(date)
    }
    return ( 
        <div>
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format = "MM/dd/yyyy"
                    margin="normal"
                    id="date-picker"
                    label = "Date Picker"
                    value = {selectedDate}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            hellp</div>
     );
}

export default Meeting;