import styled from 'styled-components';

export const DashboardContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const DashboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  font-size: 1.1rem;
  min-width: 400px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 2rem rgba(0,0,0,0.15);

  thead {
    background: ${props => props.theme['blue']};
    color: ${props => props.theme['white']};
    text-align: left;
  }

  th, td {
    padding: 0.8rem 1rem;
  }

  tbody tr {
    border-bottom: 1px solid #ddd;
    color: ${props => props.theme['gray']};
  }

  /* Seleciona as linhas que são impares */
  tbody tr:nth-of-type(2n+1) {
    background: ${props => props.theme['light-gray']};
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid ${props => props.theme['blue']};
  }

  tbody td:last-of-type {
    cursor: pointer;
    font-style: oblique;
  }

`;

export const Pagination = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const PaginationButton = styled.div`
  display: flex;
`;

interface isSelectPage {
  isSelect?: boolean;
}

export const PaginationItem = styled.div<isSelectPage>`
  margin: 0 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${props => props.theme['light-gray']};
  color: ${props => props.theme['gray']};

  ${(props) => props.isSelect && {
    background: '#01003D',
    color: '#fff',
  }}
`;




interface StatusHighLightProps {
  variant: 'Falha' | 'Sucesso';
}

export const StatusHighLight = styled.span<StatusHighLightProps>`
color: ${props => props.variant === 'Sucesso' ? props.theme['green'] : props.theme['red']}
`;

