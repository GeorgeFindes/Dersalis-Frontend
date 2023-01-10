import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { api } from '../../lib/axios';
import { dateFormatter } from '../../utils/formatter';
import { MagnifyingGlass, X } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  StatusHighLight, DashboardContainer, DashboardTable, Overlay,
  Content, CloseButton, Description, Title, SearchFormContainer, MedalZone, MedalComp
} from './styles';
import { Pagination } from '../../components/Pagination';

interface Medal {
  id: number,
  name: string,
  description: string,
  image_path: string,
}

interface MedalResult {
  id: number,
  medal: Medal
}

interface ResultData {
  id: number,
  user_registration: string,
  username: string,
  company: string,
  status: 'Sucesso' | 'Falha',
  created_at: string,
  medal_result: Array<MedalResult>;
}

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;


export function Dashboard() {

  const [resultsData, setResultsData] = useState<ResultData[]>([]);
  const [totalData, setTotalData] = useState<number | undefined>(0);
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  const [medals, setMedals] = useState<Medal[]>([]);

  const { register,
    handleSubmit,
    formState: { isSubmitting } } = useForm<SearchFormInputs>({
      resolver: zodResolver(searchFormSchema),
    });


  async function loadResults(query?: string) {

    let response;

    if (query) {
      response = await api.get('/', {
        params: {
          search: query,
          take: take,
          skip: 0
        }
      });

    } else {
      response = await api.get('/', {
        params: {
          take: take,
          skip: skip,
        }
      });
    }

    setTotalData(Number(response.headers['x-total-count']));

    setResultsData(response.data);
  }

  async function saveMedals() {
    const response = await api.get('/medals');
    setMedals(response.data);


  }

  async function handleSearchResults(search: SearchFormInputs) {
    await loadResults(search.query);
  }

  function hasMedal(medal: Medal, medalsCollects: MedalResult[]) {

    for(let i = 0; i < medalsCollects.length; i++){
      if(medal.id === medalsCollects[i].medal.id){
        return true;
      }
    }

    return false;
  }

  useEffect(() => {
    loadResults();
  }, [skip]);

  useEffect(() => {
    saveMedals();
  }, []);


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
                  <td>{result.user_registration}</td>
                  <td>{result.company}</td>
                  <td>
                    {dateFormatter.format(new Date(result.created_at))}
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
                        <Description><strong>Data: </strong>{dateFormatter.format(new Date(result.created_at))}</Description>

                        <Title>Insígnias coletadas</Title>
                        <hr />

                        <MedalZone>
                          {medals.map((medal) => (
                            <MedalComp
                              collect={hasMedal(medal, result.medal_result)}
                              key={medal.id}
                            >
                              <img
                                src={`http://localhost:3001/uploads/${medal.image_path}`}
                                alt={medal.name}
                              />

                              <h4>{medal.name}</h4>
                            </MedalComp>
                          ))}

                        </MedalZone>


                      </Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </tr>
              );
            })}
          </tbody>
        </DashboardTable>

        {/* Paginação tabela */}

        {totalData && (
          <Pagination
            limit={take}
            total={totalData}
            skip={skip}
            setSkip={setSkip}
          />
        )}

      </DashboardContainer>
    </>
  );
}
