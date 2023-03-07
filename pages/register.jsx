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

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
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
        <title>Firmi - Register</title>
      </Head>

      <Main component="main">
        <Container maxWidth="sm">
          <LoginContainer>
            <Title component="h1">Inicio de Sesión</Title>

            <Form component="form" onSubmit={handleSubmit}>
              <TextField
                name="email"
                type="email"
                label="Correo electrónico"
                onChange={handleFieldChange}
              />
              <TextField
                name="password"
                type="password"
                label="Contraseña"
                onChange={handleFieldChange}
              />

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

export default Register;
