import React from 'react';
import T from 'prop-types';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { getProp } from 'helpers/object';
import TableSkeleton from 'components/TableSkeleton';
import useStyles from './styles';
import EmptyHolder from 'components/EmptyHolder';

const ReusableTable = React.forwardRef(
  ({ columns, rows, defaultOrderBy, defaultOrder, loading, onSorting, ...props }, ref) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState(defaultOrder);
    const [orderBy, setOrderBy] = React.useState(defaultOrderBy);

    const renderCell = (item, column, index) => {
      if (typeof column.cell === 'function') {
        return column.cell({ index, item });
      }
      return getProp(item, column.name);
    };

    const handleRequestSort = (prop) => {
      if (orderBy === prop && order === 'asc') {
        setOrder('desc');
        onSorting(prop, 'desc');
      } else if (orderBy === prop && order === 'desc') {
        setOrder('');
        onSorting(prop, '');
      } else {
        setOrder('asc');
        onSorting(prop, 'asc');
      }
      setOrderBy(prop);
    };

    React.useImperativeHandle(ref, () => ({
      reset: () => {
        setOrder();
        setOrderBy();
      },
    }));

    if (loading) return <TableSkeleton data-testid="table-skeleton" theme="blue" />;

    if (!rows.length && !loading) {
      return <EmptyHolder />;
    }

    return (
      <TableContainer>
        <Table stickyHeader aria-label="sticky table" {...props}>
          <TableHead>
            <TableRow>
              {/* Dynamic generation of the header cells from the columns definitions */}
              {columns.map((column) => (
                <TableCell
                  className={classes.head}
                  key={column.name}
                  width={column.width}
                  style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}>
                  {column.sort ? (
                    <TableSortLabel
                      active={orderBy === column.name && !!order}
                      direction={order}
                      data-testid={`table-head-${column.name}`}
                      onClick={() => handleRequestSort(column.name)}>
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Dynamic generation of the cells from the columns definitions */}
            {rows.map((item, index) => (
              <TableRow
                key={Number(index)}
                data-testid={`body-row-${index}`}
                data-testgroup="body-row">
                {columns.map((column) => (
                  <TableCell
                    title={column.titleAttr ? item[column.name] : ''}
                    key={column.name}
                    numeric={column.isNumeric}
                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}>
                    {renderCell(item, column, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
);

ReusableTable.propTypes = {
  defaultOrderBy: T.string,
  defaultOrder: T.string,
  columns: T.arrayOf(T.any),
  rows: T.arrayOf(T.any),
  loading: T.bool,
  onSorting: T.func,
};

ReusableTable.defaultProps = {
  defaultOrderBy: '',
  defaultOrder: '',
  columns: [],
  rows: [],
  loading: false,
  onSorting: () => {},
};

export default ReusableTable;
