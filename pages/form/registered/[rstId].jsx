import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

import useListScaleQuestions from '@/modules/question/hooks/useListScaleQuestions';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useAnswerChart from '@/modules/chart/hooks/useAnswerChart';

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

export const getServerSideProps = async (ctx) => {
  const rstId = ctx.query.rstId;

  try {
    if (!rstId || rstId === 'undefined')
      return {
        redirect: { destination: '/form', permanent: false },
      };

    return { props: {} };
  } catch (error) {}

  return { props: {} };
};

const RegisteredForm = () => {
  const router = useRouter();

  const questionsQuery = useListScaleQuestions({}, {});
  const questions = questionsQuery.data?.data || [];

  const restaurant = router?.query?.rstId;

  const answerMutation = useAnswerChart();

  const [answers, setAnswers] = useState({
    ...questions.reduce(
      (obj, question) => ({ ...obj, [question.key]: null }),
      {}
    ),
  });

  const handleFieldChange = (evt) => {
    setAnswers((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const arr = Object.entries(answers);
    const arr2 = arr.map(([key, value]) => {
      const question = questions.find((question) => question.key === key);
      return {
        questionId: question._id,
        value: +value,
      };
    });

    const res = await answerMutation.mutateAsync({
      answers: arr2,
      restaurant,
    });

    console.log(res);
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
              <Question>{question.question}</Question>
              <AnswersWrapper>
                <Options
                  name={question.key}
                  value={answers[question.key] || null}
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
