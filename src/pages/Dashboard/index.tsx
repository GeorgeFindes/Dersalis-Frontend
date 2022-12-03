import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components';
import { StatusHighLight, DashboardContainer, DashboardTable } from './styles';

interface UserData {
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

export function Dashboard() {

  const [usersData, setUserData] = useState<UserData[]>([]);

  async function loadUsers() {
    const response = await fetch('http://localhost:3333/users');
    const data = await response.json();

    setUserData(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);



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
            {usersData.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.company}</td>
                  <td>
                    <StatusHighLight variant={user.games[0].status}>
                      {user.games[0].status}
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
