import { MikroORM } from '@mikro-orm/core';
// import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolvers } from './resolvers/hello';
import { PostResolvers } from './resolvers/post';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  //接続したら自動的にマイグレーションファイルを探して、マイグレーション
  // そのため、まずはマイグレーションファイルを作る必要がある

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolvers, PostResolvers],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('listening on port 4000');
  });
};
main().catch((err) => {
  console.error('ERROR', err);
});
