import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import '../App.css';
import { Button } from '@mui/material';

const DateTime = () => {
  const [date, setDate] = useState(new Date('03/08/2022'));

  const handleChange = (val) => {
    setDate(val);
  };

  const checkValidity = () => {
    const dTime = new Date(date) - new Date(refDate);
    const dDays = Math.ceil(dTime / (1000 * 60 * 60 * 24));
    if (dDays >= 0) {
      console.log(dDays);
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    const isValid = checkValidity();
    if (isValid === false) {
      Notify('error', 'Please enter a valid date');
    } else {
      Notify('success', 'Submitted Successfully');
    }
  };

  const refDate = new Date();

  const Notify = (type, msg) => {
    switch (type) {
      case 'info':
        NotificationManager.info(msg);
        break;
      case 'success':
        NotificationManager.success(msg, 'Success');
        break;
      case 'warning':
        NotificationManager.warning(msg, 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error(msg, 'Error Occured!', 5000);
        break;
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DesktopDatePicker
          label='Market Launch Date'
          inputFormat='MM/DD/YYYY'
          value={date}
          onChange={handleChange}
          onError={() => Notify('error', 'Please enter a valid date')}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button
        onClick={handleSubmit}
        style={{ marginTop: '40px' }}
        variant='contained'
      >
        SUBMIT
      </Button>
      <NotificationContainer />
    </>
  );
};

export default DateTime;
