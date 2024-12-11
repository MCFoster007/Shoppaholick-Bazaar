import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;
export const ADD_USER = gql`
mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username 
      }
    }
  }
`;

export const SAVE_ITEM = gql`
mutation SaveItem($input: ItemInput!) {
    saveItem(input: $input) {
      title
      price
      description
      category
      image
    }
  }
`;

export const REMOVE_ITEM = gql`
mutation Removeitem($itemId: ID!) {
    removeItem(itemId: $itemId) {
      _id
      username
      email
      itemCount
      savedItems {
        title
        ItemId
        price
        description
        link
        image
      }
    }
  }
`;
