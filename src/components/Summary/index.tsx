import { SummaryContainer, SummaryCard } from './styles';
import { Truck, CheckCircle, XCircle } from 'phosphor-react';

export function Summary() {
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Total de Partidas</span>
          <Truck size={40} color="#fff" />
        </header>

        <strong>20</strong>
      </SummaryCard>

      <SummaryCard variant='green'>
        <header>
          <span>Partidas concluidas com sucesso</span>
          <CheckCircle size={40} color="#fff" />
        </header>

        <strong>15</strong>
      </SummaryCard>

      <SummaryCard variant='red'>
        <header>
          <span>Partidas sem sucesso </span>
          <XCircle size={40} color="#fff" />
        </header>

        <strong>5</strong>
      </SummaryCard>

    </SummaryContainer>
  );
}
