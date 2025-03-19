// @mui
import { Skeleton } from '@mui/material';
// ----------------------------------------------------------------------

export default function SkeletonLines() {
  return (
    <form>
      <Skeleton height={60} variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      <Skeleton height={60} variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      <Skeleton height={60} variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      <Skeleton height={60} variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      <Skeleton height={60} variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      <Skeleton height={60} variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      <Skeleton height={60} variant="text" sx={{ mx: 1, flexGrow: 1 }} />
    </form>
  );
}
