import React from 'react';

const Form = () => {
  return <></>;
};

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/form',
      permanent: false,
    },
  };
}

export default Form;
