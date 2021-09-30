import User from "../models/User";
import { UserData, UserLoginData, UserWithToken } from "../types/User";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();


export default class UserController {
    public static async getUser(id: any): Promise<User> {
        const user = await User.findOne({where: {id}})
        if (!user) {
            return null
        }
        return user.withoutPassword();
    }
 
    public static async login(loginData: UserLoginData): Promise<UserWithToken> {
        const user = await User.findOne({where: {email: loginData.email}});
        if (!user || !user.validPassword(loginData.password)) {
            return null
        }
        
        const userJSON = user.toJSON()
        const token = jwt.sign(userJSON, process.env.JWT_SECRET, {expiresIn: "1h"});
        const {password, ...userDetails} = userJSON;
        return {token, user: userDetails }
    }

    public static async register(registerData: UserData): Promise<UserWithToken> {
        const userExists = await User.findOne({where: {email: registerData.email}});
        if (userExists) {
            return null
        }

        const user = await User.create(registerData);
        const userJSON = user.toJSON()
        const token = jwt.sign(userJSON, process.env.JWT_SECRET, {expiresIn: "1h"});
        const {password, ...userDetails} = userJSON;
        return {token, user: userDetails }
    }
}