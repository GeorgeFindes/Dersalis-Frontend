import styled, { css } from 'styled-components';

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;


  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5rem;

  margin-top: -5rem;
`;

interface SummaryCardProps {
  variant?: 'green' | 'red';
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${props => props.theme['gray']};
  border-radius: 0.75rem;
  padding: 3rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme['white']};
    font-weight: 700;
    font-size: 1.5rem;
  }

  span {
    width: 60%;
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
    color: ${props => props.theme['white']};
  }

  ${props => props.variant === 'green' && css`
    background: ${props.theme['green']};
  `}

  ${props => props.variant === 'red' && css`
    background: ${props.theme['red']};
  `}

`;
