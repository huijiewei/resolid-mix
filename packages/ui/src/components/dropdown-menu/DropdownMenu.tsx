import { FloatingArrow } from '../floating/FloatingArrow';
import { FloatingTrigger } from '../floating/FloatingTrigger';
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

export const DropdownMenu = {
  Root: MenuRoot,
  Trigger: FloatingTrigger,
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
