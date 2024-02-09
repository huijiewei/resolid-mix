import { Tooltip, useClipboard } from '@resolid/mix-ui';
import { __DEV__ } from '@resolid/mix-utils';
import { isValidElement, useMemo, type ReactNode } from 'react';
import { SpriteIcon } from '~/components/SpriteIcon';

export const ClipboardCopyButton = ({ content }: { content: ReactNode }) => {
  const { copied, copy } = useClipboard();

  const code = useMemo(() => {
    return reactNodeToString(content);
  }, [content]);

  return (
    <Tooltip.Root color={copied ? 'success' : undefined}>
      <Tooltip.Trigger asChild>
        <button
          onClick={() => copy(code)}
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

// From https://github.com/sunknudsen/react-node-to-string/blob/master/src/index.ts

const reactNodeToString = function (reactNode: ReactNode): string {
  let string = '';

  if (typeof reactNode === 'string') {
    string = reactNode;
  } else if (typeof reactNode === 'number') {
    string = reactNode.toString();
  } else if (Array.isArray(reactNode)) {
    reactNode.forEach(function (child) {
      string += reactNodeToString(child);
    });
  } else if (isValidElement(reactNode)) {
    string += reactNodeToString(reactNode.props.children);
  }

  return string;
};
