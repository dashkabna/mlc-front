import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

type Props = {
  selected: boolean;
  onSelectRow: VoidFunction;
  tableLabels: any[];
  row: any;
};

export default function InvoiceTableRow({ row, tableLabels, selected, onSelectRow }: Props) {
  return (
    <TableRow hover selected={selected} onClick={onSelectRow}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} />
      </TableCell>
      {tableLabels?.map(
        (item: any, index: number) =>
          !item.hide && <TableCell key={index}>{row[item.id]}</TableCell>
      )}
    </TableRow>
  );
}
