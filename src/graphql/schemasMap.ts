import { UserTypeDefs  } from './schemas/UserSchema'
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from './resolverMap'
import { GraphQLSchema } from 'graphql'
import { BaseTypeDefs } from './schemas/BaseSchema'

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [BaseTypeDefs, UserTypeDefs],
    resolvers,
})

export default schema