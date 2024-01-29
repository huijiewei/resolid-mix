import type { MetaFunction } from '@remix-run/node';
import type { ServerRuntimeMetaDescriptor } from '@remix-run/server-runtime';
import { mergeMeta } from '~/extensions/meta/mergeMeta';

export const mergeFrontmatter = (frontmatter: { title: string; description?: string }): MetaFunction => {
  return mergeMeta(() => {
    const meta: ServerRuntimeMetaDescriptor[] = [{ title: frontmatter.title }];

    if (frontmatter.description) {
      meta.push({ name: 'description', content: frontmatter.description });
    }

    return meta;
  });
};
