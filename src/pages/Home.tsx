import { DemoTsComponentWithProps } from '@/components/DemoTsComponentWithProps';
import { useMetadata } from '@/providers/MetadataContextProvider';
import { Button, Divider, Fade, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  const metadata = useMetadata();
  return (
    <Fade in>
      <Stack spacing={2}>
        <Typography>This is the home page</Typography>

        <Button variant="contained" component={NavLink} to="/placeholder/1234">
          Go to placeholder page
        </Button>

        <Divider />

        {metadata.categories.map((c, ci) => (
          <div key={ci}>
            <Typography>
              Category: <b>{c.name}</b>
            </Typography>
            <ol>
              {c.subjects.map((s, si) => {
                return (
                  <li key={si}>
                    <NavLink to={`/c/${ci}/s/${si}`}>{s.title}</NavLink>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
<<<<<<< HEAD
        <Divider />

        <pre>{JSON.stringify(metadata, null, 2)}</pre>

        <Divider />
        <DemoTsComponentWithProps name="Hello World" num={2024} />
      </Stack>
    </Fade>
=======
        <Grid container spacing={3} key={"false"}>
          <Grid item xs={12}>
            {metadata.categories.map((c, ci) => (
              <div key={ci} style={{ margin: '10px 0' }}>
                {c.subjects.map((s, si) => {
                  return (
                    <NavLink
                      to={`/category/${ci}/subject/${si}`}
                      style={{
                        textDecoration: 'none',
                      }}
                      key={si}>
                      <Card variant="outlined">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Hot Air Baloon"
                            height="210"
                            image={airballon}
                          />
                          <CardContent>
                            <Typography variant="h4" color="text.primary" gutterBottom>
                              {s.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                              Discrete math deals with distinct, separate values
                              and structures like sets, functions, and graphs.
                              It's crucial in computer science, focusing on
                              logical reasoning and proof techniques to solve
                              problems efficiently.
                            </Typography>
                            <Button variant="outlined" size="medium">
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
>>>>>>> subjectPage
  );
};
