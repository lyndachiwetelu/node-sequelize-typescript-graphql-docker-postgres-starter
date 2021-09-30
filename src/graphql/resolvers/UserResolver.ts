import { IResolvers } from "@graphql-tools/utils";
import UserController from "../../controllers/User";
import { cookieOptions } from "../../helpers/Auth";
import { ErrorResponse, Response } from "../../helpers/Response";
import { authenticateResolver } from "../../middleware/Auth";
import { UserData, UserLoginData } from "../../types/User";

export const UserResolvers: IResolvers = {
    Query: {
        getUser: authenticateResolver(async (_, { id }, {req, res}): Promise<any> =>{
            const user = await UserController.getUser(id);
            if (!user) {
                return ErrorResponse.toResponseObject("UserNotFoundError", `The user with the id ${id} does not exist.`);
            }

            return Response.toResponseObject("User", user);
        })
    },

    Mutation: {
        async login (_, args: UserLoginData, {res, req}): Promise<any> {
            const user = await UserController.login(args);
            if (user) {
                res.cookie('token', user.token, cookieOptions)
                return Response.toResponseObject("AuthenticateResponse", user);
            }

            return ErrorResponse.toResponseObject("UserNotFoundError", `The user with the email ${args.email} does not exist.`);
        },

        async register (_, args: UserData, {res, req}): Promise<any> {
            const user =  await UserController.register(args);
            if (user) {
                res.cookie('token', user.token, cookieOptions)
                return Response.toResponseObject("AuthenticateResponse", user);
            }

            return ErrorResponse.toResponseObject("UserExistsError", `The user with the email ${args.email} already exists.`);
        }
    }

}