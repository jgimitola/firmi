import React, { useState } from 'react';

import Head from 'next/head';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import dbConnect from '@/lib/dbConnect';
import Restaurant from '@/models/Restaurant';
import User from '@/models/User';
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

    const user = users.users.find((user) => user.mail === credentials.email);
    if (user) {
      // check password
      if (user.password === credentials.password) {
        // redirect to home
        window.location.href = 'private/client';
      } else {
        // show error
        alert('Contraseña incorrecta');
      }
    } else {
      const restaurant = users.restaurants.find(
        (restaurant) => restaurant.mail === credentials.email
      );
      if (restaurant) {
        // check password
        if (restaurant.password === credentials.password) {
          // redirect to home
          window.location.href = 'private/restaurant';
        } else {
          // show error
          alert('Contraseña incorrecta');
        }
      } else {
        // show error
        alert('Usuario no encontrado');
      }
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

export async function getServerSideProps() {
  try {
    await dbConnect();

    const res = await User.find({});

    const users = res.map((doc) => {
      const user = doc.toObject();
      user._id = user._id.toString();
      return user;
    });

    const resRestautant = await Restaurant.find({});
    const restaurants = resRestautant.map((doc) => {
      const restaurant = doc.toObject();
      restaurant._id = restaurant._id.toString();
      return restaurant;
    });

    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
        restaurants: JSON.parse(JSON.stringify(restaurants)),
      },
    };
  } catch (error) {
    console.log(error);
  }
}
