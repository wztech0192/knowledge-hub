import { Outlet } from 'react-router-dom';
import { Header } from './Header';
<<<<<<< HEAD
import { Box, Container } from '@mui/material';
=======
import { Box, Container, styled } from '@mui/material';
import '../../assets/css/index.scss';
>>>>>>> subjectPage

export const Layout = () => {
  const StyleCircles = styled("ul")(({ theme }) => ({
    background:
      theme.palette.mode === 'dark' ? '#000000' : 'rgba(255, 255, 255, 0.2)',
  }));
  return (
<<<<<<< HEAD
    <Box bgcolor="background.default" minHeight="100%">
=======
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
>>>>>>> subjectPage
      <Header />
      <br />
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </Box>
  );
};
