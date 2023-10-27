import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation registerUser($createRegisterInput: CreateRegisterInput!) {
    registerUser(createRegisterInput: $createRegisterInput) {
      message
      user {
        name
        email
      }
    }
  }
`;


export const LOGIN_USER = gql`
  mutation loginUser($createLoginInput: CreateLoginInput!) {
    loginUser(createLoginInput: $createLoginInput) {
      access_token
      user{
        id
        name
        email
      }
    }
  }
`;