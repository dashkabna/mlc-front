// ----------------------------------------------------------------------

import EditView from 'src/sections/task/view/edit-view';

export const metadata = {
  title: 'Dashboard: Task',
};

type Props = {
  params: {
    id: string;
  };
};

export default function TaskView({ params }: Props) {
  const { id } = params;

  return <EditView id={id} />;
}
