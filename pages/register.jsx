import React, { useState } from 'react';

import Head from 'next/head';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import NextLink from '@/modules/components/Link';
import Select from '@/modules/components/Select';
import styled from '@emotion/styled';

const Main = styled(Box)`
  height: 100svh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterContainer = styled(Paper)`
  max-height: 100svh;

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
  padding-block: 1rem;

  display: flex;
  flex-direction: column;

  overflow-y: auto;

  gap: 1rem;
`;

const initialData = {
  accountType: { id: 'RESTAURANT', label: 'Restaurante' },
  fullname: '',
  age: '',
  gender: { label: 'Femenino', id: 'F' },
  restaurantName: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const accountTypeOptions = [
  { label: 'Restaurante', id: 'RESTAURANT' },
  { label: 'Cliente', id: 'CLIENT' },
];

const genderOptions = [
  { label: 'Femenino', id: 'F' },
  { label: 'Masculino', id: 'M' },
  { label: 'Otro', id: 'O' },
];

const equalityOptionValue = (option, value) => option.id === value.id;

const Register = () => {
  const [data, setData] = useState({ ...initialData });

  const handleSelectableChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (evt) => {
    setData((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(data);
  };

  const clientRegister = data.accountType.id === 'CLIENT';
  const restaurantRegister = data.accountType.id === 'RESTAURANT';
  const passwordsMatch = data.password === data.repeatPassword;
  const buttonDisabled =
    (clientRegister &&
      (!data.accountType || !data.fullname || !data.age || !data.gender)) ||
    (restaurantRegister && (!data.accountType || !data.restaurantName)) ||
    !data.email ||
    !data.password ||
    !data.repeatPassword;

  return (
    <>
      <Head>
        <title>Firmi - Register</title>
      </Head>

      <Main component="main">
        <Container maxWidth="sm">
          <RegisterContainer>
            <Title component="h1">Registro</Title>

            <Form component="form" onSubmit={handleSubmit}>
              <Select
                name="accountType"
                label="Tipo de cuenta"
                value={data.accountType}
                onChange={(_, value) =>
                  handleSelectableChange('accountType', value)
                }
                options={accountTypeOptions}
                isOptionEqualToValue={equalityOptionValue}
              />

              {clientRegister && (
                <>
                  <TextField
                    name="fullname"
                    value={data.fullname}
                    label="Nombre completo"
                    onChange={handleFieldChange}
                  />
                  <TextField
                    name="age"
                    value={data.age}
                    type="number"
                    label="Edad"
                    onChange={handleFieldChange}
                  />
                  <Select
                    name="gender"
                    label="Género"
                    value={data.gender}
                    onChange={(_, value) =>
                      handleSelectableChange('gender', value)
                    }
                    options={genderOptions}
                    isOptionEqualToValue={equalityOptionValue}
                  />
                </>
              )}

              {restaurantRegister && (
                <TextField
                  name="restaurantName"
                  value={data.restaurantName}
                  label="Nombre del restaurante"
                  onChange={handleFieldChange}
                />
              )}

              <TextField
                name="email"
                value={data.email}
                type="email"
                label="Correo electrónico"
                onChange={handleFieldChange}
              />
              <TextField
                name="password"
                value={data.password}
                type="password"
                label="Contraseña"
                onChange={handleFieldChange}
                error={!passwordsMatch}
                helperText={!passwordsMatch && 'Las contraseñas no coinciden'}
              />
              <TextField
                name="repeatPassword"
                value={data.repeatPassword}
                type="password"
                label="Repetir Contraseña"
                onChange={handleFieldChange}
                error={!passwordsMatch}
                helperText={!passwordsMatch && 'Las contraseñas no coinciden'}
              />

              <Typography align="center">
                ¿Ya estás registrado?{' '}
                <NextLink href={{ pathname: '/login' }}>Inicia sesión</NextLink>
              </Typography>

              <Button
                type="submit"
                variant="contained"
                disabled={buttonDisabled}
                sx={{ mt: 2 }}
              >
                Regístrate
              </Button>
            </Form>
          </RegisterContainer>
        </Container>
      </Main>
    </>
  );
};

export default Register;
