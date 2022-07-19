import { gql } from "apollo-server";


const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
  }
  input UserInput {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }
  type Mutation {
     signup(user: UserInput!): User
  }
`;

export default typeDefs;