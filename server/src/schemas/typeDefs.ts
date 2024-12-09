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
    itemName: String
    itemPrice: String
    description: String!
    category: String
  }

  input ItemInput {
    itemname: String!
    itemprice: Number!
    itemcategory: String!
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
    user(username: String!): User
    items: [Item]!
    item(itemId: ID!): Item
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addItem(input: ItemInput!): Item
    removeItem(itemId: ID!): Item
  }
`;

export default typeDefs;
