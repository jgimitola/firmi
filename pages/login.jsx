import { useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import useLogin from '@/modules/auth/hooks/useLogin';
import isAuth from '@/modules/auth/lib/isAuth';
import NextLink from '@/modules/components/Link';
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

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-inline: 2rem;
  }
`;

const Title = styled(Typography)`
  margin-block-end: 2rem;

  font-size: 2rem;
  font-weight: 600;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 1.7rem;
  }
`;

const Form = styled(Box)`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`;

const Login = (users) => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const loginMutation = useLogin();

  const handleFieldChange = (evt) => {
    setCredentials((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { data } = await loginMutation.mutateAsync(credentials);

    if (data.data.accountType === 'CLIENT') {
      router.push('/private/client/dashboard');
    }

    if (data.data.accountType === 'RESTAURANT') {
      router.push('/private/restaurant/dashboard');
    }
  };

  const buttonDisabled = !credentials.email || !credentials.password;

  return (
    <>
      <Head>
        <title>Firmi - Login</title>
      </Head>

      <Main component="main">
        <Container maxWidth="sm">
          <LoginContainer>
            <Title component="h1">Inicio de Sesión</Title>

            <Form component="form" onSubmit={handleSubmit}>
              <TextField
                name="email"
                value={credentials.email}
                type="email"
                label="Correo electrónico"
                onChange={handleFieldChange}
              />
              <TextField
                name="password"
                value={credentials.password}
                type="password"
                label="Contraseña"
                onChange={handleFieldChange}
              />

              <Typography align="center">
                ¿No estás registrado?{' '}
                <NextLink href={{ pathname: '/register' }}>Regístrate</NextLink>
              </Typography>

              <Button
                type="submit"
                variant="contained"
                disabled={buttonDisabled}
                sx={{ mt: 2 }}
              >
                INICIAR SESIÓN
              </Button>
            </Form>
          </LoginContainer>
        </Container>
      </Main>
    </>
  );
};

export default Login;

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies['firmi-cookie'] || '';

  const { authenticated, decoded } = await isAuth(token);

  try {
    if (authenticated)
      return {
        redirect: {
          destination:
            decoded?.accountType === 'CLIENT'
              ? '/private/client/dashboard'
              : '/private/restaurant/dashboard',
          permanent: false,
        },
      };

    return { props: {} };
  } catch (error) {
    console.log(error);
  }

  return { props: {} };
};
