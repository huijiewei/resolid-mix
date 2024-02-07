import { mergeMeta } from '~/extensions/remix/mergeMeta';

export const meta = mergeMeta(() => {
  return [{ title: '服务协议' }];
});

export default function TermsService() {
  return (
    <div className={'prose mx-auto mt-8 dark:prose-invert'}>
      <h1 className={'text-center'}>服务协议</h1>
    </div>
  );
}
