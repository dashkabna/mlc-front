'use client';

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

import axiosInstance, { endpoints, BaseUrlTypes, getBaseUrl } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';
import { AuthContext } from 'src/auth/context/jwt';

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

import { user } from 'src/types/types';

import DTableRow from '../table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'index', label: '№' },
  { id: 'id', label: 'Id' },
  { id: 'fullName', label: 'Нэр' },
  { id: 'email', label: 'email' },
  { id: 'createdDate', label: 'Бүртгэсэн огноо' },
  { id: 'modifiedDate', label: 'Өөрчилсөн огноо' },
  { id: '' },
];

export default function ListView() {
  const settings = useSettingsContext();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'createdDate', defaultOrder: 'desc' });

  const [tableData, setTableData] = useState<user[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const denseHeight = table.dense ? 56 : 56 + 20;
  const isNotFound = !isLoading && !tableData.length;

  const getList = async () => {
    setIsLoading(true);
    const response = await axiosInstance.get(
      `/api/post?url=${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI) + endpoints.user}`
    );
    // const response = await fetcherGet(BaseUrlTypes.ENUM_HOST_BASE_URI, endpoints.user);

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
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="User жагсаалт"
        links={[
          {
            name: 'Нүүр',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.user.root,
          },
          {
            name: 'User',
          },
        ]}
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
