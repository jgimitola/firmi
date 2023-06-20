import QRCode from 'react-qr-code';

import Link from 'next/link';

import DownloadIcon from '@mui/icons-material/Download';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';

import styled from '@emotion/styled';

const Main = styled(Box)`
  height: 100svh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const QRConfigContainer = styled(Paper)`
  padding-inline: 4rem;
  padding-block: 2rem;

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
  const theme = useTheme();

  const small = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Main>
      <Container maxWidth="md">
        <QRConfigContainer>
          <Title component="h2">¡Queremos escuchar a tus usuarios!</Title>

          <QRWrapper>
            <QRBorder>
              <QRCode
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value="hey"
              />
            </QRBorder>
          </QRWrapper>

          <CtaText>
            Facilítales el código QR para que compartan su opinión
          </CtaText>
        </QRConfigContainer>

        <ActionsWrapper>
          <Entry>
            <Circle>100</Circle>
            <Typography>Rápidas </Typography>
          </Entry>

          <Entry>
            <Circle>
              <DownloadIcon />
            </Circle>
            <Typography> Resultados</Typography>
          </Entry>

          <Entry>
            <Circle>100</Circle>
            <Typography>Detalladas </Typography>
          </Entry>
        </ActionsWrapper>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            href="/login"
            variant="outlined"
            LinkComponent={Link}
            sx={{ margin: '0 auto' }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Container>
    </Main>
  );
};

export default Dashboard;
