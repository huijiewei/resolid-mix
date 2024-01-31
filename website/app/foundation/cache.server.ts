import Database from 'better-sqlite3';
import { createCache, type Config, type Milliseconds, type Store } from 'cache-manager';
import { join } from 'node:path';
import { rootDir } from '~/foundation/file.server';

type SqliteStoreOptions = {
  sqliteFile: string;
} & Config;

type CacheObject = {
  cacheKey: string;
  cacheData: string;
  createdAt: number;
  expiredAt: number;
};

const now = () => {
  return new Date().getTime();
};

const CACHE_TABLE_NAME = 'caches';

const sqliteStore = (options: SqliteStoreOptions): Store => {
  const isCacheable = options?.isCacheable ?? ((val) => val !== undefined);

  const sqlite = new Database(options.sqliteFile);

  sqlite.exec(`
 CREATE TABLE IF NOT EXISTS ${CACHE_TABLE_NAME} (
	'cacheKey' TEXT PRIMARY KEY,
	'cacheData' TEXT,
	'createdAt' INTEGER,
  'expiredAt' INTEGER
);
CREATE INDEX IF NOT EXISTS idx_expired_caches ON ${CACHE_TABLE_NAME}(expiredAt);
`);

  const selectStatement = sqlite.prepare(`SELECT * FROM ${CACHE_TABLE_NAME} WHERE cacheKey = ?`);
  const updateStatement = sqlite.prepare(
    `INSERT OR REPLACE INTO ${CACHE_TABLE_NAME}(cacheKey, cacheData, createdAt, expiredAt) VALUES (?, ?, ?, ?)`,
  );
  const deleteStatement = sqlite.prepare(`DELETE FROM ${CACHE_TABLE_NAME} WHERE cacheKey = ?`);

  const fetchCaches = (...args: string[]): CacheObject[] => {
    const trans = sqlite.transaction<(keys: string[]) => CacheObject[]>((keys) => {
      return keys
        .map((key) => selectStatement.get(key) as CacheObject | undefined)
        .filter((data) => data != undefined) as CacheObject[];
    });

    return trans(args);
  };

  const deleteCaches = (...args: string[]) => {
    const trans = sqlite.transaction<(keys: string[]) => void>((keys) => {
      for (const key of keys) {
        deleteStatement.run(key);
      }
    });

    trans(args);
  };

  const updateCatches = (args: [string, unknown][], ttl?: Milliseconds) => {
    const t = ttl == undefined ? options?.ttl : ttl;
    const createdAt = now();
    const expiredAt = createdAt + (t ?? 60 * 60 * 1000);

    const trans = sqlite.transaction<(args: [string, unknown][], createdAt: number, expiredAt: number) => void>(
      (args, createdAt, expiredAt) => {
        for (const cache of args) {
          if (!isCacheable(cache[1])) {
            throw new Error(`no cacheable value ${JSON.stringify(cache[1])}`);
          }

          updateStatement.run(cache[0], JSON.stringify(cache[1]), createdAt, expiredAt);
        }
      },
    );

    trans(args, createdAt, expiredAt);
  };

  return {
    del(key: string): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          deleteCaches(key);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
    get<T>(key: string): Promise<T | undefined> {
      return new Promise((resolve, reject) => {
        try {
          const result = fetchCaches(key);

          if (result.length == 0) {
            resolve(undefined);
          } else {
            resolve(JSON.parse(result[0].cacheData));
          }
        } catch (e) {
          reject(e);
        }
      });
    },
    keys(pattern?: string): Promise<string[]> {
      return new Promise((resolve, reject) => {
        try {
          const result = sqlite.prepare('SELECT cacheKey FROM caches WHERE cacheKey LIKE ?').all(pattern) as string[];
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
    },
    mdel(...args: string[]): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          deleteCaches(...args);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
    mget<T>(...args: string[]): Promise<T[]> {
      return new Promise((resolve, reject) => {
        try {
          const result = fetchCaches(...args);

          resolve(result.map((data) => JSON.parse(data.cacheData)));
        } catch (e) {
          reject(e);
        }
      });
    },
    mset(args: [string, unknown][], ttl?: Milliseconds): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          updateCatches(args, ttl);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
    reset(): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          sqlite.prepare('DELETE * FROM caches').run();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
    set<T>(key: string, data: T, ttl?: Milliseconds): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          updateCatches([[key, data]], ttl);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
    ttl(key: string): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          const result = fetchCaches(key);

          if (result.length == 0) {
            resolve(0);
          } else {
            resolve(result[0].expiredAt - now());
          }
        } catch (e) {
          reject(e);
        }
      });
    },
  };
};

const sqliteFile = join(rootDir, 'runtime', 'cache', 'cache.sqlite3');

export const cache = createCache(sqliteStore({ sqliteFile }));
