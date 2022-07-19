import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'


const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});
