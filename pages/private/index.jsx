import React from 'react';

const Private = () => {
  return <></>;
};

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/private/restaurant/dashboard',
      permanent: false,
    },
  };
}

export default Private;
