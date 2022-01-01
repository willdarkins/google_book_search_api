//gql tagged template function
const { gql } = require('apollo-server-express');

//typeDefs
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Books]
  }

type Book {
    bookId: String  
}
type Auth {
  token: ID!
  user: User
}
`;

//export typeDefs
module.exports = typeDefs;