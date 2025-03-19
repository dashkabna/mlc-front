// @mui
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
// ----------------------------------------------------------------------

export default function SkeletonCheckBox() {
  return (
    <form>
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Skeleton variant="circular" sx={{ width: 30, height: 30 }} />
        <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Skeleton variant="circular" sx={{ width: 30, height: 30 }} />
        <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Skeleton variant="circular" sx={{ width: 30, height: 30 }} />
        <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Skeleton variant="circular" sx={{ width: 30, height: 30 }} />
        <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Skeleton variant="circular" sx={{ width: 30, height: 30 }} />
        <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Skeleton variant="circular" sx={{ width: 30, height: 30 }} />
        <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Skeleton variant="circular" sx={{ width: 30, height: 30 }} />
        <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
    </form>
  );
}
