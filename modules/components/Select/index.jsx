import React from 'react';

import { Autocomplete, TextField } from '@mui/material';

const Select = ({ label, ...props }) => {
  return (
    <Autocomplete
      {...props}
      disablePortal
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default Select;
