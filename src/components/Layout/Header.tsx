import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import { Box, IconButton, styled } from '@mui/material';
import { ThemeToggle } from './ThemeToggle';
import { NavLink } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import {SearchBar} from "@/pages/SearchBar"

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#292928' : '#121212',
  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
  boxShadow: 'none',
}));

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    margin: '0 auto',
    maxWidth: '60%',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0 auto',
    maxWidth: '50%',
    width: '100%',
  },
}));

export const Header = () => {
  return (
    <StyledAppBar position="sticky">
      <Toolbar
        sx={{ minHeight: '56px !important', justifyContent: 'space-between' }}>
        <IconButton color="inherit" component={NavLink} to="/">
          <Home />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Search>
              <SearchBar/>
          </Search>
        </Box>
        <ThemeToggle />
      </Toolbar>
    </StyledAppBar>
  );
};
