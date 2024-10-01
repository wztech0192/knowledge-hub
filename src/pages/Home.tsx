import { useMetadata } from '@/providers/MetadataContextProvider';
import {
  Container,
  Grid,
  Typography,
  Box,
  CardMedia,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import airballon from '../assets/images/airballoon.png';
import { NavLink } from 'react-router-dom';
import '../assets/css/index.scss';

export const Home = () => {
  const metadata = useMetadata();
  return (
    <Box>
      <Container maxWidth="xs">
        {metadata.categories.map((c, ci) => (
          <div key={ci}>
            <Typography>
              Category: <b>{c.name}</b>
            </Typography>
          </div>
        ))}
        <Grid container spacing={3} key={'false'}>
          <Grid item xs={12}>
            {metadata.categories.map((c, ci) => (
              <div key={ci} style={{ margin: '10px 0' }}>
                {c.subjects.map((s, si) => {
                  return (
                    <Card variant="outlined" key={si}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Hot Air Baloon"
                          height="210"
                          image={airballon}
                        />
                        <NavLink
                          to={`/category/${si}/subject/${si}`}
                          style={{
                            textDecoration: 'none',
                          }}
                          key={si}>
                          <CardContent>
                            <Typography
                              variant="h4"
                              color="text.primary"
                              gutterBottom>
                              {s.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              gutterBottom>
                              This is the website of Math 174 Discrete Math for
                              Computer Science in Department of Computer
                              Science, Engineering, and Mathematics at the
                              University of South Carolina Aiken.
                            </Typography>
                            <Typography
                              variant="button"
                              color="primary"
                              sx={{
                                marginTop: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor: 'black',
                                maxWidth: '40%',
                                padding: '10px',
                                borderRadius: '20px',
                                color: 'white',
                                textDecoration: 'none',
                              }}>
                              Learn More
                            </Typography>
                          </CardContent>
                        </NavLink>
                      </CardActionArea>
                    </Card>
                  );
                })}
              </div>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
