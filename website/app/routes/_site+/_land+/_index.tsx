import type { MetaFunction } from '@remix-run/node';
import { colors } from '@resolid-remix/stylex/colors.stylex';
import { Button } from '@resolid-remix/ui';
import * as stylex from '@stylexjs/stylex';
import { Github } from '~/assets/icons/Github';
import { HistoryLink } from '~/components/HistoryLink';

// noinspection JSUnusedGlobalSymbols
export const meta: MetaFunction = () => {
  return [{ title: 'Resolid Remix' }, { name: 'description', content: 'Welcome to Remix!' }];
};

const styles = stylex.create({
  root: {
    padding: '1rem',
    minHeight: 'calc(100vh - 13em)',
    textAlign: 'center',
    maxWidth: '56rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    color: colors.transparent,
    fontSize: '5rem',
    fontWeight: 800,
    backgroundClip: 'text',
    backgroundImage: 'linear-gradient(to right, #cd41a3, #a075e0, #509dfd, #00bbfc, #00d7dc, #009cff, #5f7cfb)',
  },
  p: {
    fontSize: '1rem',
    marginTop: '2.5rem',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '2.25rem',
  },
  icon: {
    marginRight: '0.5rem',
  },
});

export default function _index() {
  return (
    <main {...stylex.props([styles.root])}>
      <p {...stylex.props([styles.title])}>Resolid Remix</p>
      <p {...stylex.props([styles.p])}>
        这是一个很有趣的 Remix 全栈演示站点，Remix 是一个全栈 Web 框架，可让您专注于用户界面并通过 Web
        标准进行工作，以提供快速、流畅且有弹性的用户体验。人们会喜欢使用你的东西。
      </p>
      <p {...stylex.props([styles.p, styles.buttons])}>
        <Button asChild size={'lg'} color={'blue'}>
          <HistoryLink to={'/ui'}>快速开始</HistoryLink>
        </Button>
        <Button asChild size={'lg'} color={'gray'} variant={'outline'}>
          <a target={'_blank'} rel={'noopener noreferrer'} href={'https://github.com/huijiewei/resolid-remix'}>
            <Github {...stylex.props([styles.icon])} />
            Github
          </a>
        </Button>
      </p>
    </main>
  );
}
