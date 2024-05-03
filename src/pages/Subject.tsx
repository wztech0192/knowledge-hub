import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
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
      <Typography variant="h3">Discrete Math</Typography>
      <Typography variant="subtitle1">
        Category: {ctx.category?.name}
      </Typography>
      <Typography variant="subtitle1">Subject: {ctx.subject?.title}</Typography>
      {!!ctx.subject?.topics?.length && (
        <>
          <Typography variant="subtitle1">Topics:</Typography>
          <Grid container spacing={1}>
            {ctx.subject?.topics?.map((t, si) => (
              <Grid item lg={4} sm={4} xs={12} key={si}>
                <Card variant="outlined" style={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t.name}
                    </Typography>
                    <ul style={{ listStyleType: 'none' }}>
                      {t.subtopics?.map((t, i) => (
                        <li key={i}>
                          <NavLink to={ctx.getNextPath(`topic/${si}/${i}`)}>
                            {t.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* <ol>
            {ctx.subject?.topics?.map((t, i) => (
              <li key={i}>
                <NavLink to={ctx.getNextPath(`topic/${i}`)}>{t.name}</NavLink>
              </li>
            ))}
          </ol> */}
        </>
      )}
    </div>
  );
};

export default Subject;
