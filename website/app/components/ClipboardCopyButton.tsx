import { Tooltip, useClipboard } from '@resolid/mix-ui';
import { __DEV__ } from '@resolid/mix-utils';
import { SpriteIcon } from '~/components/SpriteIcon';

export const ClipboardCopyButton = ({ content }: { content: string }) => {
  const { copied, copy } = useClipboard();

  return (
    <Tooltip.Root color={copied ? 'success' : undefined}>
      <Tooltip.Trigger asChild>
        <button
          onClick={() => copy(content)}
          type={'button'}
          className={'relative appearance-none p-1 font-medium leading-none'}
        >
          {copied ? (
            <SpriteIcon size={'1em'} className={'text-fg-success'} name={'clipboard-check'} />
          ) : (
            <SpriteIcon size={'1em'} className={'text-fg-muted hover:text-link-hovered'} name={'clipboard'} />
          )}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        {copied ? '复制成功' : '复制代码'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

if (__DEV__) {
  ClipboardCopyButton.displayName = 'ClipboardCopyButton';
}
