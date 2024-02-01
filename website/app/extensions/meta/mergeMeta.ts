import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import type { ServerRuntimeMetaDescriptor } from '@remix-run/server-runtime';
import { isString } from '@resolid/mix-utils';

const titleJoin = ' - ';

export const mergeMeta = <
  Loader extends LoaderFunction | unknown = unknown,
  ParentsLoaders extends Record<string, LoaderFunction | unknown> = Record<string, unknown>,
>(
  metaFn: MetaFunction<Loader, ParentsLoaders>,
): MetaFunction<Loader, ParentsLoaders> => {
  return (arg) => {
    const leafMeta = metaFn(arg);

    const mergedMeta = arg.matches.reduceRight((acc, match) => {
      for (const parentMeta of match.meta) {
        const index = acc.findIndex((meta) => {
          if ('name' in meta && 'name' in parentMeta) {
            return meta.name === parentMeta.name;
          }

          if ('property' in meta && 'property' in parentMeta) {
            return meta.property === parentMeta.property;
          }

          if ('title' in meta && 'title' in parentMeta) {
            return meta.title === parentMeta.title;
          }

          return false;
        });

        if (index == -1) {
          acc.push(parentMeta);
        }
      }
      return acc;
    }, leafMeta);

    const titles: string[] = [];
    const result: ServerRuntimeMetaDescriptor[] = [];

    for (const meta of mergedMeta) {
      if ('title' in meta) {
        if (isString(meta.title) && meta.title.length > 0) {
          titles.push(...meta.title.split(titleJoin));
        }
      } else {
        result.push(meta);
      }
    }

    result.unshift({ title: [...new Set(titles)].join(titleJoin) });

    return result;
  };
};
