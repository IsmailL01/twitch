import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/Tooltip';
import { ReactNode } from 'react';

export enum HintSides {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum HintAligns {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

interface HintProps {
  label: string;
  children: ReactNode;
  asChild?: boolean;
  side?: HintSides;
  align?: HintAligns;
}

const Hint = (props: HintProps) => {
  const { label, children, asChild, side, align } = props;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className='text-black bg-white'
          side={side}
          align={align}
        >
          <p className='font-semibold'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { Hint };
