const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    items: [Item]!
  }

  type Item {
    _id: ID
    title: String!
    price: String
    description: String!
    category: String
    image: String
  }

  input ItemInput {
    title: String!
    price: String
    description: String!
    category: String
    image: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!):User
    items: [Item]!
    item(itemId: ID!): Item
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveItem(input: ItemInput!): Item
    removeItem(itemId: ID!): Item
  }
`;

export default typeDefs;
