'use client';

import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { endpoints, getBaseUrl, BaseUrlTypes } from 'src/utils/axios';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-bread-crumbs/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import { order, product } from 'src/types/types';

import DTableRow from '../table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'index', label: '№' },
  { id: 'id', label: 'Id' },
  { id: 'name', label: 'Нэр' },
  { id: 'price', label: 'Үнэ' },
  { id: 'stock', label: 'Тоо' },
  { id: 'createdDate', label: 'Бүртгэсэн огноо' },
  { id: 'modifiedDate', label: 'Өөрчилсөн огноо' },
  { id: '' },
];

export default function ListView() {
  const settings = useSettingsContext();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'createdDate', defaultOrder: 'desc' });

  const [tableData, setTableData] = useState<product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const denseHeight = table.dense ? 56 : 56 + 20;
  const isNotFound = !isLoading && !tableData.length;

  const getList = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `/api/post?url=${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI) + endpoints.product}`
    );

    if (response?.data != null) {
      setTableData(response?.data);
    } else {
      setTableData([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.group.product.edit(id));
    },
    [router]
  );

  const handleDeleteRow = useCallback(async (id: string) => {
    try {
      await axios.delete(
        `/api/post?url=${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI) + endpoints.productId(id)}`
      );
      getList();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Product жагсаалт"
        links={[
          {
            name: 'Нүүр',
            href: paths.dashboard.root,
          },
          {
            name: 'Product',
            href: paths.dashboard.group.order.root,
          },
          {
            name: 'Product',
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.group.product.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Product бүртгэх
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {(isLoading ? [...Array(10)] : tableData).map((row, index) =>
                  row ? (
                    <DTableRow
                      index={index}
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                  ) : (
                    !isNotFound && (
                      <TableSkeleton key={String(index)} sx={{ height: denseHeight }} />
                    )
                  )
                )}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, 20)}
                />

                <TableNoData notFound={isNotFound} />
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
    </Container>
  );
}
