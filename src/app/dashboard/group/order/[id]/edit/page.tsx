// ----------------------------------------------------------------------

import EditView from 'src/sections/order/view/edit-view';

export const metadata = {
  title: 'Dashboard: Order',
};

type Props = {
  params: {
    id: string;
  };
};

export default function OrderView({ params }: Props) {
  const { id } = params;

  return <EditView id={id} />;
}
