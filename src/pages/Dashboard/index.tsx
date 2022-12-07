import { useContext, useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { ResultDataContext } from '../../contexts/ResultContext';
import { api } from '../../lib/axios';
import { dateFormatter } from '../../utils/formatter';
import { SearchForm } from './components/SearchForm';
import { ArrowRight, ArrowLeft } from 'phosphor-react';

import { StatusHighLight, DashboardContainer, DashboardTable, Pagination, PaginationButton, PaginationItem } from './styles';


interface ResultData {
  id: number,
  enroll_user: string,
  username: string,
  company: string,
  status: 'Sucesso' | 'Falha',
  createdAt: string,
}


export function Dashboard() {

  // const { resultsData, totalData, pages, setCurrentPage } = useContext(ResultDataContext);

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
    <div>
      <Header />
      <Summary />

      <DashboardContainer>

        <SearchForm />

        <DashboardTable>
          <thead>
            <tr>
              <th>Matricula</th>
              <th>Empresa</th>
              <th>Data Game</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {resultsData.map(result => {
              return (
                <tr key={result.id}>
                  <td>{result.enroll_user}</td>
                  <td>{result.company}</td>
                  <td>
                    {dateFormatter.format(new Date(result.createdAt))}
                  </td>
                  <td>
                    <StatusHighLight variant={result.status}>
                      {result.status}
                    </StatusHighLight>
                  </td>
                  <td>Detalhes</td>
                </tr>
              );
            })}
          </tbody>
        </DashboardTable>
        <Pagination >
          {/* <div>qtd {totalData}</div> */}
          <PaginationButton>
            {currentPage > 1 && (
              <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}>
                <ArrowLeft size={20} />
              </PaginationItem>
            )}
            {pages?.map(page => (
              <PaginationItem
                isSelect={page === currentPage}
                key={page} onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationItem>
            ))}
            {currentPage < pages.length && (
              <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>
                <ArrowRight size={20} />
              </PaginationItem>
            )}
          </PaginationButton>
        </Pagination>
      </DashboardContainer>
    </div>
  );
}
