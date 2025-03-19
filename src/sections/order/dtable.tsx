import Table from '@mui/material/Table';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: any[];
  tableLabels: any[];
  deleteFunc: (index: number) => void;
}

export default function DTable({
  title,
  subheader,
  tableLabels,
  tableData,
  deleteFunc,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData?.map((row: any, index: number) => (
                <DTableRow
                  key={index}
                  tableLabels={tableLabels}
                  row={row}
                  index={index}
                  deleteFunc={deleteFunc}
                />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

// ----------------------------------------------------------------------

type DTableRowProps = {
  row: any;
  tableLabels: any[];
  index: number;
  deleteFunc: (index: number) => void;
};

function DTableRow({ index, row, tableLabels, deleteFunc }: DTableRowProps) {
  const popover = usePopover();

  const handleDelete = () => {
    popover.onClose();
    deleteFunc(index);
  };
  return (
    <>
      <TableRow>
        {tableLabels?.map((item: any) => !item.hide && <TableCell>{row[item.id]}</TableCell>)}

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Устгах
        </MenuItem>
      </CustomPopover>
    </>
  );
}
