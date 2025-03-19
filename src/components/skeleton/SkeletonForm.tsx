// @mui
import { Box, Grid, Card, Button, Skeleton } from '@mui/material';

export default function SkeletonForm({ ...other }) {
  return (
    <form>
      <Grid container spacing={3} {...other}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }} justifyContent="center">
              <Skeleton variant="circular" width={128} height={128} />
            </Box>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={200} />
            <Skeleton variant="text" height={200} />
            <Skeleton variant="text" height={200} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
          </Card>
          <Card sx={{ p: 3, mt: 3 }}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
          </Card>
          <Card sx={{ p: 3, mt: 3 }}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
          </Card>
          <Card sx={{ p: 3, mt: 3 }}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={60} />
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            sx={{ mb: 5 }}
            fullWidth
            color="inherit"
            size="large"
            variant="contained"
            disabled
            style={{ marginTop: 16 }}
          >
            Хадгалах
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
