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
                    <Card variant="outlined">
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
                              Discrete math deals with distinct, separate values
                              and structures like sets, functions, and graphs.
                              It's crucial in computer science, focusing on
                              logical reasoning and proof techniques to solve
                              problems efficiently.
                            </Typography>
                            <Typography
                              component='a'
                              href={`/category/${si}/subject/${si}`}
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
