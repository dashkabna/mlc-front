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
        heading="Order үүсгэх"
        links={[
          {
            name: 'Order жагсаалт',
            href: paths.dashboard.group.order.root,
          },
          {
            name: 'Order үүсгэх',
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
