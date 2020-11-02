import { Post } from './entities/Post';
import { __prod__ } from './constants';
import { MikroORM } from '@mikro-orm/core';
// https://youtu.be/I6ypD7qv3Z8?t=1669

import path from 'path';
export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post],
  debug: !__prod__,
  type: 'postgresql',
  dbName: 'ts_tutorial',
  user: '',
  password: '',
} as Parameters<typeof MikroORM.init>[0];
