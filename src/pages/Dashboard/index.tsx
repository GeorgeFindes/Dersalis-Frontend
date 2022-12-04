import { useContext } from 'react';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { ResultDataContext } from '../../contexts/ResultContext';
import { dateFormatter } from '../../utils/formatter';
import { SearchForm } from './components/SearchForm';
import { StatusHighLight, DashboardContainer, DashboardTable } from './styles';

export function Dashboard() {

  const { resultsData } = useContext(ResultDataContext);

  return (
    <div>
      <Header />
      <Summary />

      <DashboardContainer>

        <SearchForm />

        <DashboardTable>
          <thead>
            <tr>
              <th>Nome</th>
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
                  <td>{result.name}</td>
                  <td>{result.company}</td>
                  <td>
                    {dateFormatter.format(new Date(result.games[0].createdAt))}
                  </td>
                  <td>
                    <StatusHighLight variant={result.games[0].status}>
                      {result.games[0].status}
                    </StatusHighLight>
                  </td>
                  <td>Detalhes</td>
                </tr>
              );
            })}
          </tbody>
        </DashboardTable>
      </DashboardContainer>
    </div>
  );
}
