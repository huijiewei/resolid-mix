import type { MetaFunction } from '@remix-run/node';

// noinspection JSUnusedGlobalSymbols
export const meta: MetaFunction = () => {
  return [{ title: 'Resolid Remix' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <>
      <h2>Resolid Remix</h2>
      <p>Get your app up and running with Remix Run!</p>
    </>
  );
}
