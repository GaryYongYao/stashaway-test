import type { Dispatch, SetStateAction } from 'react';
import { FilterIcon, UpChevronIcon, DownChevronIcon } from './Icons';
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
};

const Table: React.FC<TableProps> = ({ data, columns, sortConfig, setSortConfig, getTableData }) => {

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
    </div>
  );
};

export default Table;
