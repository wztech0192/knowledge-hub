import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Box, Container, styled } from '@mui/material';
import '../../assets/css/index.scss';

export const Layout = () => {
  const StyleCircles = styled("ul")(({ theme }) => ({
    background:
      theme.palette.mode === 'dark' ? '#000000' : 'rgba(255, 255, 255, 0.2)',
  }));
  return (
    <Box minHeight="100vh">
        <div className="area">
          <StyleCircles className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </StyleCircles>
        </div>
      <Header />
      <br />
      <Container maxWidth="md" style={{ position: 'relative', zIndex: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
