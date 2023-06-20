import { useRouter } from 'next/router';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';

import useLogout from '@/modules/auth/hooks/useLogout';
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

  margin-block-end: 4rem;

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

const Half = styled(Box)`
  width: 50%;

  padding-inline: 1rem;
`;

const HalfWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;

  margin-block-start: 1rem;
`;

const RecentList = styled(List)`
  width: 100%;
  height: 250px;
  max-height: 250px;
  overflow-y: scroll;
`;

const Dashboard = () => {
  const router = useRouter();

  const theme = useTheme();

  const small = useMediaQuery(theme.breakpoints.down('sm'));

  const logoutMutation = useLogout();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();

    router.push('/login');
  };

  const recentForms = [
    '5P - Donde pablo - 24/08/2023',
    '5P - Donde pablo - 24/08/2023',
    '5P - Donde pablo - 24/08/2023',
    '5P - Donde pablo - 24/08/2023',
    '5P - Donde pablo - 24/08/2023',
    '5P - Donde pablo - 24/08/2023',
    '5P - Donde pablo - 24/08/2023',
    '5P - Donde pablo - 24/08/2023',
    '5P - Donde pablo - 24/08/2023',
  ];

  return (
    <Main>
      <Container maxWidth="md">
        <QRConfigContainer>
          <Title component="h2">Encuestas Recientes</Title>

          <HalfWrapper>
            <Half sx={{ borderRight: '2px solid black' }}>
              <RecentList>
                {recentForms.map((entry, i) => (
                  <ListItem key={`entry-${i}`}>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: { fontSize: small ? 14 : null },
                      }}
                    >
                      {entry}
                    </ListItemText>
                  </ListItem>
                ))}
              </RecentList>
            </Half>

            <Half
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AccountCircleIcon sx={{ fontSize: '128px' }} />
              <Button variant="contained">Completar Perfil</Button>
            </Half>
          </HalfWrapper>
        </QRConfigContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            sx={{ margin: '0 auto' }}
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
