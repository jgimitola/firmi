import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
