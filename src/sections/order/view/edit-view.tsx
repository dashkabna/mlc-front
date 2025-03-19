'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { endpoints, fetcherGet, BaseUrlTypes, getBaseUrl } from 'src/utils/axios';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-bread-crumbs';

// import { order } from 'src/types/types';
import { order } from 'src/types/types';

import NewEditForm from '../new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function EditView({ id }: Props) {
  const settings = useSettingsContext();
  const [detailData, setDetailData] = useState<order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDetail(id);
  }, [id]);

  const getDetail = async (value: string) => {
    setIsLoading(true);
    // const response = await fetcherGet(BaseUrlTypes.ENUM_HOST_BASE_URI, endpoints.orderId(value));

    const response = await axios.get(
      `/api/post?url=${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI) + endpoints.orderId(value)}`
    );

    if (response?.data) {
      setDetailData(response?.data);
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Order засах"
        links={[
          {
            name: 'Order жагсаалт',
            href: paths.dashboard.group.order.root,
          },
          {
            name: 'Order засах',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <NewEditForm detailData={detailData} isLoading={isLoading} isEdit updateId={id} />
    </Container>
  );
}
