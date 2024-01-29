import { FloatingArrow } from '../floating/FloatingArrow';
import { FloatingTrigger } from '../floating/FloatingTrigger';
import { PopoverBody } from './PopoverBody';
import { PopoverCloseButton } from './PopoverCloseButton';
import { PopoverContent } from './PopoverContent';
import { PopoverFooter } from './PopoverFooter';
import { PopoverHeader } from './PopoverHeader';
import { PopoverRoot, type PopoverProps } from './PopoverRoot';

export type { PopoverProps };

export const Popover = {
  Root: PopoverRoot,
  Trigger: FloatingTrigger,
  Arrow: FloatingArrow,
  Content: PopoverContent,
  Header: PopoverHeader,
  Body: PopoverBody,
  Footer: PopoverFooter,
  CloseButton: PopoverCloseButton,
};
