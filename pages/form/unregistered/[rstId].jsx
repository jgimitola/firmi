import React from 'react';

import Link from 'next/link';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/system';

import styled from '@emotion/styled';

const Main = styled(Box)`
  height: 100svh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled(Paper)`
  height: 85svh;

  padding: 2rem;
  margin-block-end: 1rem;

  overflow-y: auto;
`;

const AnswersWrapper = styled(Box)``;

const Question = styled(Typography)`
  font-weight: 600;
`;

const QuestionWrapper = styled(Box)`
  margin-block-end: 2rem;
`;

const Options = styled(RadioGroup)`
  flex-direction: row;
`;

const UnregisteredForm = () => {
  const theme = useTheme();

  const small = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Main>
      <Container maxWidth="md">
        <FormWrapper>
          <QuestionWrapper>
            <Question>
              La entrega de su servicio fue oportuna o a tiempo
            </Question>
            <AnswersWrapper>
              <Options>
                <FormControlLabel value="1" control={<Radio />} label="Sí" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </Options>
            </AnswersWrapper>
          </QuestionWrapper>

          <QuestionWrapper>
            <Question>La calidad del Producto fue lo es esperado.</Question>
            <Options>
              <FormControlLabel value="1" control={<Radio />} label="Sí" />
              <FormControlLabel value="0" control={<Radio />} label="No" />
            </Options>
          </QuestionWrapper>
        </FormWrapper>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" sx={{ margin: '0 auto' }}>
            Enviar
          </Button>
        </Box>
      </Container>
    </Main>
  );
};

export default UnregisteredForm;
