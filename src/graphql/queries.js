import gql from 'graphql-tag';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      name
      email
      username
      password
      profile_picture
    }
  }
`;

const REGISTER = gql`
  mutation register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $profile_picture: Upload
  ) {
    register(
        userData: {
        name: $name
        username: $username
        email: $email
        password: $password
        profile_picture: $profile_picture
      }
    ) {
      id
      name
      email
      username
      password
      profile_picture
    }
  }
`;

export {
    LOGIN,
    REGISTER
}