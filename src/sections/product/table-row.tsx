import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fDate, fTime } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { product } from 'src/types/types';

// ----------------------------------------------------------------------
type Props = {
  index: number;
  row: product;
  selected: boolean;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function DTableRow({ index, row, selected, onEditRow, onDeleteRow }: Props) {
  const { id, name, price, stock, createdDate, updatedDate } = row;

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell align="left">{id}</TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{price}</TableCell>
      <TableCell align="left">{stock}</TableCell>
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
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
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
        <MenuItem
          onClick={() => {
            onDeleteRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eraser-bold" />
          Устгах
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </CustomPopover>
    </>
  );
}
