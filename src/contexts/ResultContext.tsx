import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/axios';


interface ResultData {
  id: number,
  name: string,
  company: string,
  games: [{
    id: number,
    name: string,
    status: 'Sucesso' | 'Falha',
    createdAt: string
  }]
}

interface ResultContextType {
  resultsData: ResultData[];
  loadResults: (query?: string) => Promise<void>;
}

interface ResultsDataProviderProps {
  children: ReactNode;
}

export const ResultDataContext = createContext({} as ResultContextType);

export function ResultsDataProvider({ children }: ResultsDataProviderProps) {

  const [resultsData, setResultsData] = useState<ResultData[]>([]);

  async function loadResults(query?: string) {
    const response = await api.get('results', {
      params: {
        q: query,
      }
    });


    setResultsData(response.data);
  }

  useEffect(() => {
    loadResults();
  }, []);


  return (
    <ResultDataContext.Provider value={{
      resultsData,
      loadResults
    }}>
      {children}
    </ResultDataContext.Provider>
  );
}
