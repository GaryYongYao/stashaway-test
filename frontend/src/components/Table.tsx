import type { Dispatch, SetStateAction } from 'react';
import { UpChevronIcon, DownChevronIcon, LeftChevronIcon, RightChevronIcon } from './Icons';
import Popover from './Popover';

type Column = {
  header: string;
  accessor: string;
  filter?: boolean;
  suffix?: string;
  filterEle?: JSX.Element;
  clearFilter?: () => void;
};

type TableProps = {
  data: { [key: string]: any }[];
  columns: Column[];
  sortConfig: SortInfo;
  setSortConfig: Dispatch<SetStateAction<SortInfo>>;
  getTableData: (clearKey?: string) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  total: number;
};

const Table: React.FC<TableProps> = ({
  data,
  columns,
  sortConfig,
  setSortConfig,
  getTableData,
  page,
  setPage,
  pageSize,
  setPageSize,
  total,
}) => {

  const handleChangeItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value));
    setPage(1);
  };

  const requestSort = (key: string) => {
    let direction = 'ASC';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ASC') {
      direction = 'DESC';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.accessor}
                className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'
              >
                {column.filter && (
                  <Popover getTableData={getTableData} clearFilter={column.clearFilter} clearKey={column.accessor}>
                    {column.filterEle}
                  </Popover>
                )}
                <span className={`cursor-pointer ${column.filter ? 'pl-2' : ''}`} onClick={() => requestSort(column.accessor)}>
                  {column.header}
                </span>
                {sortConfig && sortConfig.key === column.accessor ? (sortConfig.direction === 'ASC' ?  <UpChevronIcon fillColor='#bbb'/> : <DownChevronIcon fillColor='#bbb'/>) : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td
                  key={column.accessor}
                  className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'
                >
                  {item[column.accessor]}{column.suffix}
                </td>
              ))}
            </tr>
          ))}
          {data.length < 1 && (
            <tr>
              <td
                colSpan={columns.length}
                className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'
              >
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <select value={pageSize} onChange={handleChangeItemsPerPage}>
          {[3, 5, 10, 15, 20].map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <div>
          {page !== 1 && (
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="me-3"
            >
              <LeftChevronIcon fillColor='#fff' />
            </button>
          )}
          <span>{page} of {(total / pageSize).toFixed(0)} </span>
          {page !== parseInt((total / pageSize).toFixed(0)) && (
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === parseInt((total / pageSize).toFixed(0)) }
              className="ms-3"
            >
              <RightChevronIcon fillColor='#fff' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
