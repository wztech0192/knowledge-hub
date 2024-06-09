import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import { Breadcrumbs, Card, CardContent, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Subject = () => {
  const ctx = useRouteMetadataContext();
  return (
    <div>
      <Typography variant="h3">Discrete Math</Typography>
      <Typography variant="subtitle1">
        Category: <Breadcrumbs aria-label="breadcrumb">
        <NavLink to="/">Home</NavLink>
        <NavLink to="http://localhost:5173/category/0/subject/0">Subjects</NavLink>
      </Breadcrumbs>
      </Typography>
      {!!ctx.subject?.topics?.length && (
        <>
          <Grid container spacing={1}>
            {ctx.subject?.topics?.map((t, si) => (
              <Grid item md={6} xs={12} key={si}>
                <Card variant="outlined" style={{height: '100%'}}>
                  <CardContent>
                    <Typography variant='h6'>
                        {t.name}
                    </Typography>
                    <ul style={{listStyleType: "none"}}>
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
        </>
      )}
    </div>
  );
};

export default Subject;
