import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import clsx from 'clsx';
import T from 'prop-types';
import useStyles from './styles';

const TableSkeleton = () => {
  const classes = useStyles();
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[...Array(4)].map((_, i) => (
                <TableCell key={Number(i)}>
                  <Skeleton className={clsx(classes.skeleton, classes.head)} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(6)].map((_, j) => (
              <TableRow key={Number(j)}>
                {[...Array(4)].map((_, i) => (
                  <TableCell key={Number(i)}>
                    <Skeleton className={clsx(classes.skeleton)} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

TableSkeleton.propTypes = {
  dividerProps: T.objectOf(T.any),
  dividerColor: T.string,
  theme: T.string,
};

TableSkeleton.defaultProps = {
  dividerProps: {},
  dividerColor: '#337ec6',
  theme: 'rgba(255, 255, 255, 0.15)',
};

export default TableSkeleton;
