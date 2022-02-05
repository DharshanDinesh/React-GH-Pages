import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';

export default function TablePaginationDemo({
  params,
  setParams,
  isLoading,
  totalPages,
  currentPage,
  rowsPerPage,
  getNewsArticles,
}) {
  const handleChangePage = (event, newPage) => {
    console.log(event, newPage);
    setParams({ ...params, page: newPage + 1 });
    getNewsArticles({ ...params, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    setParams({ ...params, page_size: event?.target?.value });
    getNewsArticles({ ...params, page_size: event?.target?.value });
  };

  return isLoading ? (
    <div style={{ width: '50%' }}>
      <Skeleton height={80} sx={{ backgroundColor: '#3399ff', width: '100%' }} />
    </div>
  ) : (
    <TablePagination
      sx={{ color: '#ffffff' }}
      component="div"
      count={totalPages}
      page={currentPage}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
