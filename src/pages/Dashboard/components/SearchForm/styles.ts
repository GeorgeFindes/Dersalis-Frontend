import styled from 'styled-components';


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
      background: ${props => props.theme['navy-blue']};
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
