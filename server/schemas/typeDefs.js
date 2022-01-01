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
  saveBook(bookData: BookInput!): User
  removeBook(bookId: ID!): User
}

`;

//export typeDefs
module.exports = typeDefs;