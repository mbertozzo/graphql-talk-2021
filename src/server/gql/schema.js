const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: Int!
    geo: Geo
  }
  type Geo {
    lat: String!
    lng: String!
  }
  type Company {
    name: String!
    catchPhrase: String!
    bs: String!
  }
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    address: Address
    phone: String!
    website: String!
    company: Company
  }
  type Query {
    getUsername: String
    users: [User]
    user(id: ID!): User
  }
`;

module.exports = typeDefs;
