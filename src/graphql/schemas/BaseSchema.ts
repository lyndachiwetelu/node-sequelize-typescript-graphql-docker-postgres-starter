import { gql } from "apollo-server-express";

export const BaseTypeDefs = gql`
    interface Error {
        message: String!
    }

    type UserNotFoundError implements Error {
        message: String!
    }

    type UserExistsError implements Error {
        message: String!
    }

    type AuthError implements Error {
        message: String!
    }
`;