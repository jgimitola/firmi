import React, { useState } from 'react';

import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

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

const OptionLabel = styled(FormControlLabel)`
  max-width: 10ch;

  ${({ theme }) => theme.breakpoints.down('md')} {
    .MuiTypography-root {
      font-size: 14px !important;
    }
  }
`;

const Options = styled(RadioGroup)`
  flex-direction: row;
`;

const questions = [
  {
    key: 'firstQuestion',
    prompt: 'La entrega de su servicio fue oportuna o a tiempo',
  },
  {
    key: 'secondQuestion',
    prompt: 'La plataforma de entrega le genera confianza',
  },
  {
    key: 'thirdQuestion',
    prompt: 'Los alimentos recibidos se perciben de manera adecuada',
  },
  {
    key: 'fourthQuestion',
    prompt: 'La presentación de los productos son los esperados',
  },
  {
    key: 'fifthQuestion',
    prompt: 'Siente seguridad al consumir el producto solicitado.',
  },
  {
    key: 'sixthQuestion',
    prompt:
      'Recibe atención del colaborador de la plataforma ante cualquier inquietud.',
  },
];

const RegisteredForm = () => {
  const [answers, setAnswers] = useState({
    ...questions.reduce(
      (obj, question) => ({
        ...obj,
        [question.key]: null,
      }),
      {}
    ),
  });

  const handleFieldChange = (evt) => {
    setAnswers((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log(answers);
  };

  const buttonDisabled = Object.entries(answers).reduce(
    (disabled, [_, value]) => disabled || !Boolean(value),
    false
  );

  return (
    <Main>
      <Container maxWidth="md">
        <FormWrapper>
          {questions.map((question) => (
            <QuestionWrapper key={`question-${question.key}`}>
              <Question>{question.prompt}</Question>
              <AnswersWrapper>
                <Options
                  name={question.key}
                  value={answers[question.key]}
                  onChange={handleFieldChange}
                >
                  <OptionLabel
                    value="-2"
                    control={<Radio />}
                    label="Totalmente desacuerdo"
                    labelPlacement="bottom"
                  />
                  <OptionLabel
                    value="-1"
                    control={<Radio />}
                    label="Desacuerdo"
                    labelPlacement="bottom"
                  />
                  <OptionLabel
                    value="0"
                    control={<Radio />}
                    label="Neutral"
                    labelPlacement="bottom"
                  />
                  <OptionLabel
                    value="1"
                    control={<Radio />}
                    label="De acuerdo"
                    labelPlacement="bottom"
                  />
                  <OptionLabel
                    value="2"
                    control={<Radio />}
                    label="Totalmente de acuerdo"
                    labelPlacement="bottom"
                  />
                </Options>
              </AnswersWrapper>
            </QuestionWrapper>
          ))}
        </FormWrapper>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            disabled={buttonDisabled}
            onClick={handleSubmit}
            sx={{ margin: '0 auto' }}
          >
            Enviar
          </Button>
        </Box>
      </Container>
    </Main>
  );
};

export default RegisteredForm;
