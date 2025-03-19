'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-bread-crumbs';

import NewEditForm from '../new-edit-form';

// ----------------------------------------------------------------------

export default function CreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Employee үүсгэх"
        links={[
          {
            name: 'Employee жагсаалт',
            href: paths.dashboard.group.product.root,
          },
          {
            name: 'Employee үүсгэх',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <NewEditForm detailData={null} isLoading={false} isEdit={false} updateId="0" />
    </Container>
  );
}
