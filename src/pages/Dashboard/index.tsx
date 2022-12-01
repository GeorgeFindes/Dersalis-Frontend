import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components';
import { StatusHighLight, DashboardContainer, DashboardTable } from './styles';

export function Dashboard() {
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
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Mario Carlos Augusto</td>
              <td>Empresa A</td>
              <td>
                <StatusHighLight variant='Sucesso'>
                  Sucesso
                </StatusHighLight>
              </td>
              <td>Detalhes</td>
            </tr>

            <tr>
              <td>Mario Carlos Augusto</td>
              <td>Empresa A</td>
              <td>
                <StatusHighLight variant='Falha'>
                  Falha
                </StatusHighLight>
              </td>
              <td>Detalhes</td>
            </tr>

            <tr>
              <td>Caio Lopes Santos</td>
              <td>Empresa A</td>
              <td>
                <StatusHighLight variant='Sucesso'>
                  Sucesso
                </StatusHighLight>
              </td>
              <td>Detalhes</td>
            </tr>

            <tr>
              <td>Matheus Ferreira</td>
              <td>Empresa C</td>
              <td>
                <StatusHighLight variant='Sucesso'>
                  Sucesso
                </StatusHighLight>
              </td>
              <td>Detalhes</td>
            </tr>
          </tbody>
        </DashboardTable>
      </DashboardContainer>
    </div>
  );
}
