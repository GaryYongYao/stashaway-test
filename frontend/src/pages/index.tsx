import { useEffect, useState } from "react";
import type { ChangeEvent } from 'react';
import { Inter } from "next/font/google";
import Table from '@/components/Table';
import { apiGet } from '@/utils/request';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<Security[]>([]);
  const [sortConfig, setSortConfig] = useState<SortInfo>({ key: 'name', direction: 'ASC' });
  const [search, setSearch] = useState<string>('');
  const [assetClass, setAssetClass] = useState<string>('');
  const [year, setYear] = useState<[string, string]>(['', '']);
  const [ratio, setRatio] = useState<[string, string]>(['', '']);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Ticker', accessor: 'ticker', },
    {
      header: 'Asset Class',
      accessor: 'assetClass',
      filter: true,
      filterEle: (
        <input
          type="text"
          value={assetClass}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAssetClass(event.target.value)}
          className="items-center w-full text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
          placeholder="Filter Asset Class"
        />
      ),
      clearFilter: () => setAssetClass('')
    },
    {
      header: 'Inception Year',
      accessor: 'inceptionYear',
      filter: true,
      filterEle: (
        <div className="flex items-center">
          <input
            type="number"
            value={year[0]}
            max={2024}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setYear([event.target.value, year[1]]);
            }}
            className="items-center w-full text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
            placeholder="From Inception Year"
          />
          <span className="mx-4">
            -
          </span>
          <input
            type="number"
            value={year[1]}
            max={2024}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setYear([year[0], event.target.value])
            }}
            className="items-center w-full text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
            placeholder="To Inception Year"
          />
        </div>
      ),
      clearFilter: () => setYear(['', '']),
    },
    {
      header: 'Expense Ratio',
      accessor: 'expenseRatio',
      filter: true,
      filterEle: (
        <div className="flex items-center">
          <input
            type="number"
            min={0}
            max={1}
            value={ratio[0]}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setRatio([event.target.value, ratio[1]]);
            }}
            className="items-center w-full text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
            placeholder="Minimum Ratio"
          />
          <span className="mx-4">
            -
          </span>
          <input
            type="number"
            value={ratio[1]}
            min={0}
            max={1}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setRatio([ratio[0], event.target.value])
            }}
            className="items-center w-full text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
            placeholder="Maximum Ratio"
          />
        </div>
      ),
      clearFilter: () => setRatio(['', '']),
      suffix: '%'
    },
  ];

  const getTableData = async (clearKey?: string) => {

    if (parseInt(year[0]) > parseInt(year[1])) {
      alert('From year should be less than To year');
      return;
    }

    if (parseFloat(ratio[0]) > parseFloat(ratio[1])) {
      alert('From ratio should be less than To ratio');
      return;
    }

    const filters = [];

    if (search) filters.push({ field: 'name', operator: '$contains', value: search });
    if (assetClass) filters.push({ field: 'assetClass', operator: '$contains', value: assetClass });
    if (year[0]) filters.push({ field: 'inceptionYear', operator: '$gte', value: year[0] });
    if (year[1]) filters.push({ field: 'inceptionYear', operator: '$lte', value: year[1] });
    if (ratio[0]) filters.push({ field: 'expenseRatio', operator: '$gte', value: ratio[0] });
    if (ratio[1]) filters.push({ field: 'expenseRatio', operator: '$lte', value: ratio[1] });

    let filterStrings = {};
    
    filters.forEach((f, i) => {
      if (clearKey && f.field === clearKey) return;
      filterStrings = {
        ...filterStrings,
        [`filters[$and][${i}][${f.field}][${f.operator}]`]: f.value
      }
    });

    const { data, meta } = await apiGet('/securities', {
      params: {
        ...filterStrings,
        sort: `${sortConfig.key}:${sortConfig.direction}`
      }
    });
    
    const items = data.map((item: SecurityResponse) => {
      return {
        id: item.id,
        name: item.attributes.name,
        ticker: item.attributes.ticker,
        assetClass: item.attributes.assetClass,
        inceptionYear: item.attributes.inceptionYear,
        expenseRatio: item.attributes.expenseRatio
      }
    });

    setData(items);
  }

  useEffect(() => {
    getTableData();
  }, [sortConfig])
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full text-sm">
        <input
          type="text"
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
          className="items-center w-full text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700 mb-8"
          placeholder="Search by name, press enter to search"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              getTableData();
            }
          }}
        />
        <Table
          data={data}
          columns={columns}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          getTableData={getTableData}
        />
      </div>
    </main>
  );
}
