import { SummaryContainer, SummaryCard } from './styles';
import { Truck, CheckCircle, XCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';


interface Data {
  total_match: number,
  total_successes: number,
  total_failures: number
}


export function Summary() {

  const [data, setData] = useState<Data>();

  async function loadResults() {
    const response = await api.get('summary');

    setData(response.data);
  }

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Total de Partidas</span>
          <Truck size={40} color="#fff" />
        </header>

        <strong>{data?.total_match}</strong>
      </SummaryCard>

      <SummaryCard variant='green'>
        <header>
          <span>Total de sucesso</span>
          <CheckCircle size={40} color="#fff" />
        </header>

        <strong>{data?.total_successes}</strong>
      </SummaryCard>

      <SummaryCard variant='red'>
        <header>
          <span>Total de falhas</span>
          <XCircle size={40} color="#fff" />
        </header>

        <strong>{data?.total_failures}</strong>
      </SummaryCard>

    </SummaryContainer>
  );
}
