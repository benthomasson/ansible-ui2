/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ITableColumn, TableColumnCell } from '../PageTable/PageTableColumn';
import { PageDetail } from './PageDetail';
import { PageDetails } from './PageDetails';

export function PageDetailsFromColumns<T extends object>(props: {
  item: T | undefined;
  columns: ITableColumn<T>[];
  disablePadding?: boolean;
  numberOfColumns?: 'multiple' | 'single';
}) {
  const { item, columns, disablePadding, numberOfColumns } = props;
  if (!item) return <></>;
  return (
    <PageDetails disablePadding={disablePadding} numberOfColumns={numberOfColumns}>
      {columns.map((column) => (
        <PageDetail key={column.id ?? column.header} label={column.header}>
          <TableColumnCell column={column} item={item} />
        </PageDetail>
      ))}
    </PageDetails>
  );
}
