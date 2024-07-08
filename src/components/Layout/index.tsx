import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Box, Container } from '@mui/material';
import '../../assets/css/index.scss';

export const Layout = () => {
  
  return (
    <Box minHeight="100vh">
      <Header />
      <br />
      <Container maxWidth="md" style={{ position: 'relative'}}>
        <Outlet />
      </Container>
    </Box>
  );
};
