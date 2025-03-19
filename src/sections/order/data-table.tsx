import Table from '@mui/material/Table';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useTable, TableHeadCustom, TablePaginationCustom } from 'src/components/table';
import { order } from 'src/types/types';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: any[];
  tableLabels: any[];
  deleteFunc: (index: number, data: order) => void;
  updateFunc: (index: number, data: order) => void;
  isEdit: boolean;
}

export default function DTable({
  title,
  subheader,
  tableLabels,
  tableData,
  deleteFunc,
  isEdit,
  updateFunc,
  ...other
}: Props) {
  const table = useTable({ defaultOrderBy: 'id' });

  return (
    <Card {...other}>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row: any, index: number) => (
                  <DTableRow
                    tableLabels={tableLabels}
                    key={index}
                    row={row}
                    // deleteFunc
                    // updateFunc={updateFunc}
                  />
                ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      <TablePaginationCustom
        count={tableData.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        //
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type DTableRowProps = {
  row: any;
  tableLabels: any[];
};

function DTableRow({ row, tableLabels }: DTableRowProps) {
  const theme = useTheme();
  const open = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow>
        {tableLabels?.map(
          (item: any) =>
            !item.hide && (
              <TableCell
                sx={{
                  pr: 1,
                }}
              >
                {row[item.id]}
              </TableCell>
            )
        )}

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
        <MenuItem onClick={open.onTrue}>
          <Iconify icon="solar:pen-bold" />
          Засах
        </MenuItem>
        {/* <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Устгах
        </MenuItem> */}
      </CustomPopover>
    </>
  );
}
