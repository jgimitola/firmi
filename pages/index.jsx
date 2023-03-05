const Home = () => {
  return <></>;
};

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}

export default Home;
