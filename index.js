import { ApolloServer, gql } from 'apollo-server';
import { randomUUID } from 'crypto';

// Data
const users = [
  {
    id: 1,
    firstName: 'Bablu',
    lastName: 'Ahmed',
    email: 'bablukpik@gmail.com',
    password: 123,
  },
  {
    id: 2,
    firstName: 'Faruk',
    lastName: 'Ahmed',
    email: 'bablucse@outlook.com',
    password: 123,
  },
];

const articles = [
  {
    title: 'How to write a Book',
    userId: 1
  },
  {
    title: 'How to write Code',
    userId: 1
  },
  {
    title: 'How to record a Video',
    userId: 2
  }
];

// A schema is a collection of type definitions (hence "typeDefs")
const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    articles: [Article] # one to many relationship
  }
  type Article {
    title: String!
    userId: ID!
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  type Mutation {
    createUser(user: UserInput!): User 
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id: givenId }, { hasUserLoggedIn }) => {
      if (!hasUserLoggedIn) throw new Error('Unauthorized'); // 401
      return users.find(({ id }) => id === Number(givenId));
    }
  },
  User: {
    articles: (parent) => { // parent means parent table
      return articles.filter((article) => article.userId === parent.id);
    }
  },
  Mutation: {
    createUser: (_, { user }) => {
      const newUser = {
        id: randomUUID,
        ...user,
      };
      users.push(newUser);
      return newUser;
    }
  }
};

// The ApolloServer constructor requires two parameters, one is schema definition and the other set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    hasUserLoggedIn: true
  },
  csrfPrevention: true,
  cache: 'bounded',
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});
