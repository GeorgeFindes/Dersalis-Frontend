import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/axios';


interface ResultData {
  id: number,
  enroll_user: string,
  username: string,
  company: string,
  status: 'Sucesso' | 'Falha',
  createdAt: string,
}

interface ResultContextType {
  resultsData: ResultData[];
  loadResults: (query?: string) => Promise<void>;
  totalData: number | undefined;
  pages: number[] | undefined;
  setCurrentPage: (page: number) => void;
}

interface ResultsDataProviderProps {
  children: ReactNode;
}

export const ResultDataContext = createContext({} as ResultContextType);

export function ResultsDataProvider({ children }: ResultsDataProviderProps) {

  const [resultsData, setResultsData] = useState<ResultData[]>([]);
  const [totalData, setTotalData] = useState<number | undefined>(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function loadResults(query?: string) {
    //http://localhost:3333/results?_page=1
    //const response = await api.get('results',)
    const response = await api.get(`results?_page=${currentPage}&_limit=5`, {
      params: {
        q: query,
      }
    });

    console.log(currentPage);

    setTotalData(Number(response.headers['x-total-count']));
    const totalPages = Math.ceil(totalData / limit);

    const arrayPages = [];

    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }

    setPages(arrayPages);

    setResultsData(response.data);
  }

  useEffect(() => {
    loadResults();
  }, [currentPage, limit, totalData]);


  return (
    <ResultDataContext.Provider value={{
      resultsData,
      loadResults,
      totalData,
      pages,
      setCurrentPage,
    }}>
      {children}
    </ResultDataContext.Provider>
  );
}
