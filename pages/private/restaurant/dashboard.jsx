import QRCode from 'react-qr-code';

import { useRouter } from 'next/router';

import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import useLogout from '@/modules/auth/hooks/useLogout';
import useListRestaurantCharts from '@/modules/chart/hooks/useListRestaurantCharts';
import useListBoolQuestions from '@/modules/question/hooks/useListBoolQuestions';
import useListScaleQuestions from '@/modules/question/hooks/useListScaleQuestions';
import useGetCurrentRestaurant from '@/modules/restaurant/hooks/useGetCurrentRestaurant';
import styled from '@emotion/styled';
import { useSnackbar } from 'notistack';

const Main = styled(Box)`
  height: 100svh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const QRConfigContainer = styled(Paper)`
  padding-inline: 4rem;
  padding-block: 2rem;
  margin-top: 8rem;

  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-inline: 2rem;
  }
`;

const Title = styled(Typography)`
  font-size: 1.7rem;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 1.2rem;
  }
`;

const QRWrapper = styled(Box)`
  display: flex;
  justify-content: center;

  margin-block: 1.5rem 1rem;
`;

const QRBorder = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  border: 0.25rem solid black;
  border-radius: 0.25rem;

  aspect-ratio: 1;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 12.5rem;
  }
`;

const RestaurantName = styled(Typography)`
  font-size: 1.2rem;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 0.75rem;
  }
`;

const CtaText = styled(Typography)`
  font-size: 1.2rem;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 0.75rem;
  }
`;

const ActionsWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  margin-block-start: 2rem;
  margin-block-end: 4rem;
`;

const Entry = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Circle = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 0.125rem solid black;
  border-radius: 50%;

  width: 7.5rem;
  aspect-ratio: 1;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 4.4rem;
  }
`;

const Dashboard = () => {
  const router = useRouter();

  const XLSX = require('xlsx');
  const booleanQuestionsQuery = useListBoolQuestions({}, {});
  const booleanQuestions = booleanQuestionsQuery.data?.data || [];

  const chartsQuery = useListRestaurantCharts({}, {});
  const charts = chartsQuery.data?.data || [];
  console.log(charts);

  const scaleQuestionsQuery = useListScaleQuestions({}, {});
  const scaleQuestions = scaleQuestionsQuery.data?.data || [];

  const { enqueueSnackbar } = useSnackbar();

  const currentQuery = useGetCurrentRestaurant();
  const currentData = currentQuery.data?.data;

  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      enqueueSnackbar('Has salido!', { variant: 'success' });

      router.push('/login');
    } catch (error) {
      enqueueSnackbar('Hubo un error!', { variant: 'error' });
    }
  };

  return (
    <Main>
      <Container maxWidth="md">
        <QRConfigContainer>
          <Title component="h2">¡Queremos escuchar a tus usuarios!</Title>

          <QRWrapper>
            <QRBorder>
              <QRCode
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={
                  currentData
                    ? `${process.env.NEXT_PUBLIC_DEPLOY_URL}/form?restId=${currentData?._id}`
                    : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                }
              />
            </QRBorder>
          </QRWrapper>

          <RestaurantName>{currentData?.name}</RestaurantName>

          <CtaText>
            Facilítales el código QR para que compartan su opinión
          </CtaText>
        </QRConfigContainer>

        <ActionsWrapper>
          <Entry>
            <Circle>
              {/* count charts whith any answer with value 0 or 1 */}
              {charts?.charts?.filter((chart) => {
                return (
                  chart?.answers.filter((answer) => {
                    return [0, 1].includes(answer.value);
                  }).length > 0


                );
              }).length}
            </Circle>
            <Typography>Rápidas </Typography>
          </Entry>

          <Entry
            style={{ cursor: 'pointer' }}
            onClick={() => {
              // create a xlsx file with charts with their answers

              const headers = [
                [
                  'Nombre del usuario',
                  'Restaurante',
                  'Pregunta 1',
                  'Pregunta 2',
                  'Pregunta 3',
                  'Pregunta 4',
                  'Pregunta 5',
                  'Pregunta 6',
                ],
              ];

              const body = charts?.charts?.map((chart) => {
                return [
                  chart.user?.name || "No se ha registrado",
                  chart.restaurant.name,
                  [0, 1].includes(chart.answers[0]?.value)
                    ? ["No", "Si"][chart.answers[0]?.value]
                    : chart.answers[0]?.value - 1,
                  [0, 1].includes(chart.answers[1]?.value)
                    ? ["No", "Si"][chart.answers[1]?.value]
                    : chart.answers[1]?.value - 1,
                  chart.answers[2]?.value - 1 || 'No aplica',
                  chart.answers[3]?.value - 1 || 'No aplica',
                  chart.answers[4]?.value - 1 || 'No aplica',
                  chart.answers[5]?.value - 1 || 'No aplica',
                ];
              });

              const data = headers.concat(body);

              const wb = XLSX.utils.book_new();
              const ws = XLSX.utils.aoa_to_sheet(data);
              XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
              XLSX.writeFile(wb, 'sheetjs.xlsx');
            }}
          >
            <Circle>
              <DownloadIcon />
            </Circle>
            <Typography> Resultados</Typography>
          </Entry>

          <Entry>
            <Circle>
              {/* count charts whith any answer with value greater than 1 */}
              {charts?.charts?.filter((chart) => {
                return (
                  chart?.answers.filter((answer) => {
                    return answer.value > 1;
                  }).length > 0
                );
              }).length}

            </Circle>
            <Typography>Detalladas </Typography>
          </Entry>
        </ActionsWrapper>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            sx={{ margin: '0 auto', marginBottom: '2rem' }}
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Container>
    </Main>
  );
};

export default Dashboard;
