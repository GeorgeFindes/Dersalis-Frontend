import * as Tooltip from '@radix-ui/react-tooltip';
import styled, { keyframes } from 'styled-components';


const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const duration = 400; //duração da animação em milisegundos

export const Content = styled(Tooltip.Content)`
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 0.9rem;
  line-height: 1;
  color: ${props => props.theme['white']};
  background-color: black;
  user-select: none;

  animation: ${slideUpAndFade} ${duration}ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
`;
