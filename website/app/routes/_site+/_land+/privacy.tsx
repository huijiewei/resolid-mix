import { mergeMeta } from '~/extensions/meta/mergeMeta';

export const meta = mergeMeta(() => {
  return [{ title: '隐私声明' }];
});

export default function Privacy() {
  return (
    <div className={'prose mx-auto mt-8 dark:prose-invert'}>
      <h1 className={'text-center'}>隐私声明</h1>
    </div>
  );
}
