import { IResolvers } from "@graphql-tools/utils";
import { merge } from "lodash";
import { UserResolvers } from "./resolvers/UserResolver";

const resolverMap: IResolvers = merge(UserResolvers) // add other resolvers like this merge(UserResolvers, AnotherResolver, YetAnotherResolver)
export default resolverMap