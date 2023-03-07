import React from 'react';

import NextLink from 'next/link';

import MUILink from '@mui/material/Link';

const Link = ({ children, ...props }) => {
  return (
    <MUILink {...props} component={NextLink}>
      {children}
    </MUILink>
  );
};

export default Link;
