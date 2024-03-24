interface Security {
  id: number;
  name: string;
  ticker: string;
  assetClass: string;
  inceptionYear: string;
  expenseRatio: number;
}

interface SecurityResponse {
  id: number;
  attributes: {
    name: string;
    ticker: string;
    assetClass: string;
    inceptionYear: string;
    expenseRatio: number;
  } 
}

interface SortInfo {
  key: string;
  direction: string;
}