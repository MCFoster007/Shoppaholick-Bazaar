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
// export const QUERY_CATEGORY = gql`
// query Category {
//   category
// }
// `;

export const QUERY_ITEM = gql`
query Items {
  items {
    _id
    title
    price
    description
    category
  }
}
`;

export const QUERY_ITEMS = gql`
  query SavedItems {
    savedItems {
    _id
    title
    price
    description
    category
    image
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