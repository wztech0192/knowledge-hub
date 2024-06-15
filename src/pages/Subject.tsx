import useRouteMetadataContext from '@/hooks/useRouteMetadataContext';
import {
  Breadcrumbs,
  Card,
  CardContent,
  createTheme,
  CssBaseline,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';


const Subject = () => {
  const ctx = useRouteMetadataContext();
  
  const CustomStyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: "20px",
    padding: theme.spacing(3),
    boxShadow: theme.shadows[4],
    fontSize: "20px",
    background: theme.palette.mode == "dark"? "rgba(104, 109, 118, 0.3)" : "rgba(238, 238, 238, 0.8)",
    backdropFilter: "blur(10px)"
  }));

  const CustomStyledNavLink = styled(NavLink)(({theme}) => ({
    textDecoration: 'none',
    color: theme.palette.mode == "dark" ? "#fff" : "#6b2021",
    transition: "color .3s ease-in-out",
    "&:hover":{
      boxShadow: theme.palette.mode == "dark" ? "inset 0 0 300px 0 #fff" : "inset 0 0 200px 0 #000",
      color: theme.palette.mode == "dark"? "black": "white",
    }
  }))

  

  return (
    <div>
      <Typography variant="h3">Discrete Math</Typography>
      <Typography variant="subtitle1">
        Category:{' '}
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink to="/">Home</NavLink>
          <NavLink to="http://localhost:5173/category/0/subject/0">
            Subjects
          </NavLink>
        </Breadcrumbs>
      </Typography>
      {!!ctx.subject?.topics?.length && (
        <>
          <Grid container spacing={2}>
            {ctx.subject?.topics?.map((t, si) => (
              <Grid item md={6} xs={12} key={si}>
                <CustomStyledCard>
                  <CardContent>
                    <Typography variant="h5">{t.name}</Typography>
                    <ul style={{ listStyleType: 'none' }}>
                      {t.subtopics?.map((t, i) => (
                        <li key={i}>
                          <CustomStyledNavLink
                            to={ctx.getNextPath(`topic/${si}/${i}`)}>
                            {t.name}
                          </CustomStyledNavLink>
                        </li>
                      ))}
                    </ul>
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
