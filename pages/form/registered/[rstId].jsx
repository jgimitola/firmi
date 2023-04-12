import React from 'react';

import {
  Box,
  Button,
  Container,
  FormControlLabel,
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

const RegisteredForm = () => {
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

          <QuestionWrapper>
            <Question>La plataforma de entrega le genera confianza</Question>
            <AnswersWrapper>
              <Options>
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

          <QuestionWrapper>
            <Question>
              Los alimentos recibidos se perciben de manera adecuada
            </Question>
            <AnswersWrapper>
              <Options>
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

          <QuestionWrapper>
            <Question>
              La presentación de los productos son los esperados
            </Question>
            <AnswersWrapper>
              <Options>
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

          <QuestionWrapper>
            <Question>
              Siente seguridad al consumir el producto solicitado.
            </Question>
            <AnswersWrapper>
              <Options>
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

          <QuestionWrapper>
            <Question>
              Recibe atención del colaborador de la plataforma ante cualquier
              inquietud.
            </Question>
            <AnswersWrapper>
              <Options>
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

export default RegisteredForm;
