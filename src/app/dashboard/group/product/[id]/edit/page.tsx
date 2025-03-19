// ----------------------------------------------------------------------

import EditView from 'src/sections/product/view/edit-view';

export const metadata = {
  title: 'Dashboard: Product',
};

type Props = {
  params: {
    id: string;
  };
};

export default function ProductView({ params }: Props) {
  const { id } = params;

  return <EditView id={id} />;
}
