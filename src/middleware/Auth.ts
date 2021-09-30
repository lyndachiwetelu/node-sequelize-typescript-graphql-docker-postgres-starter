import { GraphQLFieldResolver } from "graphql";
import { authenticateToken } from "../helpers/Auth";

export const authenticateResolver = (resolver: GraphQLFieldResolver<any, any>) => async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {

  await authenticateToken(context.req);

  return resolver(parent, args, context, info);
};