// ----------------------------------------------------------------------

import EditView from 'src/sections/employee/view/edit-view';

export const metadata = {
  title: 'Dashboard: Employee',
};

type Props = {
  params: {
    id: string;
  };
};

export default function EmployeeEditView({ params }: Props) {
  const { id } = params;

  return <EditView id={id} />;
}
