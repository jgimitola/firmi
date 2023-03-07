import React, { useState } from 'react';

import Head from 'next/head';

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import NextLink from '@/modules/components/Link';
import useHelloWorld from '@/modules/hooks/useHelloWorld';
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

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleFieldChange = (evt) => {
    setCredentials((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(credentials);
  };

  const buttonDisabled = !credentials.email || !credentials.password;

  const helloWorldInfo = useHelloWorld();
  const response = helloWorldInfo.data.data;

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
                <NextLink
                  href={{
                    pathname: '/register',
                    query: { rstId: undefined },
                  }}
                >
                  Regístrate
                </NextLink>
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
