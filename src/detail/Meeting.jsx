import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import  LocalizationProvider  from '@mui/lab/LocalizationProvider';
import  DateTimePicker  from '@mui/lab/DateTimePicker';

export default function Meeting({message, setMessage}) {
const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue)
      console.log(message)
  }

  React.useEffect(() => {
    setMessage({...message, meetingDate:value})
    
  },[value])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Meeting Date"
        value={value}
        minDate = {new Date()}
        style={{marginLeft:"100%"}}
        onChange={(newValue) => {
          handleChange(newValue)
        }}
      />
    </LocalizationProvider>
  );
}