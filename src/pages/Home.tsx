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

        <pre>{JSON.stringify(metadata, null, 2)}</pre>
        <Divider />
        <DemoTsComponentWithProps name="Hello World" num={2024} />
      </Stack>
    </Fade>
  );
};
