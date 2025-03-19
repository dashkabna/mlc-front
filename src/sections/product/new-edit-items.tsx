import { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, Button, Divider, Typography } from '@mui/material';

import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
type Props = {
  isEdit: boolean;
};

export default function NewEditItems({ isEdit }: Props) {
  const { control, watch, setValue } = useFormContext();
  const values = watch();

  useEffect(() => {}, []);

  return (
    <Stack>
      <Typography variant="h4" sx={{ p: 2 }}>
        Product мэдээлэл
      </Typography>
      <Card>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
        >
          <Grid xs={12} md={6}>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Typography variant="subtitle2">Нэр</Typography>

              <RHFTextField name="name" value={values.name} />
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Typography variant="subtitle2">Үнэ</Typography>

              <RHFTextField name="price" value={values.price} />
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Typography variant="subtitle2">Тоо</Typography>

              <RHFTextField name="stock" value={values.stock} />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}
