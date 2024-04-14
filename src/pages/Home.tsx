import { useMetadata } from '@/providers/MetadataContextProvider';
import {
  // Button,
  Container,
  // createTheme,
  Divider,
  // Fade,
  Grid,
  Typography,
  Box,
  // Stack,
  CardMedia,
  Card,
  CardContent,
  // CardActions,
  // styled,
  CardActionArea,
  Button,
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
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {metadata.categories.map((c, ci) => (
              <div key={ci} style={{ margin: '10px 0' }}>
                {c.subjects.map((s, si) => {
                  return (
                    <NavLink
                      to={`/c/${ci}/s/${si}`}
                      style={{
                        textDecoration: 'none',
                        color: '#DC6B19',
                      }}>
                      <Card variant="outlined">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Hot Air Baloon"
                            height="300"
                            image={airballon}
                          />
                          <CardContent>
                            <Typography variant="h4" color="text.primary">
                              {s.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              Discrete math deals with distinct, separate values
                              and structures like sets, functions, and graphs.
                              It's crucial in computer science, focusing on
                              logical reasoning and proof techniques to solve
                              problems efficiently.
                            </Typography>
                            <Button variant="contained" size="medium">
                              Learn More
                            </Button>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </Grid>
          <Divider />
          {/* <pre>{JSON.stringify(metadata, null, 2)}</pre> */}
        </Grid>
      </Container>
    </Box>
  );
};
