import React from 'react';

const Restaurant = () => {
  return <></>;
};

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/private/client/dashboard',
      permanent: false,
    },
  };
}

export default Restaurant;
