import { Request} from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const cookieOptions = {
    maxAge: 1000 * 60 * 60,
    httpOnly: true, 
    secure: process.env.SECURE === "1",
    sameSite: "None"
}

export const authenticateToken = (req: Request) => {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET as string, (err: any, user: any) => {
            if (err) {
                reject(err)
            } 
            
           resolve(user)
      })
  })
}
