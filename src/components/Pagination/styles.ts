import styled from 'styled-components';


//Paginação
export const PaginationItens = styled.ul`
  display: flex;
  width: 100%;
  justify-content: center;
  list-style: none;
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
`;


