//gql tagged template function
const { gql } = require('apollo-server-express');

//typeDefs
const typeDefs = gql`
type Query {
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookParams: Input!): User
  removeBook(bookId: ID!): User
}

type Input {
  authors:[String]
  description: String
  title: String!
  bookId: String!
  image: String
  link: String
}

type User {
  _id: ID!
  username: String!
  email: String
  bookCount: Int
  savedBooks: [Book]
}

type Book {
  bookId: ID!
  authors: [String]
  description: String
  image: String
  link: String
  title: String!
}

type Auth {
  token: ID!
  user: User
}
`;

//export typeDefs
module.exports = typeDefs;
