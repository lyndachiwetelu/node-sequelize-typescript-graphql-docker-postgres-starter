import { gql } from "apollo-server-express";

export const UserTypeDefs = gql`
    type Query {
        getUser(id: Int!): GetUserResult!
    }

    type Mutation {
        login(email: String!, password: String!): LoginResult!
        register(name: String!, email: String!, password: String!): RegisterResult!
    }

    type AuthenticateResponse {
        token: String!
        user: User!
    }

    type User {
        id: String!
        name: String!
        email: String!
    }
      
    union GetUserResult = User | UserNotFoundError | AuthError
    union LoginResult = AuthenticateResponse | UserNotFoundError
    union RegisterResult = AuthenticateResponse | UserExistsError 
`;