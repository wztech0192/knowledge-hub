import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import {
  Breadcrumbs,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListSubheader,
  styled,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const CustomStyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '20px',
  padding: theme.spacing(3),
  boxShadow: theme.shadows[4],
  fontSize: '20px',
  background:
    theme.palette.mode == 'dark'
      ? 'rgba(104, 109, 118, 0.3)'
      : 'rgba(238, 238, 238, 0.8)',
  backdropFilter: 'blur(10px)',
}));

const CustomStyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.mode == 'dark' ? '#fff' : '#6b2021',
  transition: 'color .1s ease-in-out, font-size .1s ease-in-out',
  '&:hover': {
    color: theme.palette.mode == 'dark' ? '#FFB200' : '#1A5319',
    fontSize: '1.1em',
  },
}));

export const BreadCrumbs = styled(Breadcrumbs)(() => ({
  marginBottom: "5px",
  padding: "5px 0",
}));

const Subject = () => {
  const ctx = useRouteMetadataContext();

  return (
    <div>
      <Typography variant="h3">Discrete Math</Typography>
      <Typography variant="subtitle1">
        Category:{' '}
        <BreadCrumbs aria-label="breadcrumb">
          <NavLink to="/">Home</NavLink>
          <NavLink to={ctx.getSubjectPath()}>Subjects</NavLink>
        </BreadCrumbs>
      </Typography>
      {!!ctx.subject?.topics?.length && (
        <>
          <Grid container spacing={2}>
            {ctx.subject?.topics?.map((t, si) => (
              <Grid item md={6} xs={12} key={si}>
                <CustomStyledCard>
                  <CardContent>
                    <List component="nav">
                      <ListSubheader
                        component="div"
                        sx={{
                          width: '100%',
                          textDecoration: 'none',
                          fontSize: '25px',
                        }}>
                        {t.name}
                      </ListSubheader>
                      <Divider />
                      {t.subtopics?.map((t, i) => (
                        <ListItem key={i}>
                          <CustomStyledNavLink
                            to={ctx.getNextPath(`topic/${si}/${i}`)}>
                            {t.name}
                          </CustomStyledNavLink>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </CustomStyledCard>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Subject;
