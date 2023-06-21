import Head from 'next/head';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import styled from '@emotion/styled';

const Main = styled(Box)`
  height: 100svh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled(Paper)`
  padding-inline: 4rem;
  padding-block: 2rem;
  padding-block-end: 4rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-inline: 2rem;
  }
`;

const Title = styled(Typography)`
  margin-block-end: 1rem;

  font-size: 2rem;
  font-weight: 600;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 1.7rem;
  }
`;

const Form = () => {

  const {rest} = router.query;

  return (
    <>
      <Head>
        <title>Firmi - Llenar encuesta</title>
      </Head>

      <Main component="main">
        <Container maxWidth="sm">
          <LoginContainer>
            <Title component="h1">Llenar encuesta</Title>

            <Button href={`/login/${rest}`} variant="contained" LinkComponent={Link}>
              INICIAR SESIÓN
            </Button>
            <Button href={`/form/unregistered/${rest}`} variant="outlined" LinkComponent={Link}>
              CONTINUAR SIN USUARIO
            </Button>
          </LoginContainer>
        </Container>
      </Main>
    </>
  );
};

export async function getServerSideProps(context) {
  // ! Si ya tiene sesión iniciada redirigir al formulario
  // ! Si no viene id de formulario redirigir al login

  return {
    props: {},
    /*  redirect: {
      destination: '/login',
      permanent: false,
    }, */
  };
}

export default Form;
