import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Box, Container } from '@mui/material';
import '../../assets/css/index.scss';

export const Layout = () => {
  return (
    <Box className="container">
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <Header />
      <br />
      <Container maxWidth="md" style={{ position: 'relative', zIndex: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
