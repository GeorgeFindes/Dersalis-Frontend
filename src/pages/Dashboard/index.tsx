import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { api } from '../../lib/axios';
import { dateFormatter } from '../../utils/formatter';
import { CaretLeft, CaretRight, MagnifyingGlass, X } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  StatusHighLight, DashboardContainer, DashboardTable,
  Pagination, PaginationButton, Overlay,
  Content, CloseButton, Description, Title, SearchFormContainer
} from './styles';

interface Medal {
  id: string,
  name: string,
}

interface ResultData {
  id: number,
  enroll_user: string,
  username: string,
  company: string,
  status: 'Sucesso' | 'Falha',
  createdAt: string,
  collected_medals: Array<Medal>;
}

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;


export function Dashboard() {

  const [resultsData, setResultsData] = useState<ResultData[]>([]);
  const [totalData, setTotalData] = useState<number | undefined>(0);
  const [limit, setLimit] = useState(8);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { register,
    handleSubmit,
    formState: { isSubmitting } } = useForm<SearchFormInputs>({
      resolver: zodResolver(searchFormSchema),
    });


  async function loadResults(query?: string) {

    let response;

    if (query) {
      response = await api.get('results', {
        params: {
          q: query
        }
      });

    } else {
      response = await api.get(`results?_page=${currentPage}&_limit=${limit}`);

      setTotalData(Number(response.headers['x-total-count']));
      const totalPages = totalData != undefined ? Math.ceil(totalData / limit) : 0;

      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
    }

    setResultsData(response.data);
  }

  async function handleSearchResults(search: SearchFormInputs) {
    await loadResults(search.query);
  }

  useEffect(() => {
    loadResults();
  }, [currentPage, limit, totalData]);


  return (
    <>
      <Header />
      <Summary />

      {/* Container Dashboard */}
      <DashboardContainer>

        {/* Formulário */}
        <SearchFormContainer onSubmit={handleSubmit(handleSearchResults)}>
          <input
            type="text"
            placeholder="Pesquisar por matricula"
            {...register('query')}
          />

          <button type='submit' disabled={isSubmitting}>
            <MagnifyingGlass size={20} />
            Pesquisar
          </button>

        </SearchFormContainer>

        {/* Tabela de Resultados */}
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
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <td>Detalhes</td>
                    </Dialog.Trigger>


                    <Dialog.Portal>
                      <Overlay />

                      <Content>
                        <CloseButton>
                          <X size={24} />
                        </CloseButton>

                        <Title>Resultado detalhado</Title>
                        <Description><strong>Nome: </strong>{result.username}</Description>
                        <Description><strong>Empresa: </strong>{result.company}</Description>
                        <Description><strong>Status: </strong>{result.status}</Description>
                        <Description><strong>Data: </strong>{dateFormatter.format(new Date(result.createdAt))}</Description>

                        <Title>Insignias </Title>
                      </Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </tr>
              );
            })}
          </tbody>
        </DashboardTable>

        {/* Paginação tabela */}
        <Pagination>

          {currentPage > 1 ? (
            <PaginationButton onClick={() => setCurrentPage(currentPage - 1)}>
              <CaretLeft size={18} />
            </PaginationButton>
          ) : (
            <PaginationButton disabled={true}>
              <CaretLeft size={18} />
            </PaginationButton>)
          }

          {pages?.map(page => (
            <PaginationButton
              key={page}
              isSelect={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationButton>
          ))}

          {currentPage < pages.length ? (
            <PaginationButton onClick={() => setCurrentPage(currentPage + 1)}>
              <CaretRight size={18} />
            </PaginationButton>
          ) : (
            <PaginationButton disabled={true}>
              <CaretRight size={18} />
            </PaginationButton>)
          }
        </Pagination>
      </DashboardContainer>
    </>
  );
}
