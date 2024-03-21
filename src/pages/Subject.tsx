import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import { Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Subject = () => {
  const ctx = useRouteMetadataContext();
  return (
    <div>
      <Button
        variant="contained"
        component={NavLink}
        to={ctx.getPreviousPath()}>
        Back
      </Button>
      <Typography variant="h3">Subject page</Typography>
      <Typography variant="subtitle1">
        Category: {ctx.category?.name}
      </Typography>
      <Typography variant="subtitle1">Subject: {ctx.subject?.title}</Typography>

      {!!ctx.subject?.topics?.length && (
        <>
          <Typography variant="subtitle1">Topics:</Typography>

          <ol>
            {ctx.subject?.topics?.map((t, i) => (
              <li key={i}>
                <NavLink to={ctx.getNextPath(`t/${i}`)}>{t.name}</NavLink>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default Subject;
