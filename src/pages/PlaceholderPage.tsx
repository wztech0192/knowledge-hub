import { Button, Fade, Typography } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';

export const PlaceholderPage = () => {
  const { id } = useParams();

  return (
    <Fade in>
      <div>
        <Typography>PlaceholderPage: {id ?? 'N/A'}</Typography>
        <Button variant="contained" component={NavLink} to="/">
          Back to home
        </Button>
      </div>
    </Fade>
  );
};
