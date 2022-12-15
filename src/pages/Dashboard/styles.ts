import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

export const DashboardContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;


//Formulário
export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${props => props.theme['light-gray']};
    color: ${props => props.theme['gray']};
    font-size: 1.1rem;
    padding: 1rem;


    &::placeholder {
      color: ${props => props.theme['gray']};
    }
  }

  button {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      border: 0;
      padding: 1rem;
      background: ${props => props.theme['blue']};
      color: ${props => props.theme['white']};
      font-weight: bold;
      border-radius: 6px;
      transition: filter 0.2s;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        filter: brightness(0.9);
      }
    }
`;


//Tabela
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
    color: ${props => props.theme['blue']};
    text-decoration: underline;
  }

`;


//Modal
export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme['gray']};
`;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0,0,0,0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 40rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${props => props.theme['white']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

export const Title = styled(Dialog.Title)`
  margin-top: 1.2rem;
`;


export const Description = styled(Dialog.Description)`
  margin-top: 1rem;
  font-size: 1.2rem;
`;



//Paginação
export const Pagination = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

interface isSelectPage {
  isSelect?: boolean;
}

export const PaginationButton = styled.button<isSelectPage>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -0.7rem 0.1rem;
  font-size: 1.1rem;
  padding: 3px 9px;
  border-radius: 6px;
  border: solid 1px ${props => props.theme['light-gray']};
  background: ${props => props.isSelect && (props.theme['blue'])};
  color: ${props => props.isSelect ? props.theme['white'] : props.theme['gray']};


  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:last-of-type {
    color: ${props => props.theme['blue']};
  }

  &:nth-of-type(1) {
    color: ${props => props.theme['blue']};
  }
`;


interface StatusHighLightProps {
  variant: 'Falha' | 'Sucesso';
}

export const StatusHighLight = styled.span<StatusHighLightProps>`
color: ${props => props.variant === 'Sucesso' ? props.theme['green'] : props.theme['red']}
`;

