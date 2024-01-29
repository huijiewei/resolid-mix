import { FloatingArrow } from '../floating/FloatingArrow';
import { MenuCheckboxItem } from '../menu/MenuCheckboxItem';
import { MenuContent } from '../menu/MenuContent';
import { MenuDivider } from '../menu/MenuDivider';
import { MenuGroup } from '../menu/MenuGroup';
import { MenuGroupLabel } from '../menu/MenuGroupLabel';
import { MenuItem } from '../menu/MenuItem';
import { MenuItemIndicator } from '../menu/MenuItemIndicator';
import { MenuItemTrigger } from '../menu/MenuItemTrigger';
import { MenuRadioGroup } from '../menu/MenuRadioGroup';
import { MenuRadioItem } from '../menu/MenuRadioItem';
import { MenuRoot } from '../menu/MenuRoot';
import { ContextMenuTrigger } from './ContextMenuTrigger';

export const ContextMenu = {
  Root: MenuRoot,
  Trigger: ContextMenuTrigger,
  Content: MenuContent,
  Arrow: FloatingArrow,
  Divider: MenuDivider,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Item: MenuItem,
  ItemTrigger: MenuItemTrigger,
  ItemIndicator: MenuItemIndicator,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
};
