import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { fDate, fTime } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { user } from 'src/types/types';

// ----------------------------------------------------------------------
type Props = {
  index: number;
  row: user;
  selected: boolean;
  onEditRow: VoidFunction;
};

export default function DTableRow({ index, row, selected, onEditRow }: Props) {
  const { id, fullName, email, createdDate, updatedDate } = row;

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell align="left">{id}</TableCell>
      <TableCell align="left">{fullName}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell>
        <ListItemText
          primary={fDate(createdDate)}
          secondary={fTime(createdDate)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell>
        <ListItemText
          primary={fDate(updatedDate)}
          secondary={fTime(updatedDate)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Засах
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </CustomPopover>
    </>
  );
}
