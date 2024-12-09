import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query Users {
  users {
    _id
    username
    email
    itemCount
  }
}
`;

export const QUERY_USERNAME = gql`
query User($username: String) {
  user(username: $username) {
    _id
    username
    email
    itemCount
  }
}
`;

export const QUERY_ITEMS = gql`
query Items {
  items {
    _id
    username
    email
    itemCount
  }
}
`;

export const QUERY_ITEM = gql`
query Item($item: String) {
  user(username: $username) {
    _id
    username
    email
    itemCount
  }
}
`;

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    email
    itemCount
  }
}
`;