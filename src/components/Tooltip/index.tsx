import * as Tooltip from '@radix-ui/react-tooltip';
import { Content } from './styles';

interface TooltipProps {
  text: string,
  children: JSX.Element,
}

export function TooltipComponent({text, children}: TooltipProps) {
  return(
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Content>
            {text}
            <Tooltip.Arrow/>
          </Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
