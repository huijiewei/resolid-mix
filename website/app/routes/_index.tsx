import type { MetaFunction } from '@remix-run/node';
import { colors } from '@resolid-remix/stylex/colors.stylex';
import * as stylex from '@stylexjs/stylex';

// noinspection JSUnusedGlobalSymbols
export const meta: MetaFunction = () => {
  return [{ title: 'Resolid Remix' }, { name: 'description', content: 'Welcome to Remix!' }];
};

const styles = stylex.create({
  root: {
    color: colors.blue400,
  },
});

export default function Index() {
  return (
    <>
      <h2>Resolid Remix</h2>
      <p {...stylex.props(styles.root)}>Get your app up and running with Remix Run!</p>
    </>
  );
}
