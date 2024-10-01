import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import { Box, IconButton, Menu, MenuItem, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeToggle } from './ThemeToggle';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bookmark, Home } from '@mui/icons-material';
import { SearchBar } from '@/pages/SearchBar';
import React, { useState } from 'react';
import { useBookmarkContext } from '@/providers/BookmarksContextProvider';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#292928' : '#121212',
  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#FFFFFF',
  boxShadow: 'none',
}));

function SimpleBookmarkMenu() {
  const navigate = useNavigate();
  const { bookmarks, toggleBookmarks } = useBookmarkContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  const handleBookmarkNavigation = (path: string) => {
    navigate(`${path}`);
    handleClose();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Bookmark />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark, index) => (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <MenuItem
                key={index}
                onClick={() => {
                  handleBookmarkNavigation(bookmark.path);
                }}
                divider>
                {bookmark.name}
              </MenuItem>
              <IconButton onClick={() => toggleBookmarks(bookmark)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        ) : (
          <MenuItem onClick={handleClose}>No Bookmarks</MenuItem>
        )}
      </Menu>
    </>
  );
}

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
            <SearchBar />
          </Search>
        </Box>
        <SimpleBookmarkMenu />
        <ThemeToggle />
      </Toolbar>
    </StyledAppBar>
  );
};
