import { TextField, Typography } from '@mui/material';
import { useState } from 'react';

type DemoTsComponentWithPropsProps = {
  name: string;
  num: number;
};

export const DemoTsComponentWithProps = ({
  name,
  num,
}: DemoTsComponentWithPropsProps) => {
  const [textValue, setTextValue] = useState<string>('');

  return (
    <>
      <Typography>Name: {name}</Typography>
      <Typography>Num: {num}</Typography>

      <TextField
        label={name}
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
      />
    </>
  );
};
