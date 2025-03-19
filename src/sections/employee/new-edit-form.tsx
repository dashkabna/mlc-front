import axios from 'axios';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axiosInstance, { endpoints, BaseUrlTypes, getBaseUrl } from 'src/utils/axios';

import FormProvider from 'src/components/hook-form';
import { SkeletonForm } from 'src/components/skeleton';

import { employee } from 'src/types/types';

import NewEditItems from './new-edit-items';
// ----------------------------------------------------------------------

type Props = {
  detailData: employee | null;
  isLoading: boolean;
  isEdit: boolean;
  updateId: string;
};

export default function NewEditForm({ detailData, isLoading, isEdit, updateId }: Props) {
  const router = useRouter();

  const loadingSave = useBoolean();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Нэр шаардлагатай'),
    position: Yup.string(),
    salary: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      name: detailData?.name ? detailData?.name : '',
      position: detailData?.position ? detailData?.position : '',
      salary: detailData?.salary ? detailData?.salary : 0,
    }),
    [detailData]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [updateId, reset, defaultValues]);

  const handleSaveAsDraft = handleSubmit(async (data) => {
    loadingSave.onTrue();

    try {
      const datas = { ...data, id: updateId };
      console.log(isEdit, 'aaaaa');
      let response;
      if (isEdit) {
        response = await axios.put(`/api/post`, {
          serviceUrl: `${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI) + endpoints.employee}`,
          ...datas,
        });
      } else {
        response = await axios.post(`/api/post`, {
          serviceUrl: `${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI) + endpoints.employee}`,
          ...data,
        });
      }
      reset();
      router.push(paths.dashboard.employee.root);
    } catch (error) {
      console.log('error');
    }
    loadingSave.onFalse();
  });

  return isLoading ? (
    <SkeletonForm />
  ) : (
    <FormProvider methods={methods}>
      <NewEditItems isEdit={isEdit} />

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSave.value && isSubmitting}
          onClick={handleSaveAsDraft}
        >
          {isEdit ? 'Засах' : 'Үүсгэх'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
